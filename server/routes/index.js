var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const ActivityMatches = require("../models/activityMatches");
const Activities = require("../models/activity");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
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
        userId: generatedUserId,
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
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    const id = existingUser.userId;

    if (existingUser && correctPassword) {
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
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/user", async (req, res, next) => {
  try {
    const formData = req.body.formData;
    const existingUser = await User.findOne({ userId: formData.userId });
    const insertedUser = await User.updateOne(
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
          activities: formData.activities,
          matches: formData.matches,
        },
      }
    );
    res.json(insertedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const userId = req.headers.params;
    const existingUser = await User.findOne({ userId: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.put("/updateUser", async (req, res, next) => {
  try {
    const formData = req.body.formData;
    const existingUser = await User.findOne({ userId: formData.userId });
    const insertedUser = await User.updateOne(
      { userId: existingUser.userId },
      {
        $set: {
          showGender: formData.showGender,
          genderInterest: formData.genderInterest,
          activities: formData.activities,
          about: formData.about,
          url: formData.url,
        },
      }
    );
    res.json(insertedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/genderedUsers", async (req, res, next) => {
  try {
    const { userGenderInterest, userGenderIdentity } = JSON.parse(
      req.headers.params
    );

    const users =
      userGenderInterest === "everyone"
        ? await User.find()
        : await User.find({ genderIdentity: userGenderInterest });

    const filteredUsers = users.filter(
      (user) =>
        user.genderInterest === userGenderIdentity ||
        user.genderInterest === "everyone"
    );
    if (!users) {
      return res.status(404).json({ error: "Nothing found" });
    } else {
      return res.json(filteredUsers);
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.get("/matchedUsers", async (req, res, next) => {
  try {
    const { matchedUserIds, userId } = JSON.parse(req.headers.params);
    const pipeline = [
      {
        $match: {
          userId: {
            $in: matchedUserIds,
          },
        },
      },
    ];

    const foundUsers = await User.aggregate(pipeline);
    const filteredUsers = foundUsers.filter((user) =>
      user.matches.some((match) => match.userId === userId)
    );
    res.send(filteredUsers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/messages", async (req, res, next) => {
  try {
    const { senderId, receiverId } = JSON.parse(req.headers.params);

    const userMessages = await Message.find({
      fromUserId: senderId,
      toUserId: receiverId,
    });
    res.send(userMessages);
  } catch (error) {
    console.log(error);
  }
});

router.put("/addmatch", async (req, res, next) => {
  try {
    const { userId, matchedUserId } = req.body;
    const query = { userId: userId };
    const updateDocument = { $push: { matches: { userId: matchedUserId } } };
    const updatematches = await User.updateOne(query, updateDocument);

    const isMatch = await User.exists({
      userId: matchedUserId,
      "matches.userId": userId,
    });
    if (isMatch) {
      return res.send(200);
    }
    res.send(0);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.post("/addMessage", async (req, res, next) => {
  try {
    const message = req.body.message;

    await Message.create({
      fromUserId: message.fromUserId,
      toUserId: message.toUserId,
      message: message.message,
      category: message.category,
    });
    res.send("OK");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.get("/getActivities", async (req, res, next) => {
  try {
    const categories = JSON.parse(req.headers.params);
    const loweredCategories = categories.map((category) =>
      category.toLowerCase()
    );

    const activityList = await Activities.find({
      category: { $in: loweredCategories },
    });
    res.json(activityList);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.put("/addActivity", async (req, res, next) => {
  try {
    const { userId, clickedUserId, swipedActivity } = req.body;
    const existingUser = await ActivityMatches.findOne({ userId: userId });
    if (existingUser) {
      const pipeline = [
        {
          $match: {
            userId: userId,
            "withUserId.userId": clickedUserId,
          },
        },
      ];
      const foundUser = await ActivityMatches.aggregate(pipeline);
      const foundActivities = foundUser[0].withUserId.activity;
      if (foundActivities.includes(swipedActivity)) {
        console.log("Activity exist allreay");
        return res.json({ message: "activity already in database" });
      }
      await ActivityMatches.updateOne(
        { userId: userId, "withUserId.userId": clickedUserId },
        {
          $push: {
            "withUserId.activity": swipedActivity,
          },
        }
      );
      console.log("activity added");

      return res.json({ message: "activity added to database" });
    }

    const created = await ActivityMatches.create({
      userId: userId,
      withUserId: {
        userId: clickedUserId,
        activity: swipedActivity,
      },
    });
    console.log("Created", created);
    res.json(created);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

router.get("/getMachedActivities", async (req, res, next) => {
  try {
    const { userId, clickedUserId } = JSON.parse(req.headers.params);

    const pipeline = [
      {
        $match: {
          userId: userId,
          "withUserId.userId": clickedUserId,
        },
      },
    ];
    const foundMatch = await ActivityMatches.aggregate(pipeline);
    const foundActivities = foundMatch[0].withUserId.activity;
    const pipeline2 = [
      {
        $match: {
          userId: clickedUserId,
          "withUserId.userId": userId,
        },
      },
    ];
    const foundMatch2 = await ActivityMatches.aggregate(pipeline2);
    const foundActivities2 = foundMatch2[0].withUserId.activity;
    const matchedActivities = foundActivities.filter((x) =>
      foundActivities2.includes(x)
    );
    console.log("matches", matchedActivities);

    res.send(matchedActivities);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

module.exports = router;
