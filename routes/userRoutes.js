const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUsers,
  updateMultipleUsers,
  bulkUpdateUsers,
  checkAccess,
} = require("../controllers/user.controller");
let auth = require("../middlewares/auth.middleware");
let {
  validateSignup,
  validateLogin,
  validateUserAccess,
  validateMultipleUser,
  validateUserBulkUpdate,
} = require("../middlewares/validators/user.validate");

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/", auth(), getUsers);
router.put("/update-many", auth(), validateMultipleUser, updateMultipleUsers);
router.put("/bulk-update", auth(), validateUserBulkUpdate, bulkUpdateUsers);
router.post("/check-access", validateUserAccess, checkAccess);

module.exports = router;
