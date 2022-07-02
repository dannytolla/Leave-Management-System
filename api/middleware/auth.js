const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let uId;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    uId = req.headers.authorization.split(" ")[1];
  }
  if (!uId) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ userId: uId });

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});

const authorize = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ userId: req.user.userId });

  if (user.role === "Employee") {
    res.status(403);
    throw new Error("Not authorized to access this route, HR Manager only");
  }
  next();
});

module.exports = { protect, authorize };
