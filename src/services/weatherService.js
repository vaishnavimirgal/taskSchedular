const axios = require("axios");
const rateLimit = require("express-rate-limit");

const userRequestLog = {};

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(userId) {
  const now = Date.now();
  if (!userRequestLog[userId]) {
    userRequestLog[userId] = [];
  }

  userRequestLog[userId] = userRequestLog[userId].filter(ts => now - ts < WINDOW_MS);

  if (userRequestLog[userId].length >= MAX_REQUESTS) {
    return false;
  }

  userRequestLog[userId].push(now);
  return true;
}

exports.getWeather = async (city, userId = "default") => {
  try {
    // Rate limiting per user
    if (!checkRateLimit(userId)) {
      throw new Error("Weather API rate limit exceeded (10 calls/min)");
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

    const response = await axios.get(url);
    return response.data; 
  } catch (err) {
    console.error("Weather API error:", err.message);
    return { weather: [{ main: "Clear" }] };
  }
};

exports.isBadWeather = (weatherData) => {
  if (!weatherData || !weatherData.weather) return false;

  const badWeatherKeywords = ["Rain", "Thunderstorm", "Snow"];
  return weatherData.weather.some(w => badWeatherKeywords.includes(w.main));
};
