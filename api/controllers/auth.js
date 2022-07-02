const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// Login User
exports.loginUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOne({ userId }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("User doesn't exist");
  }

  res.status(201).json(user);
});

// Get User Details --Logged In User
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId });

  if (!user) {
    res.status(404);
    throw new Error("leave doesn't exist");
  }

  res.status(200).json(user);
});
