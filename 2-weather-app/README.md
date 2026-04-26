# 🌦️ Weather App (MERN Stack)

A full-stack **Weather Application** built using **Node.js, Express, MongoDB, and React.js**.
It fetches real-time weather data from an external API and provides additional features like forecast, search history, and geolocation.

---

# 🚀 Features

* 🌤 Fetch real-time weather by city
* 📅 5-day weather forecast
* 📍 Auto-detect location (Geolocation API)
* 🗂 Store and display search history (MongoDB)
* ⏳ Loading indicators
* ❌ Error handling (API errors, invalid city, etc.)
* 🔁 Re-search from history

---

# 🧱 Tech Stack

## Frontend

* React.js
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB (Mongoose)

## API

* OpenWeather API (Free Tier)

---

# 📁 Project Structure

```
weather-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd weather-app
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

### Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
WEATHER_API_KEY=your_openweather_api_key
```

### Run Backend

```
npm run dev
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
```

### Run Frontend

```
npm run dev
```

---

# 🌐 API Endpoints

## 🔹 Get Current Weather

```
GET /api/weather?city=London
```

---

## 🔹 Get 5-Day Forecast

```
GET /api/weather/forecast?city=London
```

---

## 🔹 Get Search History

```
GET /api/weather/history
```

Returns last 10 searched cities.

---

# 🗄️ Database Schema

## SearchHistory

```js
{
  city: String,
  country: String,
  temperature: Number,
  description: String,
  searchedAt: Date
}
```

---

# 📍 Geolocation Feature

Uses browser API:

```
navigator.geolocation.getCurrentPosition()
```

Fetches weather based on latitude & longitude.

---

# ⚠️ Error Handling

Handles:

* ❌ Invalid city (404)
* 🔑 Invalid API key (401)
* ⚠️ Network/server issues

---

# 🔐 Environment Variables

| Variable        | Description               |
| --------------- | ------------------------- |
| PORT            | Backend port              |
| MONGO_URI       | MongoDB connection string |
| WEATHER_API_KEY | OpenWeather API key       |

---

# 🧪 Testing the API

Example:

```
http://localhost:5000/api/weather?city=Mumbai
```

---

# 🚀 Deployment (Optional)

## Backend

* Render
* Railway

## Frontend

* Vercel
* Netlify

---

# 🔥 Future Improvements

* 🌙 Dark mode
* 📊 Weather charts
* ❤️ Favorite cities
* 🔐 Authentication (JWT)
* 📱 Mobile responsive UI
* 🌍 Multi-language support

---

# 🙌 Contribution

Feel free to fork the repo and submit pull requests.

---

# 📄 License

This project is open-source and available under the MIT License.

---

# 👨‍💻 Author

**Sohail Anjum Mulla**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
