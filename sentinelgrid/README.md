# 🔐 SentinelGrid: Unified Event Security & Intelligence Platform

> A modular, AI-assisted and API-driven platform for securing physical and hybrid events through real-time access control, threat detection, and incident response. Blends AI with non-AI systems for maximum reliability and scalability.

---

## 🚀 Overview

**SentinelGrid** is a next-gen event security solution designed to protect public gatherings, concerts, college fests, summits, and more. It unifies **QR-based access control**, **real-time surveillance**, **threat detection**, and **incident management** into a single command dashboard — powered by both smart AI models and rule-based systems.

---

## 🛠️ Project Structure

The project is organized into two main parts: the backend and the frontend.

### Backend

- **src/app.js**: Entry point of the backend application. Initializes the Express app, sets up middleware, and connects to MongoDB.
- **src/controllers/index.js**: Exports controller functions for handling requests and responses.
- **src/models/index.js**: Defines MongoDB schemas and models for data storage and retrieval.
- **src/routes/index.js**: Sets up application routes and links them to controller functions.
- **src/services/aiService.js**: Contains functions that utilize AI models for threat detection and analysis.
- **src/utils/notification.js**: Utility functions for sending notifications using Firebase Cloud Messaging.
- **package.json**: Configuration file listing dependencies required for the backend application.

### Frontend

- **src/App.jsx**: Main component of the frontend application, setting up routing and rendering the layout.
- **src/components/index.jsx**: Exports reusable components used throughout the application.
- **src/pages/Home.jsx**: Represents the home page of the application.
- **src/utils/fcm.js**: Utility functions for integrating Firebase Cloud Messaging in the frontend.
- **package.json**: Configuration file listing dependencies required for the frontend application.

---

## 🚀 Getting Started

### Requirements

- Node.js 18+
- MongoDB
- Firebase Cloud Messaging

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install express mongoose firebase-admin
   ```

3. Create a `.env` file in the backend directory to store environment variables, including MongoDB connection string and Firebase credentials.

4. Start the backend server:
   ```bash
   node src/app.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install react firebase
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```

---

## 📚 Documentation

For detailed documentation on each module and component, refer to the respective `README.md` files in the `backend` and `frontend` directories.