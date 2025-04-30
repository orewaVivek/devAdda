const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData, validateLogin } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validating the incomming req.body
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypting the password using "bcrypt"
    const passwordHash = await bcrypt.hash(password, 10);

    //Creating new instance of User Model
    const userObj = {
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    };
    const user = new User(userObj);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error!! :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLogin(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("This email is not registered, Sign up first !");

    const loginSuccess = await user.validatePassword(password);

    if (loginSuccess) {
      //creating jwt token
      const token = await user.getJWT();
      //Storing token in cookie and sending it to user
      res.cookie("token", token);
      res.status(200).send("Login Successful");
    } else {
      throw new Error("Incorrect Credentials");
    }
  } catch (err) {
    res.status(400).send("Error - " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logged out successfully");
});

module.exports = authRouter;
