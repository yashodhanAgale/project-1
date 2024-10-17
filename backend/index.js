// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen on the specified PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
