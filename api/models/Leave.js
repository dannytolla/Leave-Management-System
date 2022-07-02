const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

/* Creating a schema for the Leave model. */
const LeaveSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User Id"],
    },
    type: {
      type: String,
      required: [true, "Please provide Type"],
    },
    leaveDays: {
      type: Number,
      required: [true, "Please provide Leave Day "],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide Start Date "],
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Leave", LeaveSchema);
