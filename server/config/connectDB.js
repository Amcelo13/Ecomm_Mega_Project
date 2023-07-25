const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    console.log("Connected to MongoDB server");

  } 
  catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1)   // Exit the process with a failure code
  }
};

module.exports = connectDB;
