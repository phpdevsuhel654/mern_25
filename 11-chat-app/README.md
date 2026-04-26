# 💬 Real-Time Chat Application

A full-stack **real-time chat application** built using the **MERN Stack + Socket.IO**.
Supports **one-to-one messaging, group chats, authentication, and live updates** — similar to WhatsApp.

---

# 🚀 Live Demo

* 🌐 Frontend: https://your-frontend.vercel.app
* ⚙️ Backend: https://your-backend.onrender.com

---

# 🎥 Demo

![Demo GIF](./assets/demo.gif)

> 📌 Tip: Record using Loom / OBS and convert to GIF using ezgif.com

---

# 📸 Screenshots

| Login                   | Chat UI                |
| ----------------------- | ---------------------- |
| ![](./assets/login.png) | ![](./assets/chat.png) |

| Group Chat              | Profile                   |
| ----------------------- | ------------------------- |
| ![](./assets/group.png) | ![](./assets/profile.png) |

---

# 🧰 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Socket.IO

## Deployment

* Vercel
* Render
* MongoDB Atlas

---

# 🏗️ Architecture

```id="csxvxp"
[ React Frontend ]
        |
        v
[ Node.js + Express API ]
        |
        v
[ MongoDB Atlas Database ]

Realtime Layer:
Frontend <--> Socket.IO <--> Backend
```

---

# ✨ Features

## 🔐 Authentication

* User registration & login
* JWT-based authentication
* Secure protected routes

## 💬 Chat Features

* One-to-one chat
* Group chat
* Real-time messaging
* Message history

## ⚡ Real-Time Features

* Instant messaging
* Typing indicators
* Online/offline presence

## 📩 Messaging Enhancements

* Seen / Delivered status ✔✔
* Unread message count
* Toast notifications

## 👤 User Features

* Profile update
* Avatar support (optional)

---

# 📁 Project Structure

```id="b0h9y1"
chat-app/
├── backend/
├── frontend/
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```id="2ty5v7"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

# 🛠️ Local Development

## 1️⃣ Clone Repo

```id="c8n3mg"
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

## 2️⃣ Backend

```id="zz3snh"
cd backend
npm install
npm run dev
```

---

## 3️⃣ Frontend

```id="r8s9dr"
cd frontend
npm install
npm start
```

---

# 🔌 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Chat

* POST `/api/chat`
* GET `/api/chat`
* POST `/api/chat/group`

### Message

* POST `/api/message`
* GET `/api/message/:chatId`

---

# 🔄 Socket Events

* `setup`
* `join_chat`
* `new_message`
* `message_received`
* `typing`
* `stop_typing`

---

# 🐳 Docker Setup (Optional)

## Backend Dockerfile

```dockerfile id="v1j6jw"
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["node", "server.js"]
```

---

## Run with Docker

```bash id="r69rxv"
docker build -t chat-backend .
docker run -p 5000:5000 chat-backend
```

---

# 🧪 Testing (Basic Setup)

Install:

```bash id="h2x4k1"
npm install jest supertest --save-dev
```

Example test:

```js id="v8eyr2"
const request = require("supertest");
const app = require("../app");

test("API working", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});
```

---

# 🚀 Deployment

## Database

* MongoDB Atlas

## Backend

* Render

## Frontend

* Vercel

---

# 🔐 Security Best Practices

* Use HTTPS
* Store secrets in `.env`
* Add Helmet middleware
* Use rate limiting

---

# 📊 Future Improvements

* 📎 File & image sharing
* 🎤 Voice messages
* 📱 Mobile responsiveness
* 🌐 PWA support
* 🔔 Push notifications

---

# 🤝 Contributing

Pull requests are welcome!

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Sohail Anjum Mulla**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
