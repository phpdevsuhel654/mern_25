# 💰 Expense Tracker App (MERN Stack)

A full-stack **Expense Tracker Dashboard** built with **Node.js, Express, MongoDB, React, Tailwind CSS, and Chart.js**.
Track daily expenses, visualize spending patterns, and manage finances efficiently.

---

# 🚀 Features

## 🔐 Authentication

* User Registration & Login (JWT-based)
* Secure protected routes

## 💰 Expense Management

* Add, edit, delete expenses
* Categorize (Food, Travel, Bills, etc.)
* Date-wise tracking

## 📊 Analytics & Reports

* Category-wise spending (Pie chart)
* Monthly spending trends (Bar chart)
* Dashboard summary cards

## 🎨 UI/UX

* Premium dashboard layout
* Sidebar navigation
* Dark mode ready 🌙
* Responsive design

---

# 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Chart.js
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

# 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 🔗 API Endpoints

## 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

## 💰 Expenses

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/expenses     | Get all expenses |
| POST   | /api/expenses     | Add expense      |
| PUT    | /api/expenses/:id | Update expense   |
| DELETE | /api/expenses/:id | Delete expense   |

---

## 📊 Reports

| Method | Endpoint                       | Description     |
| ------ | ------------------------------ | --------------- |
| GET    | /api/expenses/reports/category | Category report |
| GET    | /api/expenses/reports/monthly  | Monthly report  |

---

# 🌐 Deployment Guide

## 🚀 Backend Deployment (Render)

### Steps:

1. Push code to GitHub
2. Go to Render → Create Web Service
3. Connect repository
4. Configure:

```
Build Command: npm install
Start Command: node server.js
```

### Add Environment Variables:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

---

## 🚀 Frontend Deployment (Vercel)

### Steps:

1. Push frontend to GitHub
2. Go to Vercel → Import Project
3. Select frontend folder
4. Add environment variable:

```
REACT_APP_API_URL=https://your-backend-url/api
```

### Update Axios Base URL:

```js
baseURL: process.env.REACT_APP_API_URL
```

---

## ☁️ MongoDB (Atlas)

1. Create cluster on MongoDB Atlas
2. Create database user
3. Allow IP access (0.0.0.0/0 for testing)
4. Copy connection string → use in backend `.env`

---

# 🔒 Security Best Practices

* Use HTTPS in production
* Store secrets in environment variables
* Hash passwords using bcrypt
* Use JWT expiration
* Enable CORS properly

---

# 📈 Future Improvements

* Budget planning 💡
* Recurring expenses 🔁
* Export reports (CSV/PDF) 📄
* Notifications 🔔
* Mobile app 📱

---

# 🤝 Contributing

Contributions are welcome!

```bash
Fork the repo
Create your branch (feature/new-feature)
Commit changes
Push and create PR
```

---

# 📜 License

MIT License

---

# 👨‍💻 Author

**Sohail Anjum Mulla**

---

# ⭐ Support

If you like this project:

👉 Star the repo
👉 Share with others
👉 Build more features 🚀

---
