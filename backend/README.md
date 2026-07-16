# Real-Time Messaging Platform

A real-time messaging platform backend inspired by Discord, built using **Express.js**, **Socket.IO**, and **MySQL**. The application provides secure JWT authentication, server and channel management, persistent messaging, and real-time communication.

---

## Features

- User Registration & Login
- JWT Authentication
- Create and Join Servers
- Channel Management
- Persistent Message Storage
- Real-time Messaging using Socket.IO
- MySQL Relational Database
- Transaction-based Server Creation
- Layered Architecture (Routes → Controllers → Services → Models)

---

## Tech Stack

### Backend

- Node.js
- Express.js
- Socket.IO

### Database

- MySQL

### Authentication

- JWT (JSON Web Token)
- bcrypt

### Other Packages

- uuid
- cors
- dotenv

---

## Folder Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── app.js
│   └── server.js
│
├── schema.sql
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file using `.env.example`.

### Create the Database

Import the `schema.sql` file into MySQL.

### Start the Development Server

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---

## Environment Variables

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=discord_clone

JWT_SECRET=your_jwt_secret
```

---

## Database Schema

The application uses the following tables:

- users
- servers
- server_members
- channels
- messages

---

## REST API

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |

### Servers

| Method | Endpoint |
|---------|----------|
| POST | `/api/servers` |
| GET | `/api/servers` |
| POST | `/api/servers/join` |

### Channels

| Method | Endpoint |
|---------|----------|
| POST | `/api/servers/:serverId/channels` |
| GET | `/api/servers/:serverId/channels` |

### Messages

| Method | Endpoint |
|---------|----------|
| POST | `/api/servers/:channelId/messages` |
| GET | `/api/servers/:channelId/messages` |

---

## Socket.IO Events

### Client → Server

- `joinRoom`
- `sendMessage`

### Server → Client

- `newMessage`
- `messageError`

---

## Project Architecture

```text
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
MySQL
```

Socket.IO follows the same layered architecture:

```text
Socket Event
      │
      ▼
Socket Handler
      │
      ▼
Services
      │
      ▼
Models
      │
      ▼
MySQL
```

---

## Future Improvements

- Role-based permissions
- Direct messaging
- File and image uploads
- Message reactions
- Threaded conversations
- Typing indicators
- Online user status
- Voice channels
- Request validation
- Centralized error handling
- Automated testing
- Docker support
- Deployment

---

## License

This project is intended for educational and portfolio purposes.