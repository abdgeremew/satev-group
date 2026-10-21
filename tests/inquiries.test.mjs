import assert from "node:assert/strict";
import test from "node:test";
import { createInquiryHandler } from "../lib/inquiries.mjs";

const valid = { kind: "contact", name: "Test Visitor", email: "visitor@example.com", message: "Please share more about RevoV." };
const request = (body = valid, headers = {}) => new Request("https://satev.tech/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json", origin: "https://satev.tech", ...headers }, body: JSON.stringify(body) });
const env = () => ({ RESEND_API_KEY: "test-key-not-real", CONTACT_FROM_EMAIL: "SATEV <website@satev.tech>" });

for (const kind of ["contact", "waitlist", "order"]) test(`sends ${kind} to fixed team mailbox`, async () => {
  let sent;
  const handler = createInquiryHandler({ env, send: async (url, options) => { assert.equal(url, "https://api.resend.com/emails"); sent = JSON.parse(options.body); return Response.json({ id: "test-id" }); } });
  const response = await handler(request({ ...valid, kind, phone: "+251 911 000 000", requestType: "Pilot installation", location: "Addis Ababa", brief: "Please assess a RevoV pilot for our campus location.", to: "attacker@example.com" }));
  assert.equal(response.status, 202);
  assert.deepEqual(sent.to, ["contact@satev.tech"]);
  assert.equal(sent.reply_to, valid.email);
  assert.ok(sent.text.includes(valid.name));
  assert.equal(sent.html, undefined);
  if (kind === "order") assert.match(sent.text, /Pilot installation/);
});

test("uses an explicitly configured company mailbox", async () => {
  let sent;
  const handler = createInquiryHandler({ env: () => ({ ...env(), CONTACT_TO_EMAIL: "team@satev.tech" }), send: async (_url, options) => { sent = JSON.parse(options.body); return Response.json({ id: "test-id" }); } });
  assert.equal((await handler(request())).status, 202);
  assert.deepEqual(sent.to, ["team@satev.tech"]);
});

test("missing credentials do not report success", async () => {
  assert.equal((await createInquiryHandler({ env: () => ({}) })(request())).status, 503);
});

test("rejects invalid input and spam without contacting provider", async () => {
  const bad = [null, [], {}, { ...valid, email: "bad" }, { ...valid, name: "x" }, { ...valid, message: "short" }, { ...valid, website: "spam" }, { ...valid, kind: "waitlist", phone: "abcdefg" }, { ...valid, kind: "order", location: "Addis Ababa", requestType: "Pilot", brief: "short" }];
  for (const body of bad) {
    const handler = createInquiryHandler({ env, send: () => { throw new Error("should not send"); } });
    assert.equal((await handler(request(body))).status, 400);
  }
});

test("rejects cross-origin and oversized requests", async () => {
  const handler = createInquiryHandler({ env });
  assert.equal((await handler(request(valid, { origin: "https://other.example" }))).status, 403);
  assert.equal((await handler(request({ ...valid, message: "a".repeat(17000) }))).status, 413);
});

test("handles provider rejection, invalid response, and timeout safely", async () => {
  for (const send of [async () => Response.json({ error: "secret details" }, { status: 403 }), async () => Response.json({}), async () => { throw new Error("timeout secret"); }]) {
    const response = await createInquiryHandler({ env, send })(request());
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /secret/);
  }
});

test("limits attempts and permits them after the window expires", async () => {
  let time = 0;
  const handler = createInquiryHandler({ env: () => ({}), now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 503);
  assert.equal((await handler(request())).status, 429);
  time = 600001;
  assert.equal((await handler(request())).status, 503);
});
