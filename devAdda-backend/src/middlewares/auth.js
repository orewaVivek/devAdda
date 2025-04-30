const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = req.body?.token;
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("UnAuthorised Access");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Login first");
    const decodedMsg = jwt.verify(token, "ThisIsSecret");
    const { _id } = decodedMsg;
    const user = await User.findById(_id);
    if (!user) throw new Error("user does't exist");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
