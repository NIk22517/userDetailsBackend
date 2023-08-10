const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const corsOption = {
  origin: "http://localhost:3000/",
  methode: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credential: true,
  optionSuccessStatus: 204,
};

app.use(cors(corsOption));
app.use(express.json());

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
