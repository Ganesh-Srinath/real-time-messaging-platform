# Distributed Event-Driven Real-Time Messaging Infrastructure

A full-stack real-time messaging platform inspired by Discord that supports server-based communication, channels, authentication, and real-time messaging using Socket.IO.

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- JWT Authentication
- HTTP-only Cookie Authentication
- Protected Routes

### Server Management

- Create Server
- Join Server using Invite Code
- View Joined Servers

### Channel Management

- Create Channels
- View Channels within a Server

### Messaging

- Send Messages
- View Previous Messages
- Real-Time Messaging using Socket.IO
- Automatic Chat Scroll

### Security

- Password Hashing using bcrypt
- JWT Verification
- Cookie-based Authentication
- Protected Backend APIs

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS
- DaisyUI

### Backend

- Node.js
- Express.js
- Socket.IO
- JWT
- bcrypt
- Cookie Parser

### Database

- MySQL

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```
real-time-messaging-platform
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── socket
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── socket
│   │   └── server.js
│
└── docker-compose.yml
```

---

## System Architecture

```
React Frontend
       │
       ▼
REST API (Express)
       │
       ▼
Authentication
       │
       ▼
JWT + HTTP-only Cookies
       │
       ▼
MySQL Database
```

### Real-Time Communication

```
Client A
    │
Socket.IO
    │
Express Server
    │
Socket.IO
    │
Client B
```

---

## Database Schema

### Users

| Column | Type |
|---------|------|
| id | UUID |
| username | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |

---

### Servers

| Column | Type |
|---------|------|
| id | UUID |
| name | VARCHAR |
| owner_id | UUID |
| invite_code | VARCHAR |

---

### Server Members

| Column | Type |
|---------|------|
| server_id | UUID |
| user_id | UUID |

---

### Channels

| Column | Type |
|---------|------|
| id | UUID |
| server_id | UUID |
| name | VARCHAR |

---

### Messages

| Column | Type |
|---------|------|
| id | UUID |
| channel_id | UUID |
| user_id | UUID |
| content | TEXT |
| created_at | TIMESTAMP |

---

## API Endpoints

### Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me
```

---

### Servers

```
GET /api/servers

POST /api/servers

POST /api/servers/join
```

---

### Channels

```
GET /api/servers/:serverId/channels

POST /api/servers/:serverId/channels
```

---

### Messages

```
GET /api/servers/:channelId/messages

POST /api/servers/:channelId/messages
```

---

## Socket.IO Events

### Client → Server

```
joinRoom

sendMessage
```

### Server → Client

```
newMessage

messageError
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/real-time-messaging-platform.git
```

### Backend

```bash
cd backend

npm install
```

### Frontend

```bash
cd frontend

npm install
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

JWT_SECRET=your_secret_key

DB_HOST=mysql

DB_PORT=3306

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=messaging
```

---

## Run with Docker

```bash
docker compose up --build
```

---

## Future Improvements

- Typing Indicators
- Online User Status
- Message Reactions
- File Sharing
- Image Uploads
- Voice Channels
- Video Calls
- Push Notifications

---

## Learning Outcomes

This project demonstrates practical experience with:

- Full Stack Web Development
- REST API Design
- Authentication & Authorization
- Real-Time Communication
- WebSockets
- Database Design
- Docker
- Component-Based Architecture
- State Management in React
- Backend Layered Architecture (Controller → Service → Model)

---

## Author

**Kattula Ganesh Srinath**

Bachelor of Engineering (Computer Science)

JSS Academy of Technical Education, Bengaluru
