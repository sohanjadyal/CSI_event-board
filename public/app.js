let currentEvents = [];

const eventsGrid = document.getElementById("events-grid");
const eventCount = document.getElementById("event-count");
const tagFilter = document.getElementById("tag-filter");
const clearFilterBtn = document.getElementById("clear-filter-btn");
const toggleFormBtn = document.getElementById("toggle-form-btn");
const cancelFormBtn = document.getElementById("cancel-form-btn");
const formContainer = document.getElementById("form-container");
const eventForm = document.getElementById("event-form");

async function fetchEvents() {
  try {
    const res = await fetch("/events");
    const data = await res.json();
    currentEvents = data;
    renderCards(currentEvents);
  } catch (err) {
    console.error("Failed to load events:", err);
    eventsGrid.innerHTML = `<p class="error-msg">Could not load events.</p>`;
  }
}

function filterByTag(tag) {
  if (!tag || tag.trim() === "") {
    renderCards(currentEvents);
    return;
  }

  const query = tag.trim();
  const filtered = currentEvents.filter(event => {
    if (!Array.isArray(event.tags)) return false;
    return event.tags.some(tag =>tag.toLowerCase().includes(query.toLowerCase()));
  });

  renderCards(filtered);
}

function renderCards(eventsToRender) {
  eventCount.textContent = `Showing ${eventsToRender.length} event${eventsToRender.length === 1 ? '' : 's'}`;

  if (eventsToRender.length === 0) {
    eventsGrid.innerHTML = `<div class="empty-state"><p>No events found.</p></div>`;
    return;
  }

  eventsGrid.innerHTML = eventsToRender.map(event => {
    const tagsHtml = (event.tags || [])
      .map(tag => `<span class="tag-badge">#${tag}</span>`)
      .join("");

    return `
      <article class="card event-card" data-id="${event.id}">
        <div class="card-top">
          <span class="event-date-badge">${event.date}</span>
          <h3 class="card-title">${event.title}</h3>
          <div class="card-location">📍 ${event.location}</div>
          <p class="card-desc">${event.description || ""}</p>
        </div>
        <div class="card-footer">
          <div class="tags-list">${tagsHtml}</div>
          <button class="btn btn-danger delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

async function deleteEvent(id) {
  if (!confirm("Are you sure you want to delete this event?")) return;

  try {
    const res = await fetch(`/events/${id}`, { method: "DELETE" });
    if (res.ok) {
      currentEvents = currentEvents.filter(e => e.id !== id);
      renderCards(currentEvents);
    } else {
      alert("Failed to delete event.");
    }
  } catch (err) {
    console.error("Error deleting event:", err);
  }
}

async function handleCreateEvent(e) {
  e.preventDefault();

  const title = document.getElementById("event-title").value;
  const date = document.getElementById("event-date").value;
  const location = document.getElementById("event-location").value;
  const rawTags = document.getElementById("event-tags").value;
  const description = document.getElementById("event-desc").value;

  const tags = rawTags
    .split(",")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const payload = { title, date, location, description, tags };

  try {
    const res = await fetch("/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const created = await res.json();
      currentEvents.push(created);
      renderCards(currentEvents);
      eventForm.reset();
      formContainer.classList.add("hidden");
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error || 'Failed to create event'}`);
    }
  } catch (err) {
    console.error("Failed to create event:", err);
  }
}

tagFilter.addEventListener("input", (e) => {
  filterByTag(e.target.value);
});

clearFilterBtn.addEventListener("click", () => {
  tagFilter.value = "";
  renderCards(currentEvents);
});

toggleFormBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
});

cancelFormBtn.addEventListener("click", () => {
  formContainer.classList.add("hidden");
  eventForm.reset();
});

eventForm.addEventListener("submit", handleCreateEvent);

document.addEventListener("DOMContentLoaded", fetchEvents);
