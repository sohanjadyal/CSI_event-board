const { test, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const app = require('../src/server');

let server;
let baseUrl;
let dbBackup;
const dbPath = path.join(__dirname, '..', 'data', 'events.json');

before(() => {
  if (fs.existsSync(dbPath)) {
    dbBackup = fs.readFileSync(dbPath, 'utf-8');
  }
  process.env.ADMIN_TOKEN = "test-token";
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      baseUrl = `http://localhost:${server.address().port}`;
      resolve();
    });
  });
});

after(() => {
  if (dbBackup !== undefined) {
    fs.writeFileSync(dbPath, dbBackup, 'utf-8');
  } else {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  }
  server.close();
});

test('GET /events returns events array', async () => {
  const res = await fetch(`${baseUrl}/events`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
});

test('POST /events creates a new event', async () => {
  const payload = {
    title: "Test Event",
    date: "2026-10-31",
    location: "Online",
    tags: ["test"]
  };
  const res = await fetch(`${baseUrl}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  assert.strictEqual(res.status, 201);
  const data = await res.json();
  assert.strictEqual(data.title, "Test Event");
});

test('PUT /events/:id without token returns 401', async () => {
  const res = await fetch(`${baseUrl}/events/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Update", date: "2026-11-01", location: "Here" })
  });
  assert.strictEqual(res.status, 401);
});

test('PUT /events/:id with valid token updates event', async () => {
  const postRes = await fetch(`${baseUrl}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Old", date: "2026-11-01", location: "Here" })
  });
  const ev = await postRes.json();

  const res = await fetch(`${baseUrl}/events/${ev.id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer test-token" 
    },
    body: JSON.stringify({ title: "New Title", date: "2026-11-01", location: "Here" })
  });
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.title, "New Title");
});

test('DELETE /events/:id without token returns 401', async () => {
  const res = await fetch(`${baseUrl}/events/1`, { method: "DELETE" });
  assert.strictEqual(res.status, 401);
});

test('DELETE /events/:id with valid token deletes event', async () => {
  const postRes = await fetch(`${baseUrl}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "ToDelete", date: "2026-11-01", location: "Here" })
  });
  const ev = await postRes.json();

  const res = await fetch(`${baseUrl}/events/${ev.id}`, { 
    method: "DELETE",
    headers: { "Authorization": "Bearer test-token" } 
  });
  assert.strictEqual(res.status, 200);
});
