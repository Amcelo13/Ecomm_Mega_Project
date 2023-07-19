const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,   // Allows multiple documents with null or empty email field
  },
  password: {
    type: String,
  },
  designation: {
    type: String,
  },
  jointime: {
    type: String,
  },
  uid: {
    type: String,
  },
  profileImg: {
    type: String,
    
  },

  address: [
    {
      aname:String,
      hno: String,
      street: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
  ],

  cartItems: [
    {
      name: String,
      prodImage: String,
      images: [],
      quantity: Number,
      price: Number,
      vendorEmail: String,
      productID: String,
    },
  ],

  phone: {
    type: String,
    sparse: true, // Allows multiple documents with null or empty phone field
  },

  status: {
    type: Boolean,
    default: true, // Allows multiple documents with null or empty phone field
  },
  
});

module.exports = mongoose.model("users", UserSchema);
