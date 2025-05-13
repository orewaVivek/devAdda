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
    if (!token) return res.status(401).send("Please Log In");

    const decodedMsg = jwt.verify(token, "ThisIsSecret");
    const { _id } = decodedMsg;
    const user = await User.findById(_id);

    if (!user) return res.status(401).send("User does not exist");

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
