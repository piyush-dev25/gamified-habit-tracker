import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Get logged-in user's profile
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select(
    "-password"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// Update password
router.patch("/password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters" });
  }

  const user = await User.findById(req.user.userId);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  const isSame = await bcrypt.compare(newPassword, user.password);
  if (isSame) {
    return res
      .status(400)
      .json({ message: "New password must be different from old password" });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.json({ message: "Password updated successfully" });
});

export default router;
