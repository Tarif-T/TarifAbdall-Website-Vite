const createError = require("http-errors");
const User = require("../models/user.model");
const { isValidObjectId, toPublicId } = require("../utils/to-public-id");
const { hashPassword, verifyPassword } = require("../utils/password");
const { createAuthToken } = require("../utils/token");

// Normalizes email values for stable uniqueness and lookup behavior.
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

// Removes sensitive fields from user payloads before returning them.
const sanitizeUser = (user) => {
  const publicUser = user?._id ? toPublicId(user) : { ...user };
  delete publicUser.password;
  return publicUser;
};

// Maps duplicate key database errors into API conflict responses.
const handleDuplicateEmail = (error, next) => {
  if (error?.code === 11000) {
    return next(createError(409, "A user with this email already exists."));
  }

  return next(error);
};

// Creates a new user with a hashed password.
const createUser = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return next(createError(400, "Email and password are required."));
    }

    const payload = {
      ...req.body,
      email,
      password: await hashPassword(password),
      created: req.body.created || new Date(),
      updated: new Date(),
    };

    const user = await User.create(payload);

    return res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    return handleDuplicateEmail(error, next);
  }
};

// Authenticates a user and returns an auth token.
const signInUser = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return next(createError(400, "Email and password are required."));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(createError(401, "Invalid email or password."));
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return next(createError(401, "Invalid email or password."));
    }

    const token = createAuthToken({
      sub: String(user._id),
      email: user.email,
      name: `${user.firstname} ${user.lastname}`.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      data: {
        token,
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Returns all users without password hashes.
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ created: 1 }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Users list retrieved successfully.",
      data: users.map((user) => sanitizeUser(user)),
    });
  } catch (error) {
    return next(error);
  }
};

// Returns a single user by id.
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid user id."));
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return next(createError(404, "User not found."));
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

// Updates an existing user and re-hashes password when provided.
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

    if (payload.email !== undefined) {
      payload.email = normalizeEmail(payload.email);
    }

    if (payload.password) {
      payload.password = await hashPassword(String(payload.password));
    }

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
    return handleDuplicateEmail(error, next);
  }
};

// Deletes a user record by id.
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
  signInUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
