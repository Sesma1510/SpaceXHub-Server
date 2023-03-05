const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

router.post("/:userId", favoriteController.createFavorite);

router.get("/:userId", favoriteController.getFavorites);