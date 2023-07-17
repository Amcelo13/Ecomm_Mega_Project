import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Steps } from "antd";
import "./MyOrder.css";
import "./OrderModal.css";
import { cancelTheOrder } from "../utils/cancelTheOrder";

function OrderModal({ open, setOpen, specificOrderInfo, setSample, sample }) {
  const [logisticsStatus, setLogisticsStatus] = useState(0);
  const [cancel, setCancel] = useState(true);
  
  // Checking the order status
  useEffect(() => {
    if (specificOrderInfo) {
      const { status, createdAt, isCancel } = specificOrderInfo;

 
      switch (status) {
        case "ordered":
          setLogisticsStatus(0);
          break;
        case "shipped":
          setLogisticsStatus(1);
          break;
        case "delivered":
          setLogisticsStatus(2);
          break;
        default:
          setLogisticsStatus(0);
          break;
      }
      if (isCancel === true) {
        setLogisticsStatus(-1);
      }


      const currentTime = new Date();
      const orderCreationTime = new Date(createdAt);
      const timeDifference = currentTime - orderCreationTime;
      const timeDifferenceInHours = Math.floor(
        timeDifference / (1000 * 60 * 60)
      );

      // Set the order status and cancellation based on the time difference
      if (timeDifferenceInHours <= 24 && status !== "delivered") {
        setCancel(false);
      } 
      else {
        setCancel(true);
      }
    }
  }, [specificOrderInfo]);

  //Handle  Cancel
  const handleCancelOrder = () => {
    cancelTheOrder(specificOrderInfo?._id);
    setSample(!sample)
    
    setTimeout(() => {
      setOpen(false)
    }, 1000);
    
  };

  if (!specificOrderInfo) {
    return null; // Render nothing if specificOrderInfo is undefined
  }

  const { orderItems, address, createdAt, isCancel } = specificOrderInfo;
  const orderTime = new Date(createdAt).toLocaleString();

  return (
    <Modal
      title="Order Details"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={900}
      footer={null}
    >
      <div className="step--container">
        <Steps
          progressDot
          current={logisticsStatus}
          // status ={'error'}
          items={[
            {
              title: "Ordered",
              description: "📦 Your order is Ordered",
            },
            {
              title: "Shipped",
              description: "🚚 On Ship",
            },
            {
              title: `${cancel ? "Cancelled" : "Delivered"}`,
              description: `${cancel ? "❌Cancelled" : "✅Delivered"}`,
            },
          ]}
        />
      </div>

      <div className="order-details--container">
        <h3>Order Items:</h3>
        {orderItems.map((item) => (
          <div key={item._id} className="order-item">
            <img
              src={item.prodImage}
              alt={item.name}
              className="order-item-image"
            />
            <div className="order-item-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹ {item.price}</p>
            </div>
          </div>
        ))}

        <h3 style={{ marginTop: "1rem" }}>Shipping Address:</h3>
        <div className="shipping-address">
          <p>{address.aname}</p>
          <p>{address.hno}</p>
          <p>{address.street}</p>
          <p>{address.landmark}</p>
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.pincode}</p>
        </div>

        <h3>Order Time:</h3>
        <p>{orderTime}</p>

        {isCancel ? (
          <h1 style={{ color: "red" }}>This Order was Cancelled</h1>
        ) : (
          <>
            <div className="flet">
              <p style={{ color: "gray" }}>
                You can cancel the order only within 24hrs
              </p>

              <Button
                type="danger"
                onClick={handleCancelOrder}
                disabled={cancel}
              >
                Cancel Order
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default OrderModal;
