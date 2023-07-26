import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CartPage.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCartItems } from "../../services/getCartItem";
import { DeleteOutlined } from "@mui/icons-material";
import { message } from "antd";
import NOM from "../../assets/ECART.png"
import AddressModalFormCheckout from "../../components/AddressesModals/AddressModalFormCheckout";
function CartPage() {
  
  const [messageApi, contextHolder] = message.useMessage();
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animate, setAnimate] = useState(true);

  const userEmail = useSelector((state) => state.users.email);
  const [cartItems, setCartItems] = useState([]);
  const [sample, setSample] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [orderTotal, setOrderTotal] = useState(
    200 + cartTotal - couponDiscount
  );

  const showModal = () => {
   {cartItems.length !== 0 ?  setIsModalOpen(true): message.error('No Items in Cart to CheckOut')}
  };

  const increaseQuantity = async (name) => {
    const inc = {
      email: userEmail,
      name: name,
      value: "increase",
    };

    try {
      await axios
        .post("http://localhost:4000/updateQuantity", inc)
        .then((response) => {
          if (response.status === 206) {
            console.log("Updated quantity");
            setSample(!sample);
          }
        })
        .catch((err) => {});
    } catch (e) {
      console.log(e);
      console.log("Updated quantity");
    }
  };

  const decreaseQuantity = async (name) => {
    const dec = {
      email: userEmail,
      name: name,
      value: "decrease",
    };
    try {
      await axios
        .post("http://localhost:4000/updateQuantity", dec)
        .then((response) => {
          if (response.status === 206) {
            setSample(!sample);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteCartProduct = async (name) => {
    const obg = {
      name: name,
      email: userEmail,
    };
    try {
      await axios
        .post("http://localhost:4000/deleteCartProduct", obg)
        .then((response) => {
          if (response.status === 206) {
            setSample(!sample);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  //Getting the cart items and calculating sum
  useEffect(() => {
    const userCartInfo = getCartItems(userEmail);
    userCartInfo.then((data) => {
      setCartItems(data);
      
      let sum = 0;

      data.forEach((item) => {
        sum = sum + item.price * item.quantity;
        setCartTotal(sum);
      });
    });
  }, [sample]);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 500  ); // Adjust the duration (in milliseconds) to match the CSS transition duration
    }
  }, []);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Already applied coupon",
    });
  };

  //Apply the coupon
  const handleApply = () => {
    if ((!isCouponApplied && coupon !== "FREE SHIP") || "Hola") {
      // Check if the coupon has already been applied
      if (coupon === "FREE SHIP") {
        message.success('Wohoo! 😀 Coupon Applied');
        setCouponDiscount(200);
        setOrderTotal(cartTotal - 200);
        setIsCouponApplied(true); // Set the state variable to true after applying the coupon
      } else if (coupon === "Hola") {
        message.success('Wohoo! 😀 Coupon Applied');
        setCouponDiscount(300);
        setOrderTotal(cartTotal - 300);
        setIsCouponApplied(true); // Set the state variable to true after applying the coupon
      } else {
        message.error('Wrong Coupon Applied');
      }
    } else if ((isCouponApplied && coupon !== "FREE SHIP") || "Hola") {
      if (coupon === "FREE SHIP") {
        message.success('Wohoo! 😀 Coupon Applied');
        setCouponDiscount(200);
        setOrderTotal(cartTotal - 200);
        setIsCouponApplied(true); // Set the state variable to true after applying the coupon
      } else if (coupon === "Hola") {
        message.success('Wohoo! 😀 Coupon Applied');
        setCouponDiscount(300);
        setOrderTotal(cartTotal - 300);
        setIsCouponApplied(true); // Set the state variable to true after applying the coupon
      } else {
        message.error('Wrong Coupon Applied');
      }
    } else {
      warning();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleApply();
    }
  };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="cart--conatiner">
        <div className="cart--left">
          <p id="cvvf">CART</p>

          <div className="contc">
            {cartItems.length !==0 ? (cartItems.map((item) => {
              return (
                <>
                  <div className={`cartI ${animate ? 'slide-up' : ''}`}>
                    <img  src={item.images[0]} alt="" id="nb" />

                    <div style={{ marginLeft: "5rem", paddingTop: "3rem" }}>
                      <h4 id="new">{item.name}</h4>
                      <p id="gb">Quantity</p>
                      <button
                        className="mko"
                        disabled={item.quantity === 1 && true}
                        onClick={() => decreaseQuantity(item.name)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name=""
                        id="sel"
                        value={item.quantity}
                      />
                      <button
                        className="mko"
                        onClick={() => increaseQuantity(item.name)}
                      >
                        +
                      </button>
                    </div>
                    <p id="df"> ₹ {`${item.price * item.quantity}`}</p>
                    <DeleteOutlined
                      onClick={() =>
                        handleDeleteCartProduct(item.name, userEmail)
                      }
                      id="deleteed"
                      style={{
                        transition: "1s ease",
                        color: "red",
                        fontSize: "30px",
                        marginLeft: "auto",
                        paddingTop: "6rem",
                        paddingRight: "3rem",
                      }}
                    />
                  </div>
                </>
              );
            })):(<>
              <img src={NOM} alt="No data"  style={{width:'50%', height:"100%", marginLeft:"23%"}}/>
              </>)}
          </div>
        </div>

        <div className="cart--right">
          <div className="ordderr">
            <p className="order133">Order Details</p>
            
            <div className="flexg">
              <p id="ct">Cart Total: </p>
              <p >₹{cartTotal}</p>
            </div>
            <div className="flexg">
              <p id="ct">Coupon Discount: </p>
              <p>-₹{couponDiscount}</p>
            </div>
            <div className="flexg">
              <p id="ct">Delivery Fee: </p>
              <p>₹{200}</p>
            </div>
            <div className="flexg">
              <p id="ct1">Order Total: </p>
              <p
                style={{
                  paddingTop: "3rem",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                }}
              >
                ₹{cartTotal + 200 - couponDiscount}
              </p>
            </div>

            <div className="flexg1">
              <input
                type="text"
                onKeyDown={handleKeyDown}
                id="coup"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="ccc" onClick={handleApply} disa>
                Apply
              </button>
            </div>
            <button className="ccc12" onClick={showModal}>
              Proceed To Checkout
            </button>
            
            <AddressModalFormCheckout
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              orderTotal ={orderTotal}
              cartItems = {cartItems}
            />
            <p className="order12">Latest Offers</p>

            <p id="ct" style={{ textAlign: "left", paddingLeft: "1rem" }}>
              FREE SHIP{" "}
            </p>
            <p style={{ textAlign: "left", paddingLeft: "1rem" , paddingBottom:'2rem'}}>
              Free Shiping this month!
            </p>

            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "90%",
                  border: ".2px solid darkgray",
                  marginLeft: "1rem",
                }}
              ></div>
            </div>

            <p id="ct" style={{ textAlign: "left", paddingLeft: "1rem" , paddingTop:'2rem'}}>
              Hola{" "}
            </p>
            <p
              style={{
                textAlign: "left",
                paddingLeft: "1rem",
                paddingBottom: "2rem",
                
              }}
            >
              Happy 300Rs Off on everything{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
