const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:recieverId",
  userAuth,
  async (req, res) => {
    try {
      const recieverId = req.params.recieverId;
      const senderId = req.user._id;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status))
        throw new Error("Cannot complete the request");

      const userExists = await User.findById(recieverId);
      if (!userExists) throw new Error("requesting user doesn't exist");

      if (senderId.toString() === recieverId.toString()) {
        throw new Error("Can't send request to yourself!");
      }
      const existingConnectionRequests = await ConnectionRequest.findOne({
        $or: [
          { senderId: senderId, recieverId: recieverId },
          { senderId: recieverId, recieverId: senderId },
        ],
      });

      if (existingConnectionRequests)
        throw new Error("Connection already exists");

      const connectionObj = {
        senderId: senderId,
        recieverId: recieverId,
        status,
      };
      const requestSent = new ConnectionRequest(connectionObj);
      const data = await requestSent.save();
      if (status === "interested")
        res.json({
          message: "Connection Request sent successfully",
          data,
        });
      else {
        res.json({
          message: "profile ignored successfully",
          data,
        });
      }
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const currUser = req.user._id;
      const status = req.params.status;
      const requestedUser = req.params.userId;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) throw new Error("Invalid Status");

      const userExists = await User.findById(requestedUser);
      if (!userExists) throw new Error("The requested user doesn't exist");

      console.log("User chaecked and Status is valid");
      const requestExists = await ConnectionRequest.findOne({
        senderId: requestedUser,
        recieverId: currUser,
      });
      if (!requestExists) throw new Error("The request doesn't exist");
      console.log("requesting User do exists");
      if (requestExists.status === "accepted")
        throw new Error("The request has already been accepted");
      if (requestExists.status === "rejected")
        throw new Error("The request has already been rejected");
      if (requestExists.status === "ignored")
        throw new Error("The Other person is not interested in U bro");

      if (status === "accepted") {
        requestExists.status = "accepted";
        await requestExists.save();
        console.log("request is being accepted");
        res.json({
          message: "The Connection request was accepted successfully",
          connection_request: requestExists,
        });
      } else {
        requestExists.status = "rejected";
        await requestExists.save();
        res.json({
          message: "The Connection request was Rejected",
          connection_request: requestExists,
        });
      }
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  }
);

module.exports = requestRouter;
