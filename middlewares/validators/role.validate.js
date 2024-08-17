const { body } = require("express-validator");

exports.validateCreateRole = [
  body("roleName")
    .exists()
    .withMessage("roleName is required")
    .notEmpty()
    .withMessage("roleName must be filled"),
  body("accessModules")
    .exists()
    .withMessage("accessModules is required")
    .notEmpty()
    .withMessage("accessModules must be filled"),
];

exports.validateUpdateAccessModule = [
  body("newModule")
    .exists()
    .withMessage("newModule is required")
    .notEmpty()
    .withMessage("newModule must be filled"),
];
exports.validateRemoveAccessModule = [
  body("moduleToRemove")
    .exists()
    .withMessage("moduleToRemove is required")
    .notEmpty()
    .withMessage("moduleToRemove must be filled"),
];
