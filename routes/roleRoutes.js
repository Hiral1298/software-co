const express = require("express");
const router = express.Router();
const {
  createRole,
  getRoles,
  updateAccessModules,
  removeAccessModule,
} = require("../controllers/role.controller");
let {
  validateCreateRole,
  validateUpdateAccessModule,
  validateRemoveAccessModule,
} = require("../middlewares/validators/role.validate");

router.post("/", validateCreateRole, createRole);
router.get("/", getRoles);
router.patch(
  "/update-access/:roleId",
  validateUpdateAccessModule,
  updateAccessModules
);
router.put(
  "/remove-access/:roleId",
  validateRemoveAccessModule,
  removeAccessModule
);

module.exports = router;
