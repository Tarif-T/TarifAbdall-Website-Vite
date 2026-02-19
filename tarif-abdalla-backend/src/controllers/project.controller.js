const createError = require("http-errors");
const Project = require("../models/project.model");
const { isValidObjectId, mapToPublicIds, toPublicId } = require("../utils/to-public-id");

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toPublicId(project),
    });
  } catch (error) {
    return next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: mapToPublicIds(projects),
    });
  } catch (error) {
    return next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid project id."));
    }

    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, "Project not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Project retrieved successfully.",
      data: toPublicId(project),
    });
  } catch (error) {
    return next(error);
  }
};

const updateProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid project id."));
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return next(createError(404, "Project not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next(createError(400, "Invalid project id."));
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return next(createError(404, "Project not found."));
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
