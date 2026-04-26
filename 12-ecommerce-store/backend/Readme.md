# 🛒 E-commerce Backend API

A scalable Node.js backend for a full-featured e-commerce platform with authentication, products, orders, payments, and admin management.

---

## 🚀 Features

* 🔐 JWT Authentication (User & Admin)
* 👥 User Management (Admin)
* 📦 Product Management (CRUD)
* 🛒 Cart & Order System
* 💳 Stripe Payment Integration
* 📊 Admin Analytics APIs
* 🔍 Search & Pagination
* 🔄 Order Status Management

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Stripe API

---

## 📁 Project Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
└── app.js
```

---

## ⚙️ Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 📌 API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

### Products

```
GET /api/products
GET /api/products/:id
POST /api/products (Admin)
PUT /api/products/:id (Admin)
DELETE /api/products/:id (Admin)
```

### Orders

```
POST /api/orders
GET /api/orders/my
PUT /api/orders/:id/status (Admin)
```

### Admin

```
GET /api/admin/users
POST /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id

GET /api/admin/orders
GET /api/admin/analytics/dashboard
GET /api/admin/analytics/revenue
```

---

## 🔐 Security

* Password hashing (bcrypt)
* JWT-based authentication
* Protected routes
* Admin-only access control

---

## 🌐 Deployment

* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 📌 Future Improvements

* Redis caching
* Email notifications
* Coupon system
* Multi-vendor support

---

## 👨‍💻 Author

Sohail Anjum Mulla
