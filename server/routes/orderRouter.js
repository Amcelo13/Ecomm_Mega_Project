const express = require("express");
const router = express.Router();
const orderModel = require("../models/orders"); // Import the orderModel

// Add an order
router.post("/addFinalOrder", async (req, res) => {
  const { userId, orderItems, address, status, userName } = req.body;
  try {
    // Create a new order document
    const order = new orderModel({
      userId,
      orderItems,
      address,
      status,
      userName,
    });

    // Save the order to the database
    await order.save();
    res.status(200).send({ message: "Order added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to add order", error: error.message });
  }
});

//Get the orders of a user
router.get("/getOrders/:userEmail", async (req, res) => {
  const id = req.params.userEmail;

  const userOrders = await orderModel.find({ userId: id });
  if (userOrders.length > 0) {
    res.status(200).json(userOrders);
  }
});

//Get a specific order for specific order modal
router.get("/specificOrder/:orderID", async (req, res) => {
  const id = req.params.orderID;

  const userOrder = await orderModel.findById(id);
  if (userOrder) {
    console.log(userOrder);
    res.status(200).json(userOrder);
  } else {
    res.status(404).send("nothing found ");
  }
});

//Order cancel API
router.get("/cancelOrder/:orderID", async (req, res) => {
  const id = req.params.orderID;

  try {
    const userOrder = await orderModel.findByIdAndUpdate(id, {
      isCancel: true,
      status: 'cancelled',
    });

    if (userOrder) {
      res.status(200).json(userOrder);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

//Order Satatus Change API
router.post("/changeStatus/:orderID", async (req, res) => {
  const id = req.params.orderID;
  const {str} = req.body
  try {
    const userOrder = await orderModel.findByIdAndUpdate(id, {
      status: str,
    });

    if (userOrder) {
      res.status(200).json(userOrder);
    } 
    else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

//Get Vendor Order History using vendor email
router.get("/getVendorOrders/:vendorEmail", async (req, res) => {
  const vendorEmail = req.params.vendorEmail;

  try {
    const foundVendorOrders = await orderModel.find({"orderItems.vendorEmail": vendorEmail});
    res.status(200).json(foundVendorOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
//Most sold order
router.get("/mostSoldOrder/:productID", async (req, res) => {
  const productID = req.params.productID;

  //TODO: TAO BE DONE for top selling orders
  
})

module.exports = router;
