# 🔐 SentinelGrid: Unified Event Security & Intelligence Platform

> A modular, AI-assisted and API-driven platform for securing physical and hybrid events through real-time access control, threat detection, and incident response. Blends AI with non-AI systems for maximum reliability and scalability.

---

## 🚀 What is SentinelGrid?

**SentinelGrid** is a next-gen event security solution designed to protect public gatherings, concerts, college fests, summits, and more.  
It unifies **QR-based access control**, **real-time surveillance**, **threat detection**, and **incident management** into a single command dashboard — powered by both smart AI models and rule-based systems.

---

## 🧩 Core Modules

- 🎫 **Access Control** — QR-based identity verification and role-based entry
- 🔗 **API Mesh Layer** — Connects with real-time emergency, weather, and transit data
- 📸 **Threat Detection** — Uses AI models to flag visual or behavioral anomalies
- 🗺️ **Crowd Heatmaps** — Visualize zone-wise movement and density
- 👣 **User Behavior Monitoring** — Track and alert on suspicious patterns
- ⚠️ **Incident Response** — Drag-and-drop emergency response plans
- 📱 **Organizer & Guest App** — Separate portals for event staff and attendees

---

## 🛠️ Tech Stack

| Layer        | Tools                                     |
|--------------|-------------------------------------------|
| Frontend     | React, TailwindCSS, Mapbox                |
| Backend      | FastAPI or Node.js                        |
| Database     | PostgreSQL, MongoDB, Redis (optional)     |
| AI Models    | YOLOv8 (vision), DistilBERT (text NLP)    |
| API Integrations | REST APIs, OAuth2, JWT                |
| Notifications| Twilio, Firebase Cloud Messaging          |
| DevOps       | Docker, Kubernetes, NGINX                 |

---

## 🚀 Getting Started

### Requirements
- Python 3.10+
- Node.js 18+
- Docker (for deployment)
- PostgreSQL (or MongoDB)

### Run Locally

```bash
git clone https://github.com/yourusername/sentinelgrid.git
cd sentinelgrid
```

# Start backend
```bash
cd backend
uvicorn app.main:app --reload
```

# Start frontend
```bash
cd ../frontend
npm install
npm start
```
