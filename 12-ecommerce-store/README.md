# 🛒 Full Stack E-commerce Platform (MERN)

A production-ready **E-commerce platform** built with the MERN stack, featuring a **User Storefront**, **Admin SaaS Dashboard**, and **Scalable Backend API**.

---

## 🚀 Live Demo

* 🌐 User App: https://your-frontend.vercel.app
* 🧑‍💼 Admin Panel: https://your-admin.vercel.app
* 🔗 API: https://your-backend.onrender.com

---

## 📸 Screenshots

> Add screenshots here (highly recommended)

* Home Page
* Product Page
* Cart & Checkout
* Admin Dashboard
* Charts & Analytics

---

## 🧠 System Overview

```id="arch-diagram"
Frontend (User)     → React + Redux + Tailwind  
Admin Panel         → React + Tailwind + Recharts  
Backend API         → Node.js + Express  
Database            → MongoDB Atlas  
Payments            → Stripe  
Deployment          → Vercel + Render  
```

---

## 📦 Project Structure

```id="project-structure"
root/
├── backend/        # Node.js API
├── frontend/       # User application
├── admin-panel/    # Admin dashboard
└── README.md
```

---

## 🎯 Features

### 🛍️ User Panel

* 🔐 Authentication (Login/Register)
* 🛒 Cart & Wishlist
* 📦 Product browsing & details
* 🚚 Shipping & checkout
* 💳 Stripe payment integration

---

### 🧑‍💼 Admin Panel

* 📊 Dashboard analytics (Revenue, Orders)
* 👥 User management (CRUD)
* 📦 Product management (CRUD)
* 🔄 Order status updates
* 🔍 Search & pagination
* 🔔 Toast notifications
* 👤 Profile avatars

---

### ⚙️ Backend API

* RESTful APIs
* JWT Authentication
* Role-based access (Admin/User)
* MongoDB with Mongoose
* Stripe payment handling
* Aggregation-based analytics

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Redux Toolkit
* Tailwind CSS
* Axios

### Admin Panel

* React.js
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Auth
* Stripe API

---

## ⚙️ Environment Setup

### 1️⃣ Backend

```bash id="setup-backend"
cd backend
npm install
```

Create `.env`:

```env id="env-backend"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_webhook
```

Run:

```bash id="run-backend"
npm run dev
```

---

### 2️⃣ Frontend (User App)

```bash id="setup-frontend"
cd frontend
npm install
npm run dev
```

`.env`:

```env id="env-frontend"
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_public_key
```

---

### 3️⃣ Admin Panel

```bash id="setup-admin"
cd admin-panel
npm install
npm run dev
```

`.env`:

```env id="env-admin"
VITE_API_URL=http://localhost:5000/api
```

---

## 🔐 Authentication & Roles

| Role  | Access                                    |
| ----- | ----------------------------------------- |
| User  | Shop, Cart, Checkout                      |
| Admin | Dashboard, Manage Users, Products, Orders |

---

## 📊 Analytics

* Revenue chart (monthly)
* Orders tracking
* Dashboard statistics
* MongoDB aggregation pipelines

---

## 🌐 Deployment

| Service     | Platform      |
| ----------- | ------------- |
| Frontend    | Vercel        |
| Admin Panel | Vercel        |
| Backend     | Render        |
| Database    | MongoDB Atlas |

---

## 📌 Future Improvements

* 🔍 Advanced filters & search
* 🖼️ Image upload (Cloudinary)
* 📩 Email notifications
* 🧾 Invoice generation
* ⚡ Redis caching
* 🌙 Dark mode

---

## 🧪 Testing Checklist

* ✅ User registration/login
* ✅ Add to cart & checkout
* ✅ Payment success
* ✅ Admin product CRUD
* ✅ Order status updates
* ✅ User management

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Your Name**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
