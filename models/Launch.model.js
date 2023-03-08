const { Schema, model } = require("mongoose");

const launchSchema = new Schema(
  {
    flight_number: {
      type: Number,
      required: [true, "Flight number is required."],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Mission name is required."],
    },
    date_utc: {
      type: Date,
      required: [true, "Launch date is required."],
    },
    rocket: {
      rocket_id: { type: String },
      rocket_name: { type: String },
      rocket_type: { type: String },
    },
    links: {
      patch: {
        large: { type: String },
      },
      video_link: { type: String },
      flickr_images: [{ type: String }],
      reddit: {
        campaign: { type: String },
        launch: { type: String },
        media: { type: String },
        recovery: { type: String },
      },
      webcast: { type: String },
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
