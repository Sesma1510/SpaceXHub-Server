const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    launch: { type: Schema.Types.ObjectId, ref: "Launch" },
    crew: { type: Schema.Types.ObjectId, ref: "Crew" },
  },
  {
    timestamps: true,
  }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
