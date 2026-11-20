# ⚡ TaskFlow - Full MERN Web Application (MongoDB + Express + React + Node.js)

A complete full-stack web application built on the **MERN** architecture:
- **M**ongoDB (via **Mongoose** ODM)
- **E**xpress.js REST API
- **R**eact 19 frontend (powered by Vite)
- **N**ode.js runtime

Designed as a **Sprint & Assignment Task Manager** with real-time progress metrics, responsive cards, category tags, priority indicators, and persistent MongoDB database storage.

---

## 🚀 Features

- **MongoDB Database Storage**:
  - Structured data with Mongoose schemas and timestamps (`createdAt`, `updatedAt`).
  - Automatic collection seeding with sample tasks when empty.
  - Connection status monitoring and health reporting.
- **Full CRUD REST API**:
  - `GET /api/items` - List tasks (with optional search, category, and status filters).
  - `GET /api/items/:id` - Retrieve task details by ID.
  - `POST /api/items` - Create a new task (with category and priority tags).
  - `PUT /api/items/:id` - Update task details or toggle completion status.
  - `DELETE /api/items/:id` - Remove task from MongoDB.
  - `GET /api/health` - Health check reporting API and MongoDB connection state.
- **Modern React 19 Frontend (Vite)**:
  - Live connection badges for both API and MongoDB.
  - Filter tasks by status (`All`, `Active`, `Completed`) and categories (`Development`, `Design`, `Frontend`, `Backend`, etc.).
  - Real-time search query filtering across titles and descriptions.
  - Dynamic completion rate metrics & progress bar.
  - Inline editing for task titles and descriptions.
  - Toast feedback for actions.
  - Fully responsive, dark-mode design system.

---

## 📁 Project Structure

```text
mern-app/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection (Mongoose) & auto-seeder
│   ├── models/
│   │   └── Item.js          # Mongoose Schema & Model for tasks
│   ├── routes/
│   │   └── items.js         # Express REST API routes (/api/items)
│   ├── .env                 # Environment configuration (PORT=5000, MONGO_URI)
│   ├── .env.example         # Template for environment variables
│   ├── package.json         # Backend dependencies (express, mongoose, cors, dotenv)
│   └── server.js            # Express server entry point & middleware
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header with tech badges & live database status
│   │   │   ├── ItemCard.jsx       # Task card with inline editing & complete toggle
│   │   │   ├── ItemForm.jsx       # Form to add new tasks with category/priority
│   │   │   ├── ItemList.jsx       # Filterable & searchable task list container
│   │   │   └── StatusBanner.jsx   # Metrics, completion rate bar & refresh button
│   │   ├── services/
│   │   │   └── api.js             # Frontend API client communicating with backend
│   │   ├── App.jsx                # Main application component & state management
│   │   ├── App.css                # Component styling & responsive layouts
│   │   ├── index.css              # Theme tokens & typography
│   │   └── main.jsx               # React entry point
│   ├── index.html                 # HTML template with Google Fonts
│   ├── package.json               # Frontend dependencies (react, react-dom, vite)
│   └── vite.config.js             # Vite config with backend proxy on /api
│
├── package.json             # Root helper scripts
└── README.md                # Project documentation
```

---

## ⚙️ Configuration (.env)

The backend uses environment variables defined in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
```

If you use MongoDB Compass or MongoDB Atlas, simply update `MONGO_URI` to your connection string.

---

## 🏃 Quick Start Guide

### 1. Ensure MongoDB is Running
Make sure MongoDB is running on your system (default: port `27017`).
```bash
# If using mongod directly:
mongod --dbpath <path-to-data-dir>

# Or if using system service:
sudo systemctl start mongod # or sudo service mongodb start
```

### 2. Start the Backend Server (Terminal 1)
```bash
cd mern-app/backend
npm run dev
```
The backend will connect to MongoDB and start on: **`http://localhost:5000`**
- Health Check: `http://localhost:5000/api/health`
- Items Endpoint: `http://localhost:5000/api/items`

### 3. Start the Frontend Application (Terminal 2)
```bash
cd mern-app/frontend
npm run dev
```
The frontend will start at: **`http://localhost:3000`**

Open `http://localhost:3000` in your web browser!

---

## 🔌 API Reference

| Method | Endpoint | Description | Sample Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status & MongoDB connection state | - |
| `GET` | `/api/items` | Query items (`?search=`, `?category=`, `?status=`) | - |
| `GET` | `/api/items/:id` | Get single item by MongoDB ID | - |
| `POST` | `/api/items` | Add a new task to MongoDB | `{"title": "Task name", "category": "Frontend", "priority": "High"}` |
| `PUT` | `/api/items/:id` | Update task or toggle completion in MongoDB | `{"completed": true}` or `{"title": "Updated"}` |
| `DELETE`| `/api/items/:id` | Delete task from MongoDB | - |
