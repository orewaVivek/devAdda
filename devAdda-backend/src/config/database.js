const mongoose = require("mongoose");
require("dotenv").config({ path: "./secrets.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error; // important to throw so app knows connection failed
  }
};

module.exports = connectDB;
