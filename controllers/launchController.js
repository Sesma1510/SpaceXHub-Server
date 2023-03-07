const axios = require("axios");
const Launch = require("../models/Launch.model");

exports.getAllLaunches = async (req, res) => {
  try {
    // Check if launches exist in the database
    const launches = await Launch.find();
    if (launches.length > 0) {
      // If launches exist in the database, return them
      return res.json(launches);
    } else {
      // If launches don't exist in the database, fetch them from the SpaceX API
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launches"
      );
      const launches = response.data;

      // Save launches to the database
      await Launch.insertMany(launches);

      // Return launches
      return res.json(launches);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getLaunchById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find launch by id in the database
    const launch = await Launch.findById(id);

    if (!launch) {
      return res.status(404).json({ message: "Launch not found" });
    }

    return res.json(launch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
