const axios = require("axios");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/User.model");

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
});

// Update user profile image in Cloudinary and user data in MongoDB.
exports.updateProfileImage = async (req, res) => {
  const { userId } = req.params;
  const { imageBase64 } = req.body;

  try {
    // Get user by id
    const user = await User.findById(userId);

    // Upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageBase64, {
      folder: "user-profile-images",
      width: 500,
      crop: "scale",
    });

    // Update user profile image URL in the database
    user.profile.image.url = uploadedImage.secure_url;
    user.profile.image.public_id = uploadedImage.public_id;

    // Save updated user to database
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: {
        profile: updatedUser.profile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile image",
      error: error.message,
    });
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
