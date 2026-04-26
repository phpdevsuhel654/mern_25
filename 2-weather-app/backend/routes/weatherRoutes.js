import express from "express";
import {
  fetchWeather,
  fetchForecast,
  getHistory
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", fetchWeather);
router.get("/forecast", fetchForecast);
router.get("/history", getHistory);

export default router;