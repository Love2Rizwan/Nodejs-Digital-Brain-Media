// src/routes/userRoutes.js

const express = require("express");
const { updateProfile } = require("../controllers/userController");

const router = express.Router();

// Update user's profile route
router.put("/profile", updateProfile);

module.exports = router;
