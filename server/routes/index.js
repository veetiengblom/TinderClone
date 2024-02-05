var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
var router = express.Router();

/* GET home page. */
router.post("/register", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if(existingUser) {
      return res.status(403).json({email: "email already in use"})
    } else {
      const salt = await
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
