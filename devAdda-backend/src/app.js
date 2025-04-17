const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Server is up and running...");
});

app.use((req, res) => {
  res.send("Hello from the server 👋");
});

app.use("/test", (req, res) => {
  res.send("HEllo this is testing page !");
});
