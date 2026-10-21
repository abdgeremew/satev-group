import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("home renders the approved SATEV site with production metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const text of [
    "<title>SATEV GROUP: The Ultimate Engineering</title>",
    "The Ultimate", "Engineering", "ABOUT SATEV", "MEET OUR FIRST PRODUCT",
    "OUR SOLUTIONS", "MEET THE TEAM", "REVOV IN THE FIELD", "contact@satev.tech",
    'href="/contact"', 'rel="canonical" href="https://satev.tech"',
  ]) assert.ok(html.includes(text), `Missing home content: ${text}`);
  for (const section of ["home", "about", "revov", "partners", "solutions", "journey", "team", "contact"]) {
    assert.ok(html.includes(`id="${section}"`), `Missing section: ${section}`);
  }
  assert.ok(html.includes('src="/revov-hero-panorama-v3.avif"') && html.includes('fetchPriority="high"'));
  assert.ok(html.includes('imageSrcSet="/revov-hero-panorama-v3-480.avif'));
  assert.ok(html.includes('src="/revov-about-hd.avif"') && html.includes('loading="lazy"'));
  assert.ok(html.includes('src="/revov-gallery-1.avif"') && html.includes('loading="lazy"'));
  assert.ok(!html.includes("Design preview · Based on your supplied reference"), "Preview footer leaked to production home");
});

test("company pages render their relevant content", async () => {
  const pages = [
    ["/about", "Engineering with a practical purpose"],
    ["/partners", "Built together"],
    ["/journey", "Learning by building"],
    ["/team", "Samuel Alemu"],
  ];
  for (const [path, expected] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.ok((await response.text()).includes(expected), `Missing ${expected} on ${path}`);
  }
});

test("canonical contact page renders the backend-connected form", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "Let’s build something useful.", 'name="name"', 'name="email"',
    'name="message"', "Send message", "contact@satev.tech",
    'rel="canonical" href="https://satev.tech/contact"',
  ]) assert.ok(html.includes(text), `Missing contact content: ${text}`);
});
