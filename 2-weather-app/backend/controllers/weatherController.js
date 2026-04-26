import {
  getWeatherData,
  getForecastData
} from "../services/weatherService.js";

import SearchHistory from "../models/SearchHistory.js";

export const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;

    const data = await getWeatherData(city);

    await SearchHistory.create({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description
    });

    res.json(data);

  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || error.message
    });
  }
};

export const fetchForecast = async (req, res) => {
  try {
    const { city } = req.query;
    const data = await getForecastData(city);
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ searchedAt: -1 })
      .limit(10);

    res.json(history);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};