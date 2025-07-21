# 🗓️ Mini Event Scheduler

The **Mini Event Scheduler** is a full-stack web application built with **React**, **Tailwind CSS**, **Express.js**, and **Node.js**. It allows users to **create**, **view**, **archive**, and **delete** events such as meetings, reminders, and personal tasks.

One of the core features is a simple **AI-like categorization** system: when creating an event, the backend automatically classifies it as **Work**, **Personal**, or **Other** based on keywords found in the title or notes.

---

## 🚀 Features

- Create events with a title, date, time, and optional notes
- Automatically categorize events (Work / Personal / Other)
- View all events, sorted by date and time
- Archive events (with UI feedback)
- Delete events
- Stylish, responsive UI with Tailwind CSS

---

## ⚙️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Data Storage:** In-memory (JavaScript array)

---

## 🧠 AI Categorization Logic

On event creation, the backend automatically categorizes the event as:
- **Work:** if the title or notes include `meeting`, `project`, `client`, etc.
- **Personal:** if the text includes `birthday`, `family`, `friend`, etc.
- **Other:** if no matching keywords are found

---

## 🖥️ Local Setup Instructions

### 📁 Folder Structure

mini-event-scheduler/
├── client/ # React frontend
├── server/ # Node.js backend



---

📡 API Endpoints
Method	Endpoint	Description
POST	/events	Create a new event with AI categorization
GET	/events	Get all events, sorted by date & time
PUT	/events/:id	Archive an event (sets archived: true)
DELETE	/events/:id	Delete an event by ID

---


📝 Notes
All event data is stored in-memory (will reset when the server restarts).

Make sure both the client and server are running simultaneously.

---

📧 Contact
Created with ❤️ by Robin Ahmed
GitHub • Portfolio • Email

---
### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-event-scheduler.git
cd mini-event-scheduler

cd server
npm install
npm run dev
The backend will run on http://localhost:5000.
