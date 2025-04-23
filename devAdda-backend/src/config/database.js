const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NodeProject:Nn2GwuWsDJ6aBSP8@nodeproject.yejj8za.mongodb.net/devAdda"
  );
};

module.exports = connectDB;

