import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Balance from "../models/balance.js";

export const verferToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "ne trouve pas  token" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id w role kayb9aw f req.user

    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};
export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const emailEsxist = await User.findOne({ email });
    if (emailEsxist) {
      res.status(500).json({ message: "déjà exist cette email" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
export const checkAdminExists = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (role === "admin") {
      const adminExist = await User.findOne({ role: "admin" });
      if (adminExist) {
        // 400 => bad req
        return res.status(400).json({ message: "Admin déjà créé" });
      }
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
export const isAdmin = (req, res, next) => {
  // req.user khdinah mn middleware verifyToken
  if (req.user.role !== "admin") {
    // 403=> Forbidden
    return res.status(403).json({ message: "Non autorisé, seulement admin" });
  }
  next();
};

export const registerValidation = [
  body("name").notEmpty().withMessage("name obligatoire"),

  body("email").isEmail().withMessage("email invalide"),

  body("password")
    // au moins 6
    .isLength({ min: 6 })
    .withMessage("password doit avoir au moins 6 caractères"),

  body("role")
    // ila user madakhlch role machi mochil kamel
    .optional()
    .isIn(["ivestor", "admin", "project owner"])
    .withMessage("role doit être user ou admin"),
];

// validation dyal login
export const loginValidation = [
  body("email").isEmail().withMessage("email invalide"),

  body("password").notEmpty().withMessage("password obligatoire"),
];

export const checkBalance = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const balance = await Balance.findOne({ user: req.user.user._id });

    if (!balance) {
      return res.status(400).json({ message: "Balance not found" });
    }

    if (balance.amount < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    req.balance = balance; //bach nsta3mloh f controller
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// middleware kaychecki errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
