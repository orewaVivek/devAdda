const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
      console.log("Server is up and running...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) res.status(404).send("user not found");
//     else res.send(users);
//   } catch (err) {
//     res.status(500).send("Error !!");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) res.send("DataBase is Empty");
//     else res.send(users);
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     //can also use User.findByIdAndDelete({_id : userId});
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Unupdtable fields");
//     }
//     const userSkills = data.skills;
//     if (data.skills.length > 15) {
//       throw new Error("Bro don't lie ! U can't have skills more than 15");
//     }

//     const user = await User.findByIdAndUpdate(userId, data, {
//       runValidators: true,
//     });
//     res.send(`User Updated Successfully`);
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });
