const Role = require("../models/role");
let { checkValidation } = require("../validation");

exports.createRole = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { roleName, accessModules } = req.body;
    const role = new Role({ roleName, accessModules });
    await role.save();
    return res.send({
      status: true,
      statusCode: 201,
      message: "role created successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const { search } = req.query;
    const searchRegex = search ? { $regex: search, $options: "i" } : null;
    const query = search ? { roleName: searchRegex } : {};
    const roles = await Role.find(query);
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAccessModules = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { roleId } = req.params;
    const { newModule } = req.body;
    const role = await Role.findByIdAndUpdate(
      roleId,
      { $addToSet: { accessModules: newModule } },
      { new: true }
    );
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
      data: role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeAccessModule = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { roleId } = req.params;
    const { moduleToRemove } = req.body;
    const role = await Role.findByIdAndUpdate(
      roleId,
      { $pull: { accessModules: moduleToRemove } },
      { new: true }
    );
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
      data: role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
