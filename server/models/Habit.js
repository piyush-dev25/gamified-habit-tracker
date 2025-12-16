import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
