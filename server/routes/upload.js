const express = require("express");
const multer = require("multer");

const  {imageController}  = require("../controllers/imageController");
const router = express.Router();


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
router.post("/", productImgUpload.single("image"), imageController);

module.exports = router;
