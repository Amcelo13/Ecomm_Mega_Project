const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
require("dotenv").config();       //Dotenv file 
const connectDB = require("./config/connectDB")

const port = process.env.SERVER_PORT || 4000;
const app = express();
app.use(cors());


// dotenv.config()    //<=-----------------doten
app.use(express.static(path.join(__dirname, "/uploads")));
// Multer Implementation for product image upload
const productImgStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const productImgUpload = multer({ storage: productImgStorage });

// Serve static files from the uploads directory

// Middleware to handle product image upload
app.post("/uploads", productImgUpload.single("image"), (req, res) => {
  const productImage = req.file.filename;
  res.send(productImage);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.use("/", signupRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

//Database Connection to MONGODB
connectDB()

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
