const mongoose = require("mongoose");
require("dotenv").config({ path: "./secrets.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Mongo URI:", process.env.DB_CONNECTION_STRING);
};

module.exports = connectDB;
