const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({

    userId: {
      type: String,
      required: true,
    },

    orderItems: [
      {
        name: String,
        prodImage: String,
        quantity: Number,
        price: Number,
        vendorEmail: String,
      },
    ],

    userName: {
      type: String,
      required: true,
    },

    address: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      default: 'ordered',
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
