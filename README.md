# Growvia - Fullstack Career Guidance & Roadmap Platform

A modern, fullstack career platform built with **React (Pure JavaScript / Vite)** on the frontend and **Express + MongoDB (Mongoose)** on the backend.

---

## 🌟 Key Features

### 1. Frontend (Pure JavaScript React)
- **48+ Dynamic Career Roadmaps**: Detailed stage-by-stage progression, skills, top colleges, exams, and salary tiers.
- **Admin Studio & Management**:
  - Add, edit, and delete career roadmaps.
  - Interactive stage timeline editor with reordering (Move Up / Move Down).
  - **Optional Courses on Roadmaps**: Admin can attach online courses/certifications with platform, duration, pricing, and links. If no courses are added, the section is cleanly hidden.
- **Career Assessment Quiz**: 8-step interactive assessment with smart career scoring.
- **Mentor Video Hub & Masterclasses (`/videos`)**:
  - Curated video guidance with domain filtering (Design, Tech, Business, Medical, etc.) and access filters (All, Free, Paid Masterclasses).
  - Modal video player for inline YouTube/Vimeo playback of free videos.
  - Dedicated access cards & purchase unlock triggers for paid masterclasses.
- **Admin Video Studio (`/admin/videos`)**:
  - Full CRUD management of videos (Title, Mentor, Career, Video URL, Free/Paid status, Pricing, Duration, Views, Tag).
  - Free vs. Paid toggle with custom price setting (e.g. ₹299, ₹499).
- **Course-Attached Videos in Roadmaps (`/roadmaps/:career`)**:
  - Admin Course Editor features a dedicated **Related Videos** tab.
  - **No external YouTube links allowed**: Admins attach videos directly from already uploaded videos in the system via an interactive Video Picker Modal.
  - Sourced videos preserve verified metadata, duration, mentor info, and Free vs. Paid status with admin-defined pricing.
  - When students view the roadmap, attached videos are clearly badged (Free vs. Paid) and playable in the modal.
- **₹99 All-Access Pass Simulation**: Integrated checkout and celebratory confetti animations.
- **Student Dashboard**: Track roadmap progression, milestones, and saved careers.
- **Modern UI / UX**: Tailwind CSS v4, Framer Motion animations, Radix UI primitives, Lucide icons, and responsive design.

### 2. Backend (Express & MongoDB)
- **Authentication & JWT**: Secure user registration, password hashing with `bcryptjs`, and 7-day signed JWT tokens.
- **Role-Based Authorization (RBAC)**: Distinguishes between students (`user`) and administrators (`admin`).
- **Protected Endpoints**: Admin-only access for creating, editing, and deleting roadmaps and courses.
- **RESTful API**: Clean REST endpoints for CRUD operations on career roadmaps and attached courses.
- **MongoDB Database**: Mongoose model with automatic schema validation and timestamps.
- **Auto-Seeding**: Automatic population of initial 48 career roadmaps and default Admin account if the database is empty.
- **Resilient Fallback**: Frontend seamlessly loads from backend API (`/api/courses`) and gracefully falls back to local storage if the backend is offline.

---

## 📁 Project Structure

```
Growvia/
├── backend/                  # Express + MongoDB API Server
│   ├── src/
│   │   ├── config/db.js      # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js       # User schema with bcrypt & roles
│   │   │   └── Course.js     # Career & Roadmap Mongoose schema
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # protect (JWT) & authorize (RBAC)
│   │   ├── controllers/
│   │   │   ├── authController.js   # register, login, me, save-roadmap
│   │   │   └── courseController.js # CRUD controllers
│   │   ├── routes/
│   │   │   ├── authRoutes.js   # /api/auth
│   │   │   └── courseRoutes.js # /api/courses
│   │   ├── data/seedData.js  # 48 initial career roadmaps
│   │   └── server.js         # Express server entry point
│   ├── .env                  # PORT=5000, MONGO_URI, JWT_SECRET
│   └── package.json
│
├── frontend/                 # React 18 + Vite (Pure JavaScript)
│   ├── src/
│   │   ├── pages/            # Home, Roadmaps, Login, Dashboard, Admin Studio...
│   │   ├── components/       # Layout, Protected Routes (AdminRoute, UserRoute)...
│   │   ├── context/          # AuthContext & CourseContext (live sync)
│   │   └── lib/              # Utilities, mock data fallback
│   ├── vite.config.js        # Vite config with API proxy to localhost:5000
│   └── package.json
│
├── package.json              # Root package with concurrent dev scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher (tested on Node v22)
- **MongoDB**: Ensure MongoDB service is running locally (`mongodb://127.0.0.1:27017`)

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(Or run `npm install` inside both `frontend/` and `backend/`)*

### 2. Configure Backend Environment
The `backend/.env` file is pre-configured:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/growvia
JWT_SECRET=growvia_super_secret_jwt_key_2026_dev
JWT_EXPIRES_IN=7d
```

### 3. Run Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000` (Health: `http://localhost:5000/api/health`)
- **Frontend App**: `http://localhost:3000`

### 4. Running Individually (Optional)
- **Backend only**:
  ```bash
  npm run dev:backend
  ```
- **Frontend only**:
  ```bash
  npm run dev:frontend
  ```

---

## 🛠️ API Reference

### Authentication & User Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new student or admin |
| `POST` | `/api/auth/login` | Public | Login and obtain JWT token |
| `GET` | `/api/auth/me` | Protected | Get current user profile |
| `POST` | `/api/auth/save-roadmap` | Protected | Bookmark/unbookmark a roadmap |

### Courses & Roadmaps Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Service and MongoDB health status |
| `GET` | `/api/courses` | Public | Get all career roadmaps |
| `GET` | `/api/courses/:id` | Public | Get single roadmap by ID or slug |
| `POST` | `/api/courses` | Admin | Create a new career roadmap |
| `PUT` | `/api/courses/:id` | Admin | Update career roadmap, stages, or attached videos |
| `DELETE` | `/api/courses/:id` | Admin | Delete a career roadmap |
| `POST` | `/api/courses/reset` | Admin | Reset MongoDB database to default 48 roadmaps |

### Videos & Masterclasses Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/videos` | Public | Get all videos with optional filters (`careerId`, `isPaid`, `tag`, `search`) |
| `GET` | `/api/videos/:id` | Public | Get single video details |
| `POST` | `/api/videos` | Admin | Add new video with Free/Paid status and price |
| `PUT` | `/api/videos/:id` | Admin | Update video details, Free/Paid toggle, price |
| `DELETE` | `/api/videos/:id` | Admin | Delete a video |

---

## 🏗️ Production Build
```bash
npm run build
```
Build output is saved to `frontend/dist/`.
