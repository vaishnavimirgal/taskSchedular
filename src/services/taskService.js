const Task = require("../models/Task");
const User = require("../models/User");
const { getWeather, isBadWeather } = require("./weatherService");

exports.createTaskService = async (userId, { title, description, isOutdoor }) => {
    const task = new Task({ user: userId, title, description, isOutdoor });
    await task.save();
    return task;
};

exports.getTasksService = async (userId) => {
    return Task.find({ user: userId }).sort({ createdAt: -1 });
};

exports.completeTaskService = async (userId, taskId) => {
    const task = await Task.findOne({ _id: taskId, user: userId });
    
    if (!task) throw new Error("Task not found");
    if (task.status === "completed") throw new Error("Task already completed");

    if (task.isOutdoor) {
        const user = await User.findById(userId);
        const weatherData = await getWeather(user.city);
        if (isBadWeather(weatherData)) throw new Error("Cannot complete outdoor task due to bad weather.");
    }

    task.status = "completed";
    task.completedAt = new Date();
    await task.save();
    return task;
};

exports.deleteTaskService = async (userId, taskId) => {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) throw new Error("Task not found");
    if (task.status !== "pending") throw new Error("Only pending tasks can be deleted");
    await task.deleteOne();
};

exports.getSummaryService = async (userId) => {
    const tasks = await Task.find({ user: userId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "completed");

    let avgCompletionTime = 0;
    if (completedTasks.length > 0) {
        const totalHours = completedTasks.reduce((sum, t) => sum + ((t.completedAt - t.createdAt) / (1000 * 60 * 60)), 0);
        avgCompletionTime = totalHours / completedTasks.length;
    }

    const outdoorCompletedCount = completedTasks.filter(t => t.isOutdoor).length;
    let suggestion = null;
    if (outdoorCompletedCount >= 5) suggestion = "Try an indoor task next due to unpredictable weather.";

    return {
        totalTasks,
        completedTasks: completedTasks.length,
        avgCompletionTime: avgCompletionTime.toFixed(2),
        suggestion
    };
};
