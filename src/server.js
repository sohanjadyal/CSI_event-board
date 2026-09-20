const express = require("express");
const path = require("path");
const fs = require("fs");
const { validateEvent } = require("./validator");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "..", "data", "events.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

let events = [];

function loadEvents() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      events = JSON.parse(data);
    } else {
      events = [];
    }
  } catch (err) {
    console.error("Failed to load events:", err);
    events = [];
  }
}

function saveEvents() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save events:", err);
  }
}

loadEvents();

// GET all events
app.get("/events", (req, res) => {
  res.json(events);
});

// POST create a new event
app.post("/events", (req, res) => {
  const validation = validateEvent(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const nextId = events.length > 0 ? Math.max(...events.map(e => e.id || 0)) + 1 : 1;
  const newEvent = {
    id: nextId,
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description || "",
    tags: Array.isArray(req.body.tags) ? req.body.tags : []
  };

  events.push(newEvent);
  saveEvents();
  res.status(201).json(newEvent);
});

// DELETE an event by ID
app.delete("/events/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  events = events.filter(e => e.id !== id);
  saveEvents();
  res.status(200).json({ ok: true });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Event Board server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
