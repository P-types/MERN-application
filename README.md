# ⚡ TaskFlow - Simple MERN Web Application (No Database Required)

A full-stack web application built on the **MERN** architecture (**M**ongoDB/Mock Data, **E**xpress.js, **R**eact, **N**ode.js) designed as a **Sprint & Assignment Task Manager**.

> **Note on Storage:** Per the requirement, **no database is required**. All data is persisted in a fast, in-memory store on the Express backend with pre-populated sample data. It provides the full CRUD REST API experience without needing MongoDB installed or configured.

---

## 🚀 Features

- **Full CRUD REST API**:
  - `GET /api/items` - List tasks (with optional search, category, and status filters)
  - `GET /api/items/:id` - Retrieve task details
  - `POST /api/items` - Create a new task (with category and priority tags)
  - `PUT /api/items/:id` - Update task details or toggle completion status
  - `DELETE /api/items/:id` - Remove task from storage
  - `GET /api/health` - Server health check & status
- **Modern React 19 Frontend (Vite)**:
  - Real-time connection status pill (pings `/api/health`)
  - Filter tasks by status (`All`, `Active`, `Completed`) and categories (`Development`, `Design`, `Frontend`, etc.)
  - Real-time search query filtering
  - Task completion metrics & progress bar
  - Inline editing for task titles and descriptions
  - Toast feedback for actions
  - Fully responsive, dark-mode design system

---

## 📁 Project Structure

```text
mern-app/
├── backend/
│   ├── data/
│   │   └── store.js         # In-memory data store with initial mock items & CRUD methods
│   ├── routes/
│   │   └── items.js         # Express REST API routes (/api/items)
│   ├── .env                 # Environment configuration (PORT=5000)
│   ├── package.json         # Backend dependencies (express, cors, dotenv)
│   └── server.js            # Express server entry point & middleware
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header with tech stack badges & live status
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

## 🏃 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node.js v24)
- **npm**: v9+

### 2. Start the Backend Server (Terminal 1)
```bash
cd mern-app/backend
npm run dev
```
The backend will start at: **`http://localhost:5000`**
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
| `GET` | `/api/health` | Backend status & system info | - |
| `GET` | `/api/items` | Query items (`?search=`, `?category=`, `?status=`) | - |
| `GET` | `/api/items/:id` | Get single item by ID | - |
| `POST` | `/api/items` | Add a new task | `{"title": "Task name", "category": "Frontend", "priority": "High"}` |
| `PUT` | `/api/items/:id` | Update task or toggle completion | `{"completed": true}` or `{"title": "Updated"}` |
| `DELETE`| `/api/items/:id` | Delete task from memory | - |

---

## 💡 How to Add MongoDB Later (Optional)
If you later want to connect a real MongoDB instance:
1. Run `npm install mongoose` inside `backend/`.
2. Replace `backend/data/store.js` with a Mongoose Model (`mongoose.model('Item', itemSchema)`).
3. Connect with `mongoose.connect(process.env.MONGO_URI)` in `backend/server.js`.
The frontend and route controllers require virtually no change because the REST API contract remains identical!
