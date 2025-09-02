const rateLimit = require("express-rate-limit");

const weatherLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many weather requests, try again later"
});

module.exports = weatherLimiter;