const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

router.post("/signup", async (req, res) => {
  const { name, email, password, designation, jointime, uid } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      res.statusMessage = "User already exists";
      res.status(209).send("User already exists");
    } else {
      const newUser = new userModel({
        name,
        email,
        password,
        designation,
        jointime,
        uid,
      });
      await newUser.save(); // Wait for the save operation to complete
      res.status(200).send("Registered successfully");
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(err.errors);
    }
    res.status(400).send("Unable to register");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; //from frontend
  const user = await userModel.findOne({ email }); //finding in the schema of the database

  if (user) {
    if (user.password === password) {
      res.status(200).json(user);
    } else {
      res.statusMessage = "Password Wrong";
      res.status(204).send();
    }
  } else {
    res.statusMessage = "User not found";
    res.status(204).end();
  }
});

router.post("/goomglepost", async (req, res) => {
  const { name, email, password, designation, jointime, uid } = req.body; //from frontend
  const user = await userModel.findOne({ email });
  if (user) {
    // User already exists, update the jointime
    user.jointime = jointime;
    await user.save();
    res.status(200).send("Jointime updated successfully");
  } else {
    const newUser = new userModel({
      name,
      email,
      password,
      designation,
      jointime,
      uid,
    });
    await newUser.save();
    res.status(200).send("Registered successfully");
  }
});

router.post("/goomglepostlogin", async (req, res) => {
  const { email, jointime } = req.body; //from frontend
  const user = await userModel.findOne({ email });

  if (user) {
    // User already exists, update the jointime
    user.jointime = jointime;
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(203).send("Register a role first");
  }
});

router.post("/phones", async (req, res) => {
  const { name, designation, jointime, phone, uid } = req.body; //from frontend

  if (phone) {
    const user = await userModel.findOne({ phone });

    if (user) {
      user.jointime = jointime;
      await user.save();
      return res.status(206).send("Jointime updated successfully");
    }
  }

  const newUser = new userModel({ name, phone, designation, jointime, uid });
  await newUser.save();
  res.status(200).send("Registered successfully");
});

//Find vendor info by passing email
router.get("/findVendorInfo/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await userModel.findOne({ email });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});


//Find vendor info by passing uid
router.get("/findVendorInfobyuid/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = await userModel.findOne({ uid });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//Updating the user Info
router.post("/updateUserInfo/:uid", async (req, res) => {
  const uid = req.params.uid;
  const { password, phone, email , name} = req.body;

  try {
    const user = await userModel.findOne({ uid });
    if (user) {
      user.name = name;
      user.password = password;
      user.email = email;
      user.phone = phone;
      const ans = await user.save();
      res.status(200).json(ans);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

//Cart addition of user
router.post("/addToCart", async (req, res) => {
  const { name, prodImage, quantity, price, userId,vendorEmail } = req.body;

  try {
    const user = await userModel.findOne({ email: userId });

    if (user) {
      const existingCartItem = user.cartItems.find(
        (item) => item.name === name
      );

      if (existingCartItem) {
        existingCartItem.quantity += parseInt(quantity);
      } else {
        user.cartItems.push({ name, prodImage, quantity, price , vendorEmail});
      }

      await user.save();
      return res.status(200).send("Product added to cart successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Getting Cart Items
router.get("/getCart/:userEmail", async (req, res) => {
  const email = req.params.userEmail;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      //SENDING THE USER CARTITEMS BACK ONLY
      res.status(200).json({ cartItems: user.cartItems });
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Updating quantity
router.post("/updateQuantity", async (req, res) => {
  const { value, name, email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    const order = user.cartItems.find((item) => item.name === name);
    if (order) {
      if (value === "increase") {
        order.quantity = order.quantity + 1;
      } else if (value === "decrease") {
        order.quantity = order.quantity - 1;
      }
      await user.save();
      return res.status(206).send("Quanity updated Successfully");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//Deleting the cart items
router.post("/deleteCartProduct", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const order = user.cartItems.findIndex((item) => item.name === name);

    //finding the index o
    // console.log(order);
    if (order !== -1) {
      user.cartItems.splice(order, 1);
      user.markModified("cartItems");
      await user.save();
      return res.status(206).send("Deleted Successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

//Adding the address
router.post("/addAddress", async (req, res) => {
  const { addressData, email } = req.body;

  const user = await userModel.findOne({ email });

  const foundAddress = user.address.find(
    (item) => item.hno === addressData?.hno
  );
  if (foundAddress) {
    res.status(206).send("Already exists");
  } else {
    user.address.push(addressData);
    user.markModified("address");
    await user.save();

    const address = user.address;
    res.status(200).json(address);
  }
});

//Get address
router.get("/getAddress/:email", async (req, res) => {
  const user = await userModel.findOne({ email: req.params.email });

  if (user) {
    const address = user.address;
    res.status(200).json(address);
  } else {
    res.status(404).json("User not found");
  }
});

// Delete the address
router.post("/deleteAddress", async (req, res) => {
  const { id, email } = req.body;
  try {
    const document = await userModel.findOne({ email });
    if (document) {
      const itemToDelete = document.address.findIndex(
        (item) => item._id.toString() === id
      );
      if (itemToDelete !== -1) {
        document.address.splice(itemToDelete, 1);
        document.markModified("address");
        await document.save();
        res.status(200).send("Deleted Successfully");
      } else {
        console.log("Address not found");
        res.status(404).send("Address not found");
      }
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update address
router.post("/updateAddress/:addressId", async (req, res) => {
  const { addressData, email } = req.body;

  const user = await userModel.findOne({ email });

  try {
    const addressIndex = user.address.findIndex(
      (address) => address._id == req.params.addressId
    );
    if (addressIndex !== -1) {
      // Preserve the original object ID
      addressData._id = user.address[addressIndex]._id;
      user.address[addressIndex] = addressData;
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else {
      res.status(404).send("Address not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//Getting all the vendors
router.get('/getAllVendors', async(req, res)=>{
  const allVendors = await userModel.find({designation : 'Vendor'})
  
  if(allVendors){
    res.status(200).json(allVendors)
  }
  else{
    res.status(404).send("No Vendor found");
  }
})

//Setting vendor active status
router.put('/setVendorActivation/:vendorID', async(req, res)=>{
  const {boolValue} = req.body
    console.log(req.params.vendorID)
  

  try{
      await userModel.findByIdAndUpdate(req.params.vendorID , {status : boolValue})
    res.status(200).send('Vendor activation/disabled updated');
  }
  catch(err){
    res.status(404).send("Vendor not found");
  }

})

module.exports = router;
