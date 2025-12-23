import express from "express";
import Habit from "../models/Habit.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Create habit
router.post("/", authMiddleware, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Habit name is required" });
    }

    const habit = new Habit({
        user: req.user.userId,
        name,
    });

    await habit.save();

    res.status(201).json({
        message: "Habit created",
        habit,
    });
});

// Get all habits for logged-in user
router.get("/", authMiddleware, async (req, res) => {
    const habits = await Habit.find({ user: req.user.userId }).sort({
        createdAt: -1,
    });

    res.json(habits);
});

// Mark habit as done for today
router.patch("/:id/done", authMiddleware, async (req, res) => {
    const habitId = req.params.id;

    const habit = await Habit.findOne({
        _id: habitId,
        user: req.user.userId,
    });

    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date().toDateString();

    if (
        habit.lastCompletedDate &&
        habit.lastCompletedDate.toDateString() === today
    ) {
        return res
            .status(400)
            .json({ message: "Habit already completed today" });
    }

    const todayDate = new Date();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(todayDate.getDate() - 1);

    if (!habit.lastCompletedDate) {
        // First ever completion
        habit.streak = 1;
    } else {

        const lastDate = habit.lastCompletedDate.toDateString();

        if (lastDate === yesterdayDate.toDateString()) {
            habit.streak += 1;
        } else {
            habit.streak = 1;
        }
    }

    habit.lastCompletedDate = todayDate;
    await habit.save();

    // 🎮 Add points to user
    const user = await User.findById(req.user.userId);
    user.points += 10;

    // Update level based on points
    user.level = Math.floor(user.points / 100) + 1;

    await user.save();


    res.json({
        message: "Habit marked as done",
        habit,
        user: {
            points: user.points,
            level: user.level,
        },
    });

});

// Delete habit
router.delete("/:id", authMiddleware, async (req, res) => {
    const habit = await Habit.findOne({
        _id: req.params.id,
        user: req.user.userId,
    });

    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }

    await habit.deleteOne();

    res.json({ message: "Habit deleted" });
});

// Edit habit name
router.patch("/:id", authMiddleware, async (req, res) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ message: "Habit name is required" });
    }

    const habit = await Habit.findOne({
        _id: req.params.id,
        user: req.user.userId,
    });

    if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
    }

    habit.name = name;
    await habit.save();

    res.json({
        message: "Habit updated",
        habit,
    });
});


export default router;
