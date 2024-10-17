const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { login, signup } = require("../controllers/authController");

router.post("/signup", signup);
router.get("/login", login);
