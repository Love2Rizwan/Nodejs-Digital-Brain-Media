// src/controllers/authController.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

// Login handler
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "24h",
    });

    return res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Signup handler
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists in the database
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: newUser.id }, "your_secret_key", {
      expiresIn: "24h",
    });

    return res.status(201).json({ token, userId: newUser.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  signup,
};
