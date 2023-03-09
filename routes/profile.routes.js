const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateProfileImage,
} = require("../controllers/profileController");

router.get("/:userId", getUserProfile);
router.put("/profile/update/:userId", updateProfileImage);

module.exports = router;
