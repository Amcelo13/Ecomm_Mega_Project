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

  isDraft: {
    type: Boolean,
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("products", ProductSchema);
