# Source Start Campus Event Board

Welcome to the **Source Start Campus Event Board** repository! We're thrilled to have you as a contributor to our interactive campus bulletin and event discovery platform built with Node.js, Express, and modern vanilla web standards.

As part of **"Source Start"**, an open-source initiative organized by **CSI-SPIT**, this repository is created to help students and developers make meaningful open-source contributions—whether you are polishing a user interface, fixing backend edge cases, writing automated tests, or designing new features.

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Fork the Repository](#1-fork-the-repository)
  - [2. Clone Your Fork](#2-clone-your-fork)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Start the Application](#4-start-the-application)
  - [5. Open in Browser](#5-open-in-browser)
- [API Endpoints Reference](#api-endpoints-reference)
- [Running Tests](#running-tests)
- [How to Contribute](#how-to-contribute)
  - [Contribution Workflow](#contribution-workflow)
  - [Issue Labels & Difficulty Tiers](#issue-labels--difficulty-tiers)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

---

## Introduction

**Campus Event Board** is a lightweight web application designed for student communities to publish, browse, and organize campus happenings. From hackathons and coding workshops to cultural evenings and club orientation sessions, students can easily explore upcoming dates, filter by interests, and keep their college schedule in sync.

The backend is powered by a straightforward Express.js server saving data in human-readable JSON files, while the frontend delivers a clean, responsive card-based UI without the overhead of complex client frameworks.

---

## Key Features

- 📅 **Dynamic Event Cards**: Displays events with dates, locations, descriptions, and category tags.
- 🔍 **Tag-Based Filtering**: Quickly isolate workshops, hackathons, cultural events, or technical seminars.
- 📝 **Event Creation**: Easy-to-use form to publish new events directly to the board.
- 🗑️ **Management Controls**: Remove outdated or cancelled events.
- 🧪 **Automated Validation**: Built-in validation suite ensuring events contain well-formed titles, dates, and locations.
- ⚡ **Zero Database Setup**: Backed by simple JSON storage in `data/events.json`.

---

## Project Structure

```text
event-board/
├── README.md               # Contributor guidelines and project documentation
├── LICENSE                 # MIT License
├── package.json            # Node.js project manifest & scripts
├── .gitignore              # Ignored files (node_modules, etc.)
├── data/
│   └── events.json         # Storage for campus event records
├── src/
│   ├── server.js           # Express web server & REST API routes
│   └── validator.js        # Validation logic for event submissions
├── public/                 # Static frontend assets
│   ├── index.html          # Main application page
│   ├── style.css           # Modern, responsive stylesheet
│   └── app.js              # Client-side event handling, rendering, & API calls
└── tests/
    └── validator.test.js   # Unit test suite for validation logic
```

---

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or newer) and **npm** installed on your machine:

```bash
node -v
npm -v
```

### 1. Fork the Repository

Click the **Fork** button in the top-right corner of this repository page on GitHub to create a personal copy under your GitHub account.

### 2. Clone Your Fork

Clone your repository locally:

```bash
git clone https://github.com/techcsispit/event-board.git
cd event-board
```

### 3. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 4. Start the Application

Launch the Express development server:

```bash
npm start
```

You should see:
```text
Event Board server running on http://localhost:3000
```

### 5. Open in Browser

Visit **[http://localhost:3000](http://localhost:3000)** in your web browser to interact with the Event Board.

---

## API Endpoints Reference

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/events` | Returns an array of all current events. |
| `POST` | `/events` | Creates a new event record. Validates payload format. |
| `DELETE` | `/events/:id` | Removes the event with the specified ID. |

#### Example `POST /events` Payload:

```json
{
  "title": "Machine Learning Bootcamp",
  "date": "2025-10-25",
  "location": "Seminar Hall 1",
  "description": "Introductory workshop on computer vision and PyTorch.",
  "tags": ["AI", "Workshop", "Tech"]
}
```

---

## Running Tests

Unit tests are written using Node.js's built-in test runner (`node:test`) and assertion module.

Run the test suite with:

```bash
npm test
```

> 💡 **Tip for Contributors:** Always run `npm test` before pushing your changes to verify that existing functionality remains intact.

---

## How to Contribute

We welcome and appreciate contributions from all students and community members!

### Contribution Workflow

1. **Find an Issue:** Navigate to the **Issues** tab to find an open task. Leave a comment expressing your interest to be assigned.
2. **Create a Feature Branch:** Keep your `main` branch clean by creating a dedicated topic branch:
   ```bash
   git checkout -b fix/issue-description
   ```
3. **Make Your Changes:** Edit code cleanly, keeping existing conventions intact.
4. **Test Thoroughly:**
   - Run automated tests: `npm test`
   - Test manually in your browser: `npm start`
5. **Commit Your Work:** Write clear, descriptive commit messages:
   ```bash
   git commit -m "fix: improve validation handling for event inputs"
   ```
6. **Push to Your Fork:**
   ```bash
   git push origin fix/issue-description
   ```
7. **Open a Pull Request:** Navigate to your fork on GitHub and submit a Pull Request describing what changes you made.

### Issue Labels & Difficulty Tiers

- 🔁 `good first issue`: Ideal for beginners and first-time open-source contributors.
- 🐛 `bug`: Resolving logic issues, layout glitches, or unexpected server responses.
- ✨ `enhancement`: Introducing new features, filters, or backend endpoints.

> 📌 **Note:** All active tasks and bug reports are published in the **[Issues](../../issues)** tab. Check the tab to pick your first issue!

---

## Code of Conduct

This project adheres to a community code of conduct fostering a respectful, inclusive, and welcoming learning environment. Please be supportive in all discussions and pull request reviews.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Organized with ❤️ by <b>CSI-SPIT</b> for <b>Source Start</b>.<br>
  Happy Coding! 🚀🎉
</p>
