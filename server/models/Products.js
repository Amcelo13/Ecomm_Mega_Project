const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
 
  price: {
    type: Number,
    required: true,
  },
  prodImage: {
    type: String,
    // required: true,
    // unique: true,
  },
  images: [],

  category: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
  },

  vendorID: {
    type: String,
    required: true,
  },
    
  sales: {
    type: Number,
    default: 0,
  },

  isDraft: {
    type: Boolean,
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Boolean,
    default: true,
  },
 
  numOfReviews: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("products", ProductSchema);
