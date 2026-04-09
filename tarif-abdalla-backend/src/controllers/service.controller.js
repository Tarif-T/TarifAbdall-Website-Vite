const createError = require("http-errors");
const Service = require("../models/service.model");
const { isValidObjectId, mapToPublicIds, toPublicId } = require("../utils/to-public-id");

// Creates a new service record.
const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: toPublicId(service),
    });
  } catch (error) {
    return next(error);
  }
};

// Returns all services sorted by creation date.
const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Services list retrieved successfully.",
      data: mapToPublicIds(services),
    });
  } catch (error) {
    return next(error);
  }
};

// Returns a single service by id.
const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid service id."));
    }

    const service = await Service.findById(id);

    if (!service) {
      return next(createError(404, "Service not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully.",
      data: toPublicId(service),
    });
  } catch (error) {
    return next(error);
  }
};

// Updates a single service by id.
const updateServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid service id."));
    }

    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return next(createError(404, "Service not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

// Deletes a single service by id.
const deleteServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid service id."));
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return next(createError(404, "Service not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
