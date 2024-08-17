const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let { checkValidation } = require("../validation");

exports.signup = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({
        status: true,
        statusCode: 400,
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    return res.send({
      status: true,
      statusCode: 201,
      message: "user signed up successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.send({
        status: true,
        statusCode: 400,
        message: "invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        status: true,
        statusCode: 400,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.send({
      status: true,
      statusCode: 201,
      message: "login successful",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const searchRegex = search ? new RegExp(search, "i") : null;
    const query = search
      ? {
          $or: [
            { firstName: { $regex: searchRegex } },
            { lastName: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
          ],
        }
      : {};

    // without aggregation

    // const users = await User.find()
    //   .select("-password")
    //   .populate("role", "roleName accessModules");

    //with aggregation

    const users = await User.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $project: {
          password: 0,
          "role._id": 0,
          "role.active": 0,
          "role.createdAt": 0,
          "role.__v": 0,
        },
      },
    ]);
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMultipleUsers = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { filter, updateData } = req.body;
    await User.updateMany(filter, updateData);
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.bulkUpdateUsers = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { updates } = req.body;
    const bulkOperations = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.userId },
        update: update.data,
      },
    }));
    await User.bulkWrite(bulkOperations);

    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccess = async (req, res) => {
  try {
    let checkValidations = await checkValidation(req, res);
    if (checkValidations) return;
    const { userId, moduleName } = req.body;
    const user = await User.findById(userId).populate("role");
    const userHasAccess = user.role.accessModules.includes(moduleName);
    return res.send({
      status: true,
      statusCode: 201,
      message: "success",
      data: { userHasAccess },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
