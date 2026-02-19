const createError = require("http-errors");
const Reference = require("../models/reference.model");
const { isValidObjectId, mapToPublicIds, toPublicId } = require("../utils/to-public-id");

const createReference = async (req, res, next) => {
  try {
    const reference = await Reference.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toPublicId(reference),
    });
  } catch (error) {
    return next(error);
  }
};

const getReferences = async (req, res, next) => {
  try {
    const references = await Reference.find().sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "References list retrieved successfully.",
      data: mapToPublicIds(references),
    });
  } catch (error) {
    return next(error);
  }
};

const getReferenceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid reference id."));
    }

    const reference = await Reference.findById(id);

    if (!reference) {
      return next(createError(404, "Reference not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Reference retrieved successfully.",
      data: toPublicId(reference),
    });
  } catch (error) {
    return next(error);
  }
};

const updateReferenceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid reference id."));
    }

    const reference = await Reference.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!reference) {
      return next(createError(404, "Reference not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteReferenceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid reference id."));
    }

    const reference = await Reference.findByIdAndDelete(id);

    if (!reference) {
      return next(createError(404, "Reference not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createReference,
  getReferences,
  getReferenceById,
  updateReferenceById,
  deleteReferenceById,
};
