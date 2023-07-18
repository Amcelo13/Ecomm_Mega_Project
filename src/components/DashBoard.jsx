import React, { useEffect, useState } from "react";
import { getVendorOrderDetails } from "../utils/getVendorOrderDetails";
import { useSelector } from "react-redux";
import { cancelTheOrder } from "../utils/cancelTheOrder";
import { Space, Table, Tag, message } from "antd";
import "./DashBoard.css";
import VendorControlModal from "./VendorControlModal";

function DashBoard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [sample, setSample] = useState(false)
  const [currentOrderID, setCurrentOrderID] = useState("");
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);
  const [myEarnings, setMyEarnings] = useState(0);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "The order has been canceled",
    });
  };

  const userEmail = useSelector((state) => state.users.email);
  const [vendorOrderHistory, setVendorOrderHistory] = useState([]);

  //Getting vendor order details
  useEffect(() => {
    const vendorOrderDetails = getVendorOrderDetails(userEmail);

    vendorOrderDetails
      .then((data) => {
        const sortedOrderData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setVendorOrderHistory(sortedOrderData);
        let totalquantity = 0;
        let totalEarnings = 0;


        //Adding the quantities of all the vendor sales collections
        sortedOrderData?.map((order) => order.orderItems.forEach((e) => {
            totalquantity += e.quantity;
          })
        );
        setTotalOrderQuantity(totalquantity);

          //Adding the total earnings 
          sortedOrderData?.map((order)=>{

              if(order.status === 'delivered'){  //IF DELIVERED THEN ONLY EARNING
                order.orderItems.forEach((e)=>{
                  totalEarnings += (e.price * e.quantity)
                })
              }
          })
            setMyEarnings(totalEarnings)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sample]);

  const   cancelActivation = (status) => {
    return status === "cancelled" || status === "delivered" ? true : false;
  };

  //Handle order  status change 'ordered', 'shipped', 'delivered'
  const handleOrderStatus = (orderID, status) => {
    setCurrentOrderID(orderID);
      if(!cancelActivation(status)) {
        setOpen(true);
      }
  };

  //To cancel the order for some reason
  const handleOrderCancellation = (orderID) => {
    error();
    cancelTheOrder(orderID);
    setSample(!sample)
  };


  const columns = [
    {
      title: "Customer Name",
      dataIndex: "userName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: `status`,
      key: "status",
    },
    {
      title: "Email",
      dataIndex: `userId`,
      key: "userId",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => {
        if (address) {
          const { hno, city, pincode } = address;
          return (
            <Tag color="blue">
              {hno} &nbsp; {city}, {pincode}
            </Tag>
          );
        } else {
          return "";
        }
      },
    },
    {
      title: "Ordered On",
      dataIndex: "createdAt",
      key: "orderedOn",
    },
    {
      title: "Product Name",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => {
        if (orderItems) {
          const { name } = orderItems[0];
          return <Tag color="blue">{name}</Tag>;
        } else {
          return "";
        }
      },
      columnWidth: 200,
    },
    {
      title: "Quantity",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => {
        if (orderItems) {
          const { quantity } = orderItems[0];
          return <Tag color="green">{quantity}</Tag>;
        } else {
          return "";
        }
      },
    },

    {
      title: "❌Cancel Order",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            disabled={cancelActivation(record.status)}
            style={{ color: "red" }}
            onClick={() => handleOrderCancellation(record._id)}
          >
            Cancel{" "}
          </a>
        </Space>
      ),
    },
    {
      title: "Change Status",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            disabled={cancelActivation(record.status)}
            onClick={() => handleOrderStatus(record._id, record.status)}
          >
            Change Status
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="order--container1">
        <div className="earn">
          <h2 id="vcvc">My Dashboard</h2>
          <div className="total-orders">
            <h2 style={{ color: "#f6851c" }}>
              Total Orders: {totalOrderQuantity}
            </h2>
          </div>
          <div className="earnings">
            <h2 style={{ color: "green" }}>My Earnings: {myEarnings} </h2>
          </div>
        </div>
        <Table columns={columns} dataSource={vendorOrderHistory} />;
        <div className="orderr--left1">
          <VendorControlModal sample =  {sample}  setSample={setSample}
            orderID={currentOrderID}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
}

export default DashBoard;