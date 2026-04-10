# 🚀 Real-Time Trading Dashboard

## 📌 Project Overview

This project is a fullstack real-time trading dashboard that displays live price updates and interactive charts for financial instruments.

It includes:

* A backend service that streams real-time data via WebSocket and provides REST APIs
* A frontend dashboard built with React + TypeScript for visualization

---

## 🧱 Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Recharts

### Backend

* Node.js (Express)
* WebSocket (ws)

### DevOps

* Docker (configuration included)

---

## ⚡ Features

* 📡 Real-time price updates via WebSocket
* 📊 Interactive charts for selected ticker
* 🔄 Dynamic ticker selection
* 🚨 Price alert system (bonus feature)
* ⚡ Efficient real-time state updates
* 🧪 Unit tests (frontend & backend)

---

## 📂 Project Structure

```
trading-dashboard/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## 🖥️ Run Locally (Recommended)

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

* Frontend: http://localhost:5173
* Backend: http://localhost:3001

---

## 🔧 Environment Variables

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3001
```

### Backend (`backend/.env`)

```
PORT=3001
NODE_ENV=development
```

📌 Refer to `.env` files in both frontend and backend for required variables.

---

## 📄 Setup Instructions

1. Clone the repository
2. Install dependencies:

Backend:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

3. Create `.env` files using the provided `.env`
4. Start backend and frontend servers

---

## 🧪 Running Tests

### Backend

```
cd backend
npm test
```

### Frontend

```
cd frontend
npm test
```

---

## 🐳 Docker Setup

Docker configuration is included for both frontend and backend.

**Note:** Docker setup may require proper local Docker installation and was not fully tested in this environment.
The application runs correctly using the local development setup described above.

---

## ⚠️ Assumptions & Trade-offs

* Market data is mocked/simulated
* No database used (in-memory data)
* WebSocket used for real-time updates
* Basic error handling implemented

---

## ⭐ Bonus Features Implemented

* Price alert system (user-defined threshold alerts)
* Unit testing setup

---

## 📌 Notes

* Alerts are displayed in the UI
* Focus was on real-time data handling and clean architecture

---

## 📬 Submission

This repository contains:

* Complete source code
* Unit tests
* Docker configuration
* Documentation

---

## 🙌 Author

Rohini Gaikwad
