const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    launch: { type: Schema.Types.ObjectId, ref: "Launch" },
  },
  {
    timestamps: true,
  }
);

favoriteSchema.methods.removeLaunch = function () {
  return this.deleteOne();
};

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
