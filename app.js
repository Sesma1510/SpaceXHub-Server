// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const favoritesRoutes = require("./routes/favorites.routes");
app.use("/api", favoritesRoutes);

const launchRoutes = require("./routes/launch.routes");
app.use("/api", launchRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/user", profileRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
