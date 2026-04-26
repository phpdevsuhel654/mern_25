# 📌 Random Quote Generator App (MERN Stack)

A full-stack **Random Quote Generator Application** built using **Node.js (Express)** and **React.js**, which fetches inspirational quotes from an external API.

---

# 🚀 Features

* 🎯 Fetch random inspirational quotes
* 🔁 Generate new quotes on button click
* ⚡ Fast and responsive UI
* 🔗 Backend proxy for API handling
* ❌ No database required
* 🧩 Clean and scalable architecture

---

# 🏗️ Project Architecture

```
random-quote-app/
│
├── backend/        # Node.js + Express API
│
└── frontend/       # React.js UI
```

---

# 🧠 How It Works

```
Frontend (React)
      ↓
Backend API (Node.js)
      ↓
External API (API Ninjas)
```

* Frontend sends request to backend
* Backend fetches quote from API Ninjas
* Backend returns formatted response
* Frontend displays the quote

---

# 🛠️ Tech Stack

### Frontend:

* React.js
* Axios
* CSS / Inline Styling (or Tailwind if added)

### Backend:

* Node.js
* Express.js
* Axios
* dotenv
* cors

---

# 🔗 External API Used

* API Provider: API Ninjas
* Endpoint:

  ```
  https://api.api-ninjas.com/v1/quotes
  ```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/random-quote-app.git
cd random-quote-app
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

## 📄 Create `.env` file

```
PORT=5000
NINJA_API_KEY=your_api_key_here
```

👉 Get API key from: https://api-ninjas.com/

---

## ▶️ Run Backend

```bash
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Get Random Quote

```
GET /api/quotes/random
```

### ✅ Response

```json
{
  "content": "The best way to predict the future is to create it.",
  "author": "Peter Drucker"
}
```

---

# 📁 Backend Structure

```
backend/
│
├── controllers/
│   └── quoteController.js
│
├── routes/
│   └── quoteRoutes.js
│
├── services/
│   └── quoteService.js
│
├── server.js
└── .env
```

---

# 📁 Frontend Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   └── QuoteCard.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   └── index.js
```

---

# 🔒 Environment Variables

| Variable      | Description         |
| ------------- | ------------------- |
| PORT          | Backend server port |
| NINJA_API_KEY | API Ninjas API key  |

---

# ⚡ Future Enhancements

* 🎨 Modern UI with Tailwind CSS
* ⏳ Loading spinner & error handling
* 💾 Save quote history (localStorage)
* ❤️ Favorite quotes feature
* 🌙 Dark mode support
* 📱 Mobile responsive design
* 🚀 Deployment (Render + Vercel)

---

# 🚀 Deployment Guide (Optional)

### Backend (Render)

* Push backend to GitHub
* Connect repo to Render
* Add environment variables

### Frontend (Vercel)

* Push frontend to GitHub
* Import project in Vercel
* Set API base URL

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a pull request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Your Name**

---

# ⭐ Support

If you like this project, please ⭐ the repository!

---
