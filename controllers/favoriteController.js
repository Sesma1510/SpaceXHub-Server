const Favorite = require("../models/Favorite");

const createFavorite = async (req, res) => {
  const { userId } = req.params;
  const { launchId, isFavorite } = req.body;

  try {
    let favorite = await Favorite.findOne({ user: userId, launch: launchId });

    // If the favorite already exists, update the isFavorite value
    if (favorite) {
      favorite.isFavorite = isFavorite;
      await favorite.save();
    } else {
      // If the favorite does not exist, create a new one
      favorite = new Favorite({ user: userId, launch: launchId, isFavorite });
      await favorite.save();
    }

    // Get all favorites for the user
    const favorites = await Favorite.find({ user: userId }).select("launch");

    res.status(201).json({ favorite: favorite.isFavorite, favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createFavorite,
};
