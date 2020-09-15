const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema (
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          required: "Exercise type",
          trim: true
        },
        name: {
          type: String,
          required: "Exercise name",
          trim: true
        },
        weight: {
          type: Number,
          required: true
        },
        sets: {
          type: Number,
          required: true
        },
        reps: {
          type: Number,
          required: true
        },
        duration: {
          type: Number,
          required: "Exercise duration"
        }
      }
    ]
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
