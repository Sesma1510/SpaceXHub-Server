const User = require("../models/User.model");
const Launch = require("../models/Launch.model");
const Favorite = require("../models/Favorite.model");

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const { favorites } = await User.findById(userId).populate("favorites");

    // Return the list of launches that the user has favorited
    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.createFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { launchId, isFavorite } = req.body; // add isFavorite here

    // Find the user and launch documents
    const user = await User.findById(userId);
    const launch = await Launch.findById(launchId);

    // Check if the user and launch documents exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!launch) {
      return res.status(404).json({ message: "Launch not found" });
    }

    // Check if the favorite record already exists for the user and launch
    const favorite = await Favorite.findOne({ user: userId, launch: launchId });
    if (favorite) {
      return res.status(409).json({ message: "Favorite already exists" });
    }

    // Create a new favorite record for the user and launch
    const newFavorite = new Favorite({ user: userId, launch: launchId });
    await newFavorite.save();

    // Add the new favorite record to the user's favorites array
    user.favorites.push(newFavorite._id);
    await user.save();

    // Return the updated list of favorites for the user
    const favorites = await Favorite.find({ user: userId });
    res.status(201).json({ favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, launchId } = req.params;

    // Find the favorite document
    const favorite = await Favorite.findOne({ user: userId, launch: launchId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Remove the favorite document from the database
    await favorite.deleteOne();

    // Remove the favorite record from the user's favorites array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: favorite._id } },
      { new: true }
    );

    // Return the updated list of favorites for the user
    const favorites = await Favorite.find({ user: userId });
    res.json({ favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
