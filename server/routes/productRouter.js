const express = require("express");
const router = express.Router();
const multer = require("multer");

const productModel = require("../models/Products");

//Post new product or update existing
router.post("/products", async (req, res) => {
  const { name, description, prodImage,  price, category, quantity, vendorID, isDraft,} = req.body;

  try {
    const prod = await productModel.findOne({ name });

    if (prod) {
      res.statusMessage = "Product details exists and updated";
      prod.name = name
      prod.description = description
      prod.price = price
      prod.category = category
      prod.isDraft = isDraft
      await prod.save();
      res.status(209).send("Product details exists and updated");
    } 
    else {
        const newProduct = new productModel({name,description,prodImage, price, category, quantity, vendorID, isDraft,
      });
      await newProduct.save();
      res.status(200).send("New Product created");
    }
  } 
  catch (err) {
    console.log(err);
    res.status(400).send("Unable to add product");
  }
});

//Get all products
router.get("/products", async (req, res) => {
  try {
    const ans = await productModel.find();
    res.status(200).json(ans);
  } 
  catch (err) {
    res.status(400).send("Unable to fetch products: " + err.message);
  }
});

//Specific Vendor Products
router.get('/products/:id', async(req, res)=>{
  try{
      const ans  = await productModel.find({ vendorID : req.params.id})
      res.status(200).json(ans);
  }
  catch(err){
    res.status(400).send("Unable to fetch products: " + err.message);
  }
})

//Deleting a draft
router.post('/deleteDraft', async(req, res) =>{
  try{
    const ans = await productModel.findByIdAndDelete( {_id : req.body.id} )
    await ans.save()
    res.status(200).send('Deleted Successfully')
  }
  catch(err){
    console.log(err)
  }
})

//Get the specific product for product page
router.get('/getProducts/:id', async(req, res)=>{
  try{
    const ans = await productModel.find({_id : req.params.id} )
    res.status(200).json(ans);
  }
  catch(err){
    console.log(err)
  }
})


//  Get the specific products according to category page
router.get('/getCategoryProducts/:category', async(req, res)=>{
  try{
    const ans = await productModel.find({category : req.params.category})
    res.status(200).json(ans);

  }
  catch(err){
      console.log(err)
  }
})

//Add out of stock
router.get("/markOutOfStock/:productID", async (req, res) => {
  const id = req.params.productID;

  try {
    const product = await productModel.findByIdAndUpdate(id, { stock: 0 });

    if (product) {
      res.status(200).json(product);
    }
    else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});


module.exports = router;
