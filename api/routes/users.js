const router = require("express").Router();
const {
  getLeave,
  getLeaves,
  changeStatus,
  createLeaveRequest,
} = require("../controllers/users");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(authorize, getLeaves);
router.route("/leave").post(createLeaveRequest);
router.route("/:id").get(authorize, getLeave).put(authorize, changeStatus);

module.exports = router;
