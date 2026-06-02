import { body, validationResult } from "express-validator";

import Project from "../models/project.js";

export const createProjectValidation = [
  body("title").notEmpty().withMessage("Title obligatoire"),
  body("description").notEmpty().withMessage("Description obligatoire"),
  body("capital")
    .isNumeric()
    .withMessage("Capital doit être un nombre")
    .custom((value) => value > 0)
    .withMessage("Capital doit être supérieur à 0"),
  body("initialInvestment")
    .optional()
    .isNumeric()
    .withMessage("Initial investment doit être un nombre positif")
    .custom((value) => value >= 0)
    .withMessage("Initial investment >= 0"),
  body("maxPercentPerInvestor")
    .optional()
    .isNumeric()
    .withMessage("Max percent doit être un nombre")
    .custom((value) => value > 0 && value <= 50)
    .withMessage("Max percent par investisseur doit être entre 1 et 50"),
];

export const onlyOwner = (req, res, next) => {
  if (req.user.user.role !== "project owner") {
    return res
      .status(403)
      .json({ message: "seulemnt owner qui crée les projects" });
  }
  next();
};

export const checkProject = async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "cette project non trouvé" });
  }
  if (project.status == "closed") {
    return res.status(400).json({ message: "project closed" });
  }
  req.project = project;
  next();
};

export const isProjectOwner = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.project = project; // kankhazno projet 7it ghadi nsta3mloh f controller
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const isProjectOpen = (req, res, next) => {
  if (req.project.status === "closed") {
    return res.status(400).json({ message: "Project is closed" });
  }
  next();
};

export const validateCreateProject = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
