const express = require("express");
const router = express.Router();
const {
  createFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoritesController");

// Create a favorite
router.post("/favorites/:userId", createFavorite);

// Remove a favorite
router.delete("/favorites/:userId/:launchId", removeFavorite);

// Get all favorites for a user
router.get("/favorites/:userId", getFavorites);

module.exports = router;
