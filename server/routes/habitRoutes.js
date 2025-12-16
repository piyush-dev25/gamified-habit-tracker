import express from "express";
import Habit from "../models/Habit.js";
import authMiddleware from "../middleware/authMiddleware.js";

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

  habit.lastCompletedDate = new Date();
  await habit.save();

  res.json({
    message: "Habit marked as done",
    habit,
  });
});

export default router;
