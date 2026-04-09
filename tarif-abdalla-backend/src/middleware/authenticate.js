const createError = require("http-errors");

const User = require("../models/user.model");
const { verifyAuthToken } = require("../utils/token");

async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return next(createError(401, "Authentication token is required."));
    }

    const token = authorization.slice(7).trim();
    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      return next(createError(401, "Authenticated user not found."));
    }

    req.auth = payload;
    req.user = user;

    return next();
  } catch (error) {
    return next(createError(401, error.message || "Invalid authentication token."));
  }
}

module.exports = authenticate;
