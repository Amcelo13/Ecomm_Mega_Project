import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrderItems } from "../utils/getOrderItems.js";
import OrderModal from "./OrderModal.jsx";
import "./MyOrder.css";
import KOKO from "../assets/order.svg";
import { getCartSubtotal } from "../utils/getCartSubtotal.js";
import { getSpecificOrder } from "../utils/getSpecificOrder.js";

function MyOrders() {
  const userEmail = useSelector((state) => state.users.email);
  const [orderData, setOrderData] = useState([]);
  const [sample, setSample] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [specificOrderInfo, setSpecificOrderInfo] = useState();
  const [open, setOpen] = useState(false);

  // Getting the order items  //TODO: Good sorting method defined here for latest orders
  useEffect(() => {
    const getOrderInfo = getOrderItems(userEmail);

    getOrderInfo
      .then((result) => {
        const sortedOrderData = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrderData(sortedOrderData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sample]);

  // Animate
  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 1000); // Adjust the duration (in milliseconds) to match the CSS transition duration
    }
  }, []);

  const orderTime = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Customize the date format as per your preference
  };

  //Open modal and send the order details to the modal
  const openSelectedOrder = (orderID) => {
    const call = getSpecificOrder(orderID);
    call.then((res) => {
      setSpecificOrderInfo(res);
    });
    setOpen(true);
  };
  return (
    <div className="order--container">
      <div className="orderr--left">
        <p id="cvvf">My Orders</p>

        {orderData &&
          orderData.map((order) => {
            return (
              <div
                key={order._id}
                className="cartI1"
                onClick={() => openSelectedOrder(order._id)}
              >
                <div className="order-item-row">
                  {order.orderItems.map((item) => {
                    return (
                      <div key={item._id} className="order-item">
                        <img
                          src={item.prodImage}
                          alt=""
                          id="nb1"
                          width="80px"
                        />
                        {order.isCancel ? (
                          <p style={{ color: "red" }} id="df3">
                          <h3 >This Order was Cancelled </h3>
                          </p>
                        ) : (
                          ""
                        )}
                        <div style={{ marginLeft: "5rem", paddingTop: "3rem" }}>
                          <h4 id="new1">{item.name}</h4>
                          <p id="gb1">Quantity: {item.quantity}</p>
                          <p id="df1">
                            <b>₹ {item.price * item.quantity}</b>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p id="fum">Ordered On: {orderTime(order.createdAt)}</p>
                <p id="df2">
                  <b>Cart Subtotal: </b>₹ {getCartSubtotal(order.orderItems)}
                </p>
              </div>
            );
          })}
      </div>

      <OrderModal
        specificOrderInfo={specificOrderInfo}
        open={open}
        setSample= {setSample}
        sample= {sample}
        setOpen={setOpen}
      />

      <div className="order--right">
        <img src={KOKO} width="300px" id="orderrimg" alt="order" />
      </div>
    </div>
  );
}

export default MyOrders;
