const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],
    profile: {
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      username: { type: String },
    },
    launchSubscriptions: [
      { type: Schema.Types.ObjectId, ref: "LaunchSubscription" },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
