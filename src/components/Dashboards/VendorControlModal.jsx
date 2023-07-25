import React from "react";
import { Modal, Button, message } from "antd";
import { setStatus } from "../../services/setStatus.js";

function VendorControlModal({ open, setOpen, orderID, sample, setSample }) {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Order Status updated",
    });
  };

  const handleShipped = (orderID) => {
    setStatus(orderID, "shipped");
    success();
    setSample(!sample);
    setOpen(false);
  };

  const handleDelivered = (orderID) => {
    setStatus(orderID, "delivered");
    success();
    setSample(!sample);
    setOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Set Order Status"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <div
          style={{
            margin: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            key="shipped"
            type="primary"
            style={{ backgroundColor: "#f6851c" }}
            onClick={() => handleShipped(orderID)}
          >
            Shipped
          </Button>
          ,
          <Button
            style={{ backgroundColor: "green" }}
            key="delivered"
            type="primary"
            onClick={() => handleDelivered(orderID)}
          >
            Delivered
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default VendorControlModal;
