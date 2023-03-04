const { Schema, model } = require("mongoose");

const launchSubscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  launch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Launch",
  },
  notify: {
    type: Boolean,
    default: true,
  },
});

const LaunchSubscription = model(
  "LaunchSubscription",
  launchSubscriptionSchema
);

module.exports = LaunchSubscription;
