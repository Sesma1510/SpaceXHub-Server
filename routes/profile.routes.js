const express = require("express");
const router = express.Router();

const { updateProfileImage } = require("../controllers/profileController");

router.put("/profile/update/:userId", updateProfileImage);

module.exports = router;
