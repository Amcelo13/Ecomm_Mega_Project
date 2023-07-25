const express = require("express");
const router = express.Router();
const multer = require("multer");
const productModel = require("../models/Products");
const { productAddEdit, getAllProducts, vendorSpecificProducts } = require("../controllers/productController");

//Post new product or update existing
router.post("/products", productAddEdit );

//Get all products
router.get("/products", getAllProducts);

//Get Best selling products
router.get("/bestproducts", async (req, res) => {
  try {
    const ans = await productModel.find().sort({ sales: -1 }).limit(10);

    res.status(200).json(ans);
  } catch (err) {
    res.status(400).send("Unable to fetch products: " + err.message);
  }
});

//Specific Vendor Products
router.get("/products/:id", vendorSpecificProducts );

//Deleting a draft
router.post("/deleteDraft", async (req, res) => {
  try {
    const ans = await productModel.findByIdAndDelete({ _id: req.body.id });

    res.status(200).send("Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
});

//Get the specific product for product page
router.get("/getProducts/:id", async (req, res) => {
  try {
    const ans = await productModel.find({ _id: req.params.id });
    res.status(200).json(ans);
  } catch (err) {
    console.log(err);
  }
});

//  Get the specific products according to category page
router.get("/getCategoryProducts/:category", async (req, res) => {
  
  try {
    const ans = await productModel.find({ category: req.params.category });
    res.status(200).json(ans);
  } catch (err) {
    console.log(err);
  }
});

//Add out of stock
router.put("/markOutOfStock1", async (req, res) => {
  const { boolValue, productID } = req.body;

  try {
    await productModel.findByIdAndUpdate(productID, { stock: boolValue });
    res.status(200).send("Product stock updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

//Adding the sales count to a product on order
router.post("/updationOnOrdering/:productID", async (req, res) => {
  const { quantity } = req.body;
  const productID = req.params.productID;
  //Aggregate function used $inc
  try {
    await productModel.findByIdAndUpdate(
      productID,
      { $inc: { sales: quantity } },
      { new: true }
    );
    res.status(200).send("Sales Updated");
  } catch (err) {
    res.status(400).send("Error is there");
  }
});

module.exports = router;
