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
    const savedUser = await user.save();

    if (savedUser) {
      const token = await savedUser.getJWT();
      // Storing token in cookie and sending it to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
    }

    res.json({ data: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLogin(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      // If the email is not found, send a specific message for that
      return res
        .status(400)
        .send({ message: "This email is not registered. Sign up first!" });
    }

    const loginSuccess = await user.validatePassword(password);

    if (loginSuccess) {
      // Creating JWT token
      const token = await user.getJWT();
      // Storing token in cookie and sending it to the user
      res.cookie("token", token);
      return res.status(200).json({ data: user });
    } else {
      // Incorrect password
      return res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (err) {
    // General error handling
    res.status(400).send({ message: "Error - " + err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logged out successfully");
});

module.exports = authRouter;
