import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existUserEmail = await User.findOne({ email });
    if (existUserEmail) {
      return res.status(400).json({ message: "email déjà trouvé " });
    }
    const hashage = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashage,
      role,
    });

    const tokenLogin = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ newUser, token: tokenLogin });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      return res.status(404).json({ message: "email user ne trouve pas" });
    }
    const verfiPwd = await bcrypt.compare(password, userEmail.password);
    if (!verfiPwd) {
      return res.status(400).json({ message: "passeword incorrecte" });
    }

    const tokenLogin = jwt.sign({ user: userEmail }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ message: "login success", token: tokenLogin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllInvestors = async (req, res) => {
  try {
    const investors = await User.find({ role: "ivestor" }).select("-password");

    res.status(200).json(investors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: "owner" }).select("-password");

    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
