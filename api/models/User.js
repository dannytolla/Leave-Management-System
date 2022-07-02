const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

/* Creating a schema for the user model. */
const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide User Id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide full name"],
    },
    gender: {
      type: String,
      required: [true, "Please provide Gender "],
    },
    employmentDate: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ["HR_Manager", "Employee"],
      default: "Employee",
    },
    sickLeave: {
      type: Number,
      default: 90,
    },
    casualLeave: {
      type: Number,
      default: 15,
    },
    paternityLeave: {
      type: Number,
      default: 120,
    },
    maternity: {
      type: Number,
      default: 5,
    },
    legalLeave: {
      type: Number,
      default: 7,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
