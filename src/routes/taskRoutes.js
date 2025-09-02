const express = require("express");
const auth = require("../middlewares/authMiddleware");
const weatherLimiter = require("../middlewares/rateLimiter");
const { createTask, getTasks, completeTask, deleteTask, getSummary } = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id/complete", auth, weatherLimiter, completeTask);
router.delete("/:id", auth, deleteTask);
router.get("/summary", auth, getSummary);

module.exports = router;
