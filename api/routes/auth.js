const router = require("express").Router();
const { loginUser, getUser } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/me").get(protect, getUser);

module.exports = router;
