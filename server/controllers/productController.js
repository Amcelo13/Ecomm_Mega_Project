const productModel = require("../models/Products");

//Post new product or update existing
const productAddEdit = async (req, res) => {
  const {
    name,
    description,
    prodImage,
    images,
    price,
    category,
    quantity,
    vendorID,
    isDraft,
  } = req.body;

  try {
    const prod = await productModel.findOne({ name });

    if (prod) {
      res.statusMessage = "Product details exists and updated";
      prod.name = name;
      prod.description = description;
      prod.price = price;
      prod.category = category;
      prod.images = images;
      prod.isDraft = isDraft;
      await prod.save();
      res.status(209).send("Product details exists and updated");
    } else {
      const newProduct = new productModel({
        name,
        description,
        prodImage,
        price,
        images,
        category,
        quantity,
        vendorID,
        isDraft,
      });
      await newProduct.save();
      res.status(200).send("New Product created");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to add product");
  }
};

//Get all products
const getAllProducts = async (req, res) => {
  try {
    const ans = await productModel.find();
    res.status(200).json(ans);
  } catch (err) {
    res.status(400).send("Unable to fetch products: " + err.message);
  }
};

//Specific Vendor Products
const vendorSpecificProducts = async (req, res) => {
    try {
      const ans = await productModel.find({ vendorID: req.params.id });
      res.status(200).json(ans);
      
    } catch (err) {
      res.status(400).send("Unable to fetch products: " + err.message);
    }

  }

module.exports = { productAddEdit, getAllProducts, vendorSpecificProducts };
