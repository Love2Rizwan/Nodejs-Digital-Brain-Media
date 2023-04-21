// src/controllers/userController.js

const { User } = require("../models/user");

// Update user's profile
const updateProfile = async (req, res) => {
  const { userId, name, age, gender } = req.body;

  try {
    // Find the user by id in the database
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile
    user.name = name;
    user.age = age;
    user.gender = gender;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateProfile,
};
