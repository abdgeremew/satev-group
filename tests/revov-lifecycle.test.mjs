import test from "node:test";
import assert from "node:assert/strict";
import { applyVendingEvent, createVendingOrder } from "../lib/revov-lifecycle.mjs";

const order = () => createVendingOrder({ id: "RV-ORDER-1", amountMinor: 2500 });
const event = (id, type, props = {}) => ({ id, type, ...props });
const pay = (id = "pay-1") => event(id, "payment_succeeded", { paymentReference: "sp-100", amountMinor: 2500, currency: "ETB" });
const startDispense = (state) => applyVendingEvent(state, event("vend-start", "dispense_started", { dispenseReference: "vend-1" }));

test("normal purchase keeps payment and dispensing as separate confirmed events", () => {
  let state = applyVendingEvent(order(), event("checkout-1", "checkout_started"));
  assert.equal(state.payment, "pending");
  state = applyVendingEvent(state, pay());
  assert.equal(state.payment, "succeeded");
  assert.equal(state.dispense, "not_started");
  state = startDispense(state);
  assert.equal(state.dispense, "in_progress");
  state = applyVendingEvent(state, event("vend-done", "dispense_delivered", { dispenseReference: "vend-1" }));
  assert.equal(state.dispense, "delivered");
});

test("duplicate checkout and callback event identifiers are idempotent", () => {
  let state = order();
  state = applyVendingEvent(state, event("checkout-1", "checkout_started"));
  const repeatedCheckout = applyVendingEvent(state, event("checkout-1", "checkout_started"));
  assert.equal(repeatedCheckout, state);
  state = applyVendingEvent(state, pay());
  assert.equal(applyVendingEvent(state, pay()), state);
});

test("repeated payment success with a different notification id does not change the payment", () => {
  let state = applyVendingEvent(order(), event("checkout-1", "checkout_started"));
  state = applyVendingEvent(state, pay());
  const repeated = applyVendingEvent(state, pay("pay-retry"));
  assert.equal(repeated.paymentReference, "sp-100");
  assert.equal(repeated.payment, "succeeded");
});

test("out-of-order success is ignored until checkout is pending", () => {
  const initial = order();
  assert.equal(applyVendingEvent(initial, pay()), initial);
  const pending = applyVendingEvent(initial, event("checkout-1", "checkout_started"));
  assert.equal(applyVendingEvent(pending, pay()).payment, "succeeded");
});

test("late verified payment after a UI timeout or payment expiry remains recoverable", () => {
  let state = applyVendingEvent(order(), event("checkout-1", "checkout_started"));
  state = applyVendingEvent(state, event("expire-1", "payment_expired"));
  assert.equal(state.payment, "expired");
  state = applyVendingEvent(state, pay());
  assert.equal(state.payment, "succeeded");
  assert.equal(state.dispense, "not_started");
});

test("wrong amount or currency is rejected", () => {
  const pending = applyVendingEvent(order(), event("checkout-1", "checkout_started"));
  assert.throws(() => applyVendingEvent(pending, event("bad-amount", "payment_succeeded", {
    paymentReference: "sp-100", amountMinor: 2499, currency: "ETB",
  })), /amount or currency/);
  assert.throws(() => applyVendingEvent(pending, event("bad-currency", "payment_succeeded", {
    paymentReference: "sp-100", amountMinor: 2500, currency: "USD",
  })), /amount or currency/);
});

test("failure and expiry do not count as payment", () => {
  let state = applyVendingEvent(order(), event("checkout-1", "checkout_started"));
  state = applyVendingEvent(state, event("fail-1", "payment_failed"));
  assert.equal(state.payment, "failed");
  assert.equal(state.dispense, "not_started");
  assert.equal(applyVendingEvent(state, event("vend-start", "dispense_started", { dispenseReference: "vend-1" })), state);
});

test("duplicate dispense start cannot trigger another command", () => {
  const paid = applyVendingEvent(applyVendingEvent(order(), event("checkout-1", "checkout_started")), pay());
  const dispensing = startDispense(paid);
  assert.equal(applyVendingEvent(dispensing, event("vend-start-2", "dispense_started", { dispenseReference: "vend-2" })), dispensing);
});

test("controller timeout is represented as unknown and cannot be blindly retried", () => {
  const paid = applyVendingEvent(applyVendingEvent(order(), event("checkout-1", "checkout_started")), pay());
  let state = startDispense(paid);
  state = applyVendingEvent(state, event("vend-timeout", "dispense_unknown", { dispenseReference: "vend-1" }));
  assert.equal(state.dispense, "unknown");
  assert.equal(applyVendingEvent(state, event("retry", "dispense_started", { dispenseReference: "vend-2" })), state);
});

test("a positive dispense acknowledgement must match the active command", () => {
  const paid = applyVendingEvent(applyVendingEvent(order(), event("checkout-1", "checkout_started")), pay());
  const dispensing = startDispense(paid);
  assert.equal(applyVendingEvent(dispensing, event("wrong-ack", "dispense_delivered", { dispenseReference: "other" })), dispensing);
});

test("invalid order amounts are refused", () => {
  assert.throws(() => createVendingOrder({ id: "x", amountMinor: 0 }), /positive/);
  assert.throws(() => createVendingOrder({ id: "x", amountMinor: 1.5 }), /integer/);
});
