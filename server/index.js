const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();



const port = 4000;
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

try {
  mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connected to MongoDB server");
} 
catch (err) {
  console.log(err);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
