const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const port = 4000;
const app = express();
app.use(cors());

// Multer Implementation for product image upload
const productImgStorage = multer.diskStorage({
  destination: "./uploads/product",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const productImgUpload = multer({ storage: productImgStorage });

// Serve static files from the uploads directory
app.use(express.static(path.join(__dirname, "/uploads")));

// Middleware to handle product image upload
app.post("/uploads", productImgUpload.single("image"), (req, res) => {
  const productImage = req.file.filename;
  // Save the product image to the database or perform other operations
  res.send(productImage);
});

// Multer Implementation for profile image upload
const profileImgStorage = multer.diskStorage({
  destination: "./uploads/profile",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const profileImgUpload = multer({ storage: profileImgStorage });

// Middleware to handle profile image upload
app.post("/profileUpload", profileImgUpload.single("profileImg"), (req, res) => {
  const profileImage = req.file.filename;
  // Save the profile image to the database or perform other operations
  res.send(profileImage);
});

// Remaining code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

app.use("/", signupRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

try {
  mongoose.connect(
    "mongodb+srv://chetelise:123123123@cluster0.hs2zls9.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connected to MongoDB server");
} catch (err) {
  console.log(err);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
