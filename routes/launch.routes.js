const express = require("express");
const router = express.Router();
const {
  getAllLaunches,
  getLaunchById,
} = require("../controllers/launchController");

router.get("/launches", getAllLaunches);
router.get("/launches/:id", getLaunchById);

module.exports = router;
