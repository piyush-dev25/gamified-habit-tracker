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

export default router;
