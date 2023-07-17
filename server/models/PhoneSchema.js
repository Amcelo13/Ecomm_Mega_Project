const mongoose = require("mongoose");

const UserSchemaPhone = new mongoose.Schema({
  name: {
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
  phone: {
    type: String,
  },
});
module.exports = mongoose.model("users", UserSchemaPhone);
