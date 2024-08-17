const { body } = require("express-validator");

exports.validateSignup = [
  body("firstName")
    .exists()
    .withMessage("firstName is required")
    .notEmpty()
    .withMessage("firstName must be filled"),
  body("lastName")
    .exists()
    .withMessage("lastName is required")
    .notEmpty()
    .withMessage("lastName must be filled"),
  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("password is required")
    .notEmpty()
    .withMessage("password must be filled"),
  body("role")
    .exists()
    .withMessage("role is required")
    .notEmpty()
    .withMessage("role must be filled"),
];
exports.validateLogin = [
  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("password is required")
    .notEmpty()
    .withMessage("password must be filled"),
];
exports.validateUserAccess = [
  body("userId")
    .exists()
    .withMessage("userId is required")
    .notEmpty()
    .withMessage("userId must be filled"),
  body("moduleName")
    .exists()
    .withMessage("moduleName is required")
    .notEmpty()
    .withMessage("moduleName must be filled"),
];
exports.validateMultipleUser = [
  body("updateData")
    .exists()
    .withMessage("updateData is required")
    .notEmpty()
    .withMessage("updateData must be filled"),
];
exports.validateUserBulkUpdate = [
  body("updates")
    .exists()
    .withMessage("updates is required")
    .notEmpty()
    .withMessage("updates must be filled"),
];
