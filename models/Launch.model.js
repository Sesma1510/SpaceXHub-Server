const { Schema, model } = require("mongoose");

const launchSchema = new Schema(
  {
    flight_number: {
      type: Number,
      required: [true, "Flight number is required."],
      unique: true,
    },
    mission_name: {
      type: String,
      required: [true, "Mission name is required."],
    },
    launch_date_utc: {
      type: Date,
      required: [true, "Launch date is required."],
    },
    rocket: {
      rocket_id: { type: String },
      rocket_name: { type: String },
      rocket_type: { type: String },
    },
    links: {
      mission_patch_small: { type: String },
      mission_patch: { type: String },
      video_link: { type: String },
      flickr_images: [{ type: String }],
    },
    details: { type: String },
    upcoming: { type: Boolean, default: false },
    success: { type: Boolean, default: null },
  },
  {
    timestamps: true,
  }
);

const Launch = model("Launch", launchSchema);

module.exports = Launch;
