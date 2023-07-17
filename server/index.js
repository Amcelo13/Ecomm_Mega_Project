const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const mongoose = require("mongoose");
const port = 4000; 

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
}); 

app.use("/", signupRouter);
app.use("/", productRouter);
app.use("/", orderRouter);
try {
    mongoose.connect('mongodb+srv://chetelise:123123123@cluster0.hs2zls9.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB server');
} 
catch (err) {
    console.log(err);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
