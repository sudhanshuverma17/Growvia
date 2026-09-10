# Growvia Deployment Guide

This guide covers everything required to deploy the **Growvia** Career Guidance Platform into production.

---

## 🏗️ Architecture Overview

Growvia is architected for maximum deployment flexibility:
1. **Unified Deployment (Recommended)**: The Express backend serves both the `/api/*` endpoints and the optimized static React frontend bundle from `frontend/dist`. A single host/port runs the entire platform.
2. **Split Deployment**: Frontend deployed statically on **Vercel / Netlify / Cloudflare Pages**, Backend deployed on **Render / Railway / Fly.io / AWS**, connected to **MongoDB Atlas**.

---

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a free shared cluster (M0 sandbox).
3. Under **Database Access**: Create a database user (e.g. `growvia_admin`) and a strong password.
4. Under **Network Access**: Add IP Address `0.0.0.0/0` (Allow access from anywhere) so serverless or cloud platforms can connect.
5. Under **Clusters > Connect**: Select **Connect your application** (Drivers: Node.js) and copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/growvia?retryWrites=true&w=majority
   ```

---

## 🚀 Option 1: Deploy Only the Backend Folder (Self-Contained Full-Stack)

The production React frontend is compiled directly into `backend/public/`. This means the `backend/` folder is 100% self-contained—it serves both the client application and all API endpoints from a single Node process!

### Steps on Render / Railway / Heroku / DigitalOcean:
1. Push your repository to GitHub.
2. In your cloud dashboard (e.g. Render), create a **New Web Service**.
3. Point **Root Directory** to `backend` (or deploy the repository directly).
4. Configure:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node src/server.js`)
5. Add Environment Variables:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` (or leave default assigned by platform) |
   | `MONGO_URI` | *(Your MongoDB Atlas connection string from `backend/.env`)* |
   | `JWT_SECRET` | *(A strong random 32+ character secret string)* |
   | `ADMIN_EMAIL` | `admin@growvia.com` *(or your administrator email)* |
   | `CLIENT_URL` | `https://<your-app-name>.onrender.com` |
6. Click **Deploy Web Service**. That's it! Express will serve the React frontend at `/` and the API at `/api/*`.

---

## 🛠️ Rebuilding Frontend into `backend/public`

Whenever you make frontend changes and want to update the self-contained backend bundle:
```bash
# In the frontend folder:
cd frontend
npm run build

# Or from the project root:
npm run build
```
Vite automatically bundles the optimized assets directly into `backend/public/`.

---

## 🌐 Option 2: Split Deployment (Vercel Frontend + Render Backend)

### Step A: Deploy Backend on Render / Railway
1. Create a Web Service pointing to `backend/` as root directory.
2. **Build Command**: `npm install`
3. **Start Command**: `node src/server.js`
4. Set Environment Variables:
   - `NODE_ENV=production`
   - `MONGO_URI=mongodb+srv://...`
   - `JWT_SECRET=your_secret`
   - `CLIENT_URL=https://your-growvia-frontend.vercel.app`
5. Copy your live backend URL (e.g. `https://growvia-api.onrender.com`).

### Step B: Deploy Frontend on Vercel
1. In Vercel, import your Git repository.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Set Environment Variable:
   - `VITE_API_URL` = `https://growvia-api.onrender.com`
5. Click **Deploy**.

---

## 🐳 Option 3: Docker Deployment

Create a `Dockerfile` in the root directory:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN npm run install:all
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "src/server.js"]
```

---

## 🔒 Production Security Checklist

- [x] **Helmet Security Headers**: Active with strict CSP, XSS filter, and frame protection.
- [x] **Rate Limiting**: 25 requests / 15 mins on `/api/auth/*` to prevent brute force; 300 requests / 15 mins on general API.
- [x] **Gzip Response Compression**: Active for reduced bandwidth and faster load times.
- [x] **Sanitized Error Responses**: Stack traces hidden when `NODE_ENV=production`.
- [x] **Safe Secrets Management**: `.gitignore` created to prevent committing `.env` files.
- [x] **Initial Database Auto-Seed**: First run automatically seeds 48 careers, default admin, and 28 mentor videos if collections are empty.
- [x] **Health Check Endpoint**: Available at `/api/health` for uptime monitors (UptimeRobot, BetterUptime, Pingdom).

---

## 🧪 Verification Commands

```bash
# 1. Build optimized frontend bundle
npm run build

# 2. Start unified backend in production mode
npm run start

# 3. Test API Health check
curl http://localhost:5000/api/health
```
