require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const categorizeEvent = require("./utilities/categorizeEvent");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let events = []; // In-memory storage

// --- Create Event ---
app.post("/events", (req, res) => {
  const { title, date, time, notes, archived } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: "Invalid or missing date." });
  }

  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) {
    return res.status(400).json({ error: "Invalid or missing time." });
  }

  const category = categorizeEvent(title, notes);
  const newEvent = {
    id: events.length + 1,
    title: title.trim(),
    date,
    time,
    notes: notes || "",
    archived: archived === true,
    category,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// --- Get All Events ---
app.get("/events", (_req, res) => {
  const sorted = events.slice().sort((a, b) =>
    new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );
  res.status(200).json(sorted);
});

// --- Archive Event ---
app.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((ev) => ev.id === eventId);

  if (!event) return res.status(404).json({ error: "Event not found." });

  event.archived = true;
  res.status(200).json({ message: "Event archived successfully.", event });
});

// --- Delete Event ---
app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const index = events.findIndex((ev) => ev.id === eventId);

  if (index === -1) return res.status(404).json({ error: "Event not found." });

  events.splice(index, 1);
  res.status(200).json({ message: "Event deleted successfully." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
