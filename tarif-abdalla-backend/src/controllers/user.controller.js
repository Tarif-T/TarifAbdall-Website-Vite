const createError = require("http-errors");
const User = require("../models/user.model");
const { isValidObjectId, mapToPublicIds, toPublicId } = require("../utils/to-public-id");

const createUser = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      created: req.body.created || new Date(),
      updated: req.body.updated || new Date(),
    };

    const user = await User.create(payload);

    return res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toPublicId(user),
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ created: 1 });

    return res.status(200).json({
      success: true,
      message: "Users list retrieved successfully.",
      data: mapToPublicIds(users),
    });
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid user id."));
    }

    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found."));
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: toPublicId(user),
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid user id."));
    }

    const payload = {
      ...req.body,
      updated: new Date(),
    };

    const user = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(createError(404, "User not found."));
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid user id."));
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(createError(404, "User not found."));
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
