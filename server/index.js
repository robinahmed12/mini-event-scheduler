const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let events = [];
console.log(events);

// Keyword lists for categorization
const keywords = {
  work: ["meeting", "project", "client", "deadline", "presentation"],
  personal: ["birthday", "family", "anniversary", "party", "holiday"],
  // Other category is default if none matched
};

// Helper function to categorize event
function categorizeEvent(title, notes) {
  const text = (title + " " + (notes || "")).toLowerCase();

  for (const word of keywords.work) {
    if (text.includes(word)) return "Work";
  }
  for (const word of keywords.personal) {
    if (text.includes(word)) return "Personal";
  }
  return "Other";
}

// POST /events - create a new event
app.post("/events", (req, res) => {
  const { title, date, time, notes, archived } = req.body;

  // Basic validation
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }
  if (!date || isNaN(Date.parse(date))) {
    return res
      .status(400)
      .json({ error: "Date is required and must be valid." });
  }
  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) {
    return res
      .status(400)
      .json({ error: "Time is required and must be in HH:MM format." });
  }

  const category = categorizeEvent(title, notes);

  // Create event object with unique id
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

  return res.status(201).json(newEvent);
});

// GET /events - get all events sorted by date and time
app.get("/events", (_req, res) => {
  const sortedEvents = events.slice().sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  res.status(200).json(sortedEvents);
});

// PUT /events/:id - archive an event
app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const eventId = parseInt(id);

  const event = events.find((ev) => ev.id === eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

  event.archived = true;

  res.status(200).json({ message: "Event archived successfully.", event });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
