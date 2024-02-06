var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { CharacterCounter } = require("materialize-css");
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
      jwt.sign(
        jwtPayload,
        process.env.SECRET,
        {
          expiresIn: 180,
        },
        (err, token) => {
          if (err) throw err;
          console.log("TOken!", token);
          return res.status(201).json({
            token: token,
            userId: generatedUserId,
          });
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("exit");
      return res.status(404).json({ error: "User not found" });
    }
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("pasword correct?", correctPassword);
    const id = existingUser.userID;

    if (existingUser && correctPassword) {
      console.log("täällä ollaan");
      jwt.sign(
        { id, email },
        process.env.SECRET,
        {
          expiresIn: 180,
        },
        (err, token) => {
          if (err) throw err;
          return res.status(201).json({
            token: token,
            userId: id,
          });
        }
      );
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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

router.put("/user", async (req, res, next) => {
  try {
    const formData = req.body.formData;
    const existingUser = await User.findOne({ userId: formData.userId });
    User.update(
      { userId: existingUser.userId },
      {
        $set: {
          firstName: formData.firstName,
          dobDay: formData.dobDay,
          dobMonth: formData.dobMonth,
          dobYear: formData.dobYear,
          showGender: formData.showGender,
          genderIdentity: formData.genderIdentity,
          genderInterest: formData.genderInterest,
          url: formData.url,
          about: formData.about,
          matches: formData.matches,
        },
      }
    );
    db.users.update(
      { userId: existingUser.userId },
      {
        $set: {
          "Documents.4": "newpicture.png",
        },
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
});

module.exports = router;
