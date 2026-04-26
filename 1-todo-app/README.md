# 📌 To-Do List Application (MERN Stack)

![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?logo=react)
![Node](https://img.shields.io/badge/Node.js-Runtime-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A full-stack **To-Do List Application** built using the **MERN Stack**:

* ⚛️ React.js (Frontend)
* 🟢 Node.js + Express (Backend)
* 🍃 MongoDB (Database)

---

# 🚀 Features

* ✅ Create, Read, Update, Delete Todos
* 🔍 Search Todos (backend-powered)
* 📄 Pagination support
* 🎯 Filter (Completed / Pending)
* ⚡ Responsive UI
* 🌐 RESTful API

---

# 📁 Project Structure

```
todo-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.js
│
└── README.md
```

---

# ⚙️ API Documentation

## 🔹 Base URL

```
http://localhost:5000/api/todos
```

---

## 📌 1. Get Todos (Search + Pagination)

**GET /**

### Query Params

| Param  | Type   | Description     |
| ------ | ------ | --------------- |
| page   | number | Page number     |
| limit  | number | Items per page  |
| search | string | Search by title |

### Example

```
GET /api/todos?page=1&limit=5&search=todo
```

### Response

```json
{
  "todos": [
    {
      "_id": "123",
      "title": "My Todo",
      "completed": false,
      "createdAt": "2026-04-07T06:21:09.551Z"
    }
  ],
  "totalPages": 3,
  "currentPage": 1,
  "totalItems": 15
}
```

---

## 📌 2. Create Todo

**POST /**

```json
{
  "title": "New Todo"
}
```

---

## 📌 3. Update Todo

**PUT /:id**

```json
{
  "title": "Updated Todo",
  "completed": true
}
```

---

## 📌 4. Delete Todo

**DELETE /:id**

---

# 🛠️ How to Run Locally

## 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

---

## 🔹 2. Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Run Backend

```bash
npm start
```

---

## 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 🌐 Application URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

---

# 🚀 Deployment Guide

## 🔹 Backend (Render)

* Create a new Web Service
* Connect GitHub repo

**Settings:**

```
Build Command: npm install
Start Command: npm start
```

**Environment Variables:**

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 🔹 Frontend (Netlify)

**Settings:**

```
Build Command: npm run build
Publish Directory: build
```

---

## 🔹 Update API URL

```js
const API = "https://your-backend-url/api/todos";
```

---

# 🔐 Environment Variables

| Variable  | Description               |
| --------- | ------------------------- |
| MONGO_URI | MongoDB connection string |
| PORT      | Server port               |

---

# 🧪 Future Enhancements

* 🔐 Authentication (JWT)
* 🧠 Redux / Context API
* 🌙 Dark Mode
* 📱 Mobile Optimization
* 📊 Dashboard / Analytics

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Sohail Anjum Mulla**

---

# ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🛠️ Contribute

---

# 📄 License

This project is licensed under the **MIT License**
