const { test, describe } = require("node:test");
const assert = require("node:assert");
const { validateEvent } = require("../src/validator");

describe("Event Validator", () => {
  test("valid event object passes validation", () => {
    const event = {
      title: "CSI Tech Fest",
      date: "2025-10-15",
      location: "Main Auditorium",
      description: "Annual technology festival",
      tags: ["tech", "fest"]
    };
    const result = validateEvent(event);
    assert.strictEqual(result.valid, true);
  });

  test("missing title fails validation", () => {
    const event = {
      title: "",
      date: "2025-10-15",
      location: "Main Auditorium"
    };
    const result = validateEvent(event);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, "Title is required");
  });

  test("invalid or missing date fails validation", () => {
    const event = {
      title: "Workshop",
      date: "not-a-date",
      location: "Lab 1"
    };
    const result = validateEvent(event);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, "Valid date (YYYY-MM-DD) is required");
  });

  test("missing location fails validation", () => {
    const event = {
      title: "Workshop",
      date: "2025-10-15",
      location: ""
    };
    const result = validateEvent(event);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.error, "Location is required");
  });

  test("non-object input fails validation", () => {
    const result = validateEvent(null);
    assert.strictEqual(result.valid, false);
  });
});
