import React, { useEffect, useState } from "react";
import { getVendorDetails } from "../utils/getVendorDetails";
import { useSelector } from "react-redux";
import { vendorActivation } from "../utils/vendorActivation";
import { Space, Table, Tag, message, Switch } from "antd";
import "./DashBoard.css";
import VendorControlModal from "./VendorControlModal";

function AdminDashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [currentOrderID, setCurrentOrderID] = useState("");
  const userEmail = useSelector((state) => state.users.email);
  const [vendorHistory, setVendorHistory] = useState([]);
  const [sample, setSample] = useState(true);
  const [randomState, setRandomState] = useState(false);

  const onChange = async (vendorID, statusBoolean) => {
    // console.log(`switch to ${checked}`);
    setRandomState(true);
    await vendorActivation(vendorID, statusBoolean);
    setSample(!sample);
  };

  //Getting vendor order details
  useEffect(() => {
    const getData = async () => {
      const vendorDetails = await getVendorDetails();
      // console.log(vendorDetails.data)
      setVendorHistory(vendorDetails.data);
    };  

    getData();
    //After getting the new state of status of vendor we enable the switch
    setRandomState(false);
  }, [sample]);

  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "name",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Login Rights",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Switch
            defaultChecked={record.status}
            onChange={() => onChange(record._id, !record.status)}
            disabled={randomState}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="order--container1">
        <div className="earn">
          <h2 id="vcvc">Admin Dashboard</h2>
        </div>
        <Table columns={columns} dataSource={vendorHistory} />;
      
      </div>
    </>
  );
}

export default AdminDashboard;
