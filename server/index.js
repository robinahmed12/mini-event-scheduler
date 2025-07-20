const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let events = [];

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
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  }
  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: "Date is required and must be valid." });
  }
  if (!time || !/^\d{1,2}:\d{2}$/.test(time)) {
    return res.status(400).json({ error: "Time is required and must be in HH:MM format." });
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
