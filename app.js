const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

//mongoDb connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("monogoDB connected");
  })
  .catch((err) => console.log(err));

//router
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
