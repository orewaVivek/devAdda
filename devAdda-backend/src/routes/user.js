const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { connections } = require("mongoose");
const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async function (req, res) {
  try {
    const currUser = req.user;

    const requests = await ConnectionRequest.find({
      recieverId: currUser._id,
      status: "interested",
    }).populate("senderId", [
      "firstName",
      "lastName",
      "age",
      "about",
      "skills",
      "photoURL",
      "gender",
    ]);
    // const requestingUsers = [];
    // for (const request of requests) {
    //   user = await User.findById(request.senderId);
    //   requestingUsers.push(user);
    // }
    // for (const user of requestingUsers) {
    //   delete user.password;
    //   delete user.createdAt;
    //   delete user.updatedAt;
    //   delete user.__v;
    // }
   

    res.json({
      message: "All the recieved connection requests are :",
      data: requests,
    });
  } catch (err) {
    res.status(400).json({ message: `Error : ${err.message}` });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const currUserId = req.user._id;

    const connections = await ConnectionRequest.find({
      $or: [
        { recieverId: currUserId, status: "accepted" },
        { senderId: currUserId, status: "accepted" },
      ],
    })
      .populate(
        "senderId",
        "firstName lastName age about skills gender photoURL"
      )
      .populate(
        "recieverId",
        "firstName lastName age about skills gender photoURL"
      );

    const data = connections.map((row) => {
      if (row.senderId._id.toString() === currUserId.toString()) {
        return row.recieverId;
      } else if (row.recieverId._id.toString() === currUserId.toString()) {
        return row.senderId;
      }
      return null; // fallback if data is inconsistent
    });
    res.json({
      message: "The connections are : ",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: `Error : ${err.message}`,
    });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  // users having been sent a connection request or rejected should be ignored
  // Step 1 : we will find all the userId's in connectionRequest collection which has the loggedIn-
  // -userId as either a senderId or a recieverId and store it in an array alreadySeen
  // Step 2 : we will check for the users whose userId is not stored in alreadySeen
  try {
    // Step 1
    const currUser = req.user;

    const alreadySeen = await ConnectionRequest.find({
      $or: [{ senderId: currUser._id }, { recieverId: currUser._id }],
    });
    const data = alreadySeen.map((row) => {
      if (row.senderId.toString() === currUser._id.toString())
        return row.recieverId;
      else if (row.recieverId.toString() === currUser._id.toString())
        return row.senderId;
    });
    //Step 2
    data.push(currUser._id.toString());

    const page = parseInt(req.query.page) || 1;
    let limit = req.query.limit || 10;
    if (limit > 50) limit = 50;
    const allUsers = await User.find({ _id: { $nin: data } })
      .select("firstName lastName age about skills photoURL")
      .skip((page - 1) * limit)
      .limit(limit);

    const feedData = allUsers.map((user) => {
      if (data.includes(user._id.toString())) return;
      else return user;
    });

    res.send(allUsers);
  } catch (err) {
    res.status(400).json({ message: `Error : ${err.message}` });
  }
});
module.exports = userRouter;
