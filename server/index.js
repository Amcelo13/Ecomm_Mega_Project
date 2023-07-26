const express = require("express");
const path = require("path");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const uploadRouter = require("./routes/upload")
require("dotenv").config();       //Dotenv file 
const connectDB = require("./config/connectDB")

const port = process.env.SERVER_PORT || 4000;
const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Joining path only for this request below and get the desired image
app.use("/mediaUpload",express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.use("/uploads", uploadRouter);
app.use("/", signupRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

//Database Connection to MONGODB
connectDB()

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
