const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// public/app.js is a plain browser script, so run it in a vm context with just
// enough of the DOM stubbed to submit the event form.
function loadPage(events, savedEvent) {
  const elements = {};
  const el = () => ({
    value: "", textContent: "", innerHTML: "",
    classList: { add() {}, remove() {}, toggle() { return true; } },
    addEventListener() {}, reset() {}
  });
  const ctx = {
    document: { getElementById: id => (elements[id] ||= el()), querySelector: () => el(), addEventListener() {} },
    window: { getSelection: () => null, scrollTo() {} },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    fetch: async () => ({ ok: true, json: async () => savedEvent }),
    alert() {}, confirm: () => true, console, parseInt
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "public", "app.js"), "utf-8"), ctx);
  ctx.events = events;
  vm.runInContext("currentEvents = events", ctx);
  return { ctx, elements, dates: () => vm.runInContext("currentEvents", ctx).map(e => e.date) };
}

const existing = () => [
  { id: 1, title: "A", date: "2025-08-15", location: "L", tags: [] },
  { id: 2, title: "B", date: "2025-11-10", location: "L", tags: [] }
];

test("an event added through the form is listed in date order", async () => {
  const saved = { id: 3, title: "C", date: "2020-01-01", location: "L", tags: [] };
  const page = loadPage(existing(), saved);
  await vm.runInContext("handleCreateEvent({ preventDefault() {} })", page.ctx);
  assert.deepStrictEqual(page.dates(), ["2020-01-01", "2025-08-15", "2025-11-10"]);
});

test("an event whose date is edited through the form is listed in date order", async () => {
  const saved = { id: 2, title: "B", date: "2020-01-01", location: "L", tags: [] };
  const page = loadPage(existing(), saved);
  page.elements["event-id"].value = "2";
  await vm.runInContext("handleCreateEvent({ preventDefault() {} })", page.ctx);
  assert.deepStrictEqual(page.dates(), ["2020-01-01", "2025-08-15"]);
});
