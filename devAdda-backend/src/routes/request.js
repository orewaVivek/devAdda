const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("Sending connection request");
  res.send("Connection req sent !");
});

module.exports = requestRouter;
