var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var router = express.Router();

/* GET home page. */
router.post("/register", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ email: "email already in use" });
    } else {
      const generatedUserId = uuidv4();

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const lowerCaseEmail = email.toLowerCase();
      await User.create({
        userID: generatedUserId,
        password: hashedPassword,
        email: lowerCaseEmail,
      });
      const jwtPayload = {
        id: generatedUserId,
        email: lowerCaseEmail,
      };

      const token = jwt.sign(
        jwtPayload,
        process.env.SECRET,
        {
          expiresIn: 180,
        },
        (err) => {
          if (err) throw err;
        }
      );
      return res
        .status(201)
        .json({ token, userID: generatedUserId, email: lowerCaseEmail });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "Nothing found" });
    } else {
      return res.json(users);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

module.exports = router;
