import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../app/features/GetOrders/myorders.action";
import OrderModal from "./OrderModal.jsx";
import "./MyOrder.css";

import KOKO from "../../assets/order.svg";
import { getCartSubtotal } from "../../services/getCartSubtotal.js";
import { getSpecificOrder } from "../../services/getSpecificOrder.js";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

function MyOrders() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.users.users.email);
  const [orderData, setOrderData] = useState([]);
  const [sample, setSample] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [specificOrderInfo, setSpecificOrderInfo] = useState();
  const [open, setOpen] = useState(false);
  const orderDataFromAsync = useSelector((state) => state.orders.orders);
  const globalError = useSelector((state) => state.orders.error);
  const isLoading = useSelector((state) => state.orders.isLoading);

  // Getting the order items  //TODO: Good sorting method defined here for latest orders
  useEffect(() => {
    dispatch(getOrders(userEmail));

    let data = [...orderDataFromAsync]; //<-------Deep copying for sort enabling otherwise not working
    const sortedOrderData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setOrderData(sortedOrderData);
  }, [sample, userEmail]);

  // Animate
  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 2000);
    }
  }, [animate]);

  const orderTime = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
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
      {isLoading ? ( // Show loading outline while data is being fetched
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <LoadingOutlined style={{ fontSize: "2rem", color: "black" }} />
        </div>
      ) : (
        <>
          {globalError !== null ? (
            <div className="orderr--left">
              <p id="cvvf">My Orders</p>

              {orderData &&
                orderData.map((order, index) => {
                  return (
                    <div
                      className="cartI1"
                      key={order._id}
                      onClick={() => openSelectedOrder(order._id)}
                    >
                      <div className="order-item-row">
                        {order.orderItems.map((item) => {
                          return (
                            <div key={item._id} className="order-item">
                              <img
                                src={item.images[0]}
                                alt=""
                                id="nb1"
                                width="90px"
                              />

                              <div
                                style={{
                                  marginLeft: "5rem",
                                  paddingTop: "3rem",
                                }}
                              >
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
                        <b>Cart Subtotal: </b>₹
                        {getCartSubtotal(order.orderItems)}
                      </p>

                      {order.isCancel ? (
                        <p style={{ color: "red" }} id="df3">
                          <h3>This Order was Cancelled </h3>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            
             <div className="order--right" style={{marginLeft:"30rem"}}>
             {message.error("Some Error Occured")}
             <img src={KOKO} width="300px" id="orderrimg" alt="order" />
           </div>
           
          )}

          <OrderModal
            isLoading={isLoading}
            specificOrderInfo={specificOrderInfo}
            open={open}
            setSample={setSample}
            sample={sample}
            setOpen={setOpen}
          />

       
        </>
      )}
    </div>
  );
}

export default MyOrders;
