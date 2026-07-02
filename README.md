# Task Manager Web Application

A full-stack Task Manager web application built as part of the Full Stack Developer Take Home Assignment.

## Features

### Core Features
- Create, Read, Update and Delete tasks
- Task fields:
  - Title
  - Description
  - Due Date
  - Priority (Low / Medium / High)
  - Status (To Do / In Progress / Done)
- Filter tasks by status
- Filter tasks by priority
- Responsive user interface
- Data stored in MySQL through REST APIs

### AI Feature
- AI Suggest button on the Create Task page
- User enters a task title
- Groq AI automatically generates:
  - Task description
  - Suggested priority
- User can edit the AI-generated content before saving

### Bonus Feature
- JWT Authentication
- Secure Login
- Protected APIs
- Logout functionality

---

# Tech Stack

## Frontend
- React (Vite)
- React Router DOM
- CSS

## Backend
- FastAPI
- Python
- PyMySQL
- python-jose (JWT)

## Database
- MySQL

## AI
- Groq API (Llama Model)

---

# Project Structure

```
task_manager/
│
├── backend/
│   ├── authentication/
│   ├── connections/
│   ├── models/
│   ├── routes/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# REST APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /login | Login |
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get task |
| POST | /tasks | Create task |
| PUT | /tasks/{id} | Update task |
| DELETE | /tasks/{id} | Delete task |
| POST | /ai/suggest | Generate AI suggestion |

---

# Setup Instructions

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

py -m uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Database

Create a MySQL database named:

```
task_manager
```

Update the database credentials in:

```
connections/database.py
```

---

# AI Tools Used

- Groq API
- Llama Model
- ChatGPT (used for guidance during development)

---

# Why I Chose This Tech Stack

- **React** for building a fast and responsive frontend.
- **FastAPI** for creating lightweight and high-performance REST APIs.
- **MySQL** for reliable relational data storage.
- **Groq API** for fast AI-powered task description and priority generation.
- **JWT Authentication** to secure backend APIs.

---

# One Thing I Would Improve

If given more time, I would:

- Deploy the application using Render and Vercel.
- Move database configuration to environment variables.
- Add drag-and-drop task management.
- Improve UI animations.
- Add pagination and search.

---

# Deployment

The application currently runs locally.

Deployment was not completed because the project currently uses a local MySQL database (localhost). Migrating to a managed cloud database (e.g., Railway or Aiven) would enable deployment to Render and Vercel.

---



# Author

**Sreyas S**
