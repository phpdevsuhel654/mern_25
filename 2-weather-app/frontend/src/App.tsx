import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5000/api/weather";

  const loadHistory = async () => {
    const res = await axios.get(`${API_BASE}/history`);
    setHistory(res.data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const weatherRes = await axios.get(`${API_BASE}?city=${cityName}`);
      const forecastRes = await axios.get(`${API_BASE}/forecast?city=${cityName}`);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);

      loadHistory();

    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found");
      } else if (err.response?.status === 401) {
        setError("Invalid API key");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`
        );

        setWeather(res.data);

      } catch (err) {
        setError("Location fetch failed");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Weather App</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button onClick={() => fetchWeather(city)}>Search</button>
      <button onClick={getLocationWeather}>Use My Location</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}

      {forecast && (
        <div>
          <h3>5-Day Forecast</h3>
          {forecast.list.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
              <p>{item.main.temp}°C</p>
              <p>{item.weather[0].description}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      <h3>Search History</h3>
      {history.map((item, index) => (
        <div key={index}>
          <button onClick={() => fetchWeather(item.city)}>
            {item.city}, {item.country}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;