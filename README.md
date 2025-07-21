# 🗓️ Event Flow

The **Event Flow** is a full-stack web application built with **React**, **Tailwind CSS**, **Express.js**, and **Node.js**. It allows users to **create**, **view**, **archive**, and **delete** events such as meetings, reminders, and personal tasks.

One of the core features is a simple **AI-like categorization** system: when creating an event, the backend automatically classifies it as **Work**, **Personal**, or **Other** based on keywords found in the title or notes.

---

## 🔗 Live Website

- 🌐 **Live Link:** [https://eventflow-f24fa.web.app/](https://eventflow-f24fa.web.app/)
- 📁 **Client & Server Repository:** [GitHub - Mini Event Scheduler](https://github.com/robinahmed12/mini-event-scheduler)


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


### 📁 Folder Structure

mini-event-scheduler/
-├── client/ # React frontend

-├── server/ # Node.js backend


---

## 📡 API Endpoints

| Method | Endpoint      | Description                                |
|--------|---------------|--------------------------------------------|
| POST   | `/events`     | Create a new event with AI categorization  |
| GET    | `/events`     | Get all events, sorted by date & time      |
| PUT    | `/events/:id` | Archive an event (sets `archived: true`)   |
| DELETE | `/events/:id` | Delete an event by ID                      |

---
---

## 👨‍💻 Author

**Robin Ahmed**  
Frontend Developer | JavaScript Enthusiast | MERN Stack Learner
--📫 [shawonahmed0294@gmail.com](mailto:shawonahmed0294@gmail.com)  
--🔗 [GitHub](https://github.com/robinahmed12) | [Portfolio](https://robinahmed.netlify.app) | [LinkedIn](https://linkedin.com/in/robinahmed12)
---
---

## 📌 Notes

- Data is stored **in-memory** using a JavaScript array (no database).
- All data will reset when the server restarts.
- Tailwind utility classes are used for styling archived cards in gray.
---
## 📁 1. Clone the Repository

```bash
git clone https://github.com/robinahmed12/mini-event-scheduler.git
cd mini-event-scheduler
<br>

🖥️ 2. Backend Setup
Navigate to the server directory and install dependencies:

bash
Copy
Edit
cd server
npm install

🔐 Environment Variables
Create a .env file in the server/ folder with the following content:
npm start
PORT=5000
🚀 Start the Backend Server
<br>


🌐 4. Frontend Setup
Navigate to the client directory and install dependencies:

bash
Copy
Edit
cd ../client
npm install
npm run dev

<br>

🧪 Run Unit Tests
bash
Copy
Edit
npm test

<br>

## 🧪 Testing

### ✅ categorizeEvent Function

The AI categorization logic is tested using **Jest**.

**Example test case:**

```js
expect(categorizeEvent("Client meeting", "Project update")).toBe("Work");

<br>

## 📦 Example Event Object

```json
{
  "id": "abc123",
  "title": "Client Meeting",
  "date": "2025-07-21",
  "time": "14:00",
  "notes": "Discuss project timeline",
  "category": "Work",
  "archived": false
}
--

