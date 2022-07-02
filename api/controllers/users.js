const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const Leave = require("../models/Leave");

exports.getLeaves = asyncHandler(async (req, res) => {
  const leaveRequests = await Leave.find({})
    .where("status")
    .equals("Pending")
    .populate("userId", ["name", "userId", "gender"]);

  res.status(201).json(leaveRequests);
});

exports.getRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await Leave.find({ userId: req.user.id })
    .where("status")
    .ne("Pending")
    .populate("userId", ["name", "userId", "gender"]);

  res.status(201).json(leaveRequests);
});

exports.getLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate("userId", [
    "name",
    "userId",
    "gender",
  ]);

  if (!leave) {
    res.status(404);
    throw new Error("leave doesn't exist");
  }

  res.status(201).json(leave);
});

exports.changeStatus = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    res.status(404);
    throw new Error("leave doesn't exist");
  }

  leave.status = req.body.status;

  await leave.save();

  res.status(200).json(leave);
});

exports.createLeaveRequest = asyncHandler(async (req, res) => {
  let user = await User.findOne({ userId: req.user.userId });
  const { type, leaveDays, startDate, endDate } = req.body;

  const leave = await Leave.create({
    type,
    leaveDays,
    startDate,
    endDate,
    userId: req.user._id,
  });

  if (type === "Sick Leave") {
    user.sickLeave = user.sickLeave - leaveDays;
  } else if (type === "Casual Leave") {
    user.casualLeave = user.casualLeave - leaveDays;
  } else if (type === "Maternity Leave") {
    user.maternityLeave = user.maternityLeave - leaveDays;
  } else if (type === "Paternity Leave") {
    user.paternity = user.paternity - leaveDays;
  } else if (type === "Legal Leave") {
    user.legalLeave = user.legalLeave - leaveDays;
  }

  await user.save();

  res.status(201).json(leave);
});
