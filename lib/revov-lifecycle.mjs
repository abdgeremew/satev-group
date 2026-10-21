const paymentStates = new Set(["not_started", "pending", "succeeded", "failed", "expired"]);
const dispenseStates = new Set(["not_started", "in_progress", "delivered", "failed", "unknown"]);

export function createVendingOrder({ id, amountMinor, currency = "ETB" }) {
  if (!id || typeof id !== "string") throw new TypeError("Order id is required.");
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw new TypeError("Amount must be positive integer minor units.");
  if (!/^[A-Z]{3}$/.test(currency)) throw new TypeError("Currency must be a three-letter code.");
  return {
    id,
    amountMinor,
    currency,
    payment: "not_started",
    paymentReference: null,
    dispense: "not_started",
    dispenseReference: null,
    appliedEventIds: [],
  };
}

/** Pure lifecycle guard. The caller must persist each returned state before external side effects. */
export function applyVendingEvent(order, event) {
  if (!order || !event || typeof event.id !== "string" || !event.id) throw new TypeError("Order and event id are required.");
  if (order.appliedEventIds.includes(event.id)) return order;

  const next = { ...order, appliedEventIds: [...order.appliedEventIds, event.id] };
  switch (event.type) {
    case "checkout_started":
      if (order.payment !== "not_started") return order;
      next.payment = "pending";
      break;
    case "payment_pending":
      if (["succeeded", "failed", "expired"].includes(order.payment)) return order;
      next.payment = "pending";
      break;
    case "payment_failed":
      if (order.payment !== "pending") return order;
      next.payment = "failed";
      next.paymentReference = event.paymentReference ?? null;
      break;
    case "payment_expired":
      if (order.payment !== "pending") return order;
      next.payment = "expired";
      break;
    case "payment_succeeded":
      if (!event.paymentReference) throw new TypeError("Verified payment reference is required.");
      if (event.amountMinor !== order.amountMinor || event.currency !== order.currency) {
        throw new Error("Payment amount or currency does not match the order.");
      }
      if (!["pending", "failed", "expired", "succeeded"].includes(order.payment)) return order;
      if (order.payment === "succeeded") {
        return order.paymentReference === event.paymentReference ? next : order;
      }
      if (order.dispense !== "not_started") return order;
      next.payment = "succeeded";
      next.paymentReference = event.paymentReference;
      break;
    case "dispense_started":
      if (order.payment !== "succeeded" || order.dispense !== "not_started") return order;
      if (!event.dispenseReference) throw new TypeError("Dispense command reference is required.");
      next.dispense = "in_progress";
      next.dispenseReference = event.dispenseReference;
      break;
    case "dispense_delivered":
      if (order.dispense !== "in_progress" || event.dispenseReference !== order.dispenseReference) return order;
      next.dispense = "delivered";
      break;
    case "dispense_failed":
      if (order.dispense !== "in_progress" || event.dispenseReference !== order.dispenseReference) return order;
      next.dispense = "failed";
      break;
    case "dispense_unknown":
      if (order.dispense !== "in_progress" || event.dispenseReference !== order.dispenseReference) return order;
      next.dispense = "unknown";
      break;
    default:
      throw new Error(`Unsupported vending event: ${event.type}`);
  }

  if (!paymentStates.has(next.payment) || !dispenseStates.has(next.dispense)) throw new Error("Invalid lifecycle state.");
  return next;
}
