import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AddressModalForm.scss";
import NoDatar from "../../assets/NoData.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteAddress } from "../../services/deleteAddress";
import { addOrdersInOrderCollection } from "../../services/addOrdersInOrderCollection";
import { incrementProductSales } from "../../services/incrementProductSales";
import EditAddressModal from "./EditAddressModal";
import { useNavigate } from "react-router-dom";

const success = () => {
  Modal.success({
    content: "Your Order has been placed successfully",
  });
};

function AddressModalFormCheckout({ isModalOpen, setIsModalOpen, cartItems }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.users.users.email);
  const userName = useSelector((state) => state.users.users.name);
  const [gettedAddressData, setGettedAddressData] = useState([]);
  const [sample, setSample] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressClick = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = gettedAddressData.find((address) => address._id === addressId);
    setSelectedAddress(selectedAddress);
  };

  //Add order to inventory of orders collection
  const finalOrder = (
    cartItems,
    userName,
    selectedAddress,
    userEmail
  ) => {


    if(selectedAddress){
      success();
      setIsModalOpen(false);
      incrementProductSales(cartItems);
      addOrdersInOrderCollection(
        cartItems,
        userName,
        selectedAddress,
        userEmail
      ); //going in orderModel
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  else{
    message.error("Please Select an address");
  }
  };

  //Get address
  useEffect(() => {
    const getAddress = async () => {
      await axios
        .get(`https://ecomm-mega-project.onrender.com/getAddress/${userEmail}`)
        .then((response) => {
          setGettedAddressData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAddress();
  }, [sample]);

  const [addressData, setAddressData] = useState({
    aname: "",
    hno: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleSubmit = async (e) => {
    const obn = {
      addressData: addressData,
      email: userEmail,
    };
    e.preventDefault();
    try {
      await axios.post("https://ecomm-mega-project.onrender.com/addAddress", obn);
    } catch (err) {
      console.log(err);
    }
    setSample(!sample);
  };

  //Address
  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle Edit Click
  const handleEditClick = (addressId) => {
    const selectedAddress = gettedAddressData.find(
      (address) => address._id === addressId
    );
    setSelectedAddress(selectedAddress);
    setOpen(true);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      width={1200}
    >
      <div className="address">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">
            Add Address
          </h2>
          <label>Name</label>
          <input
            name="aname"
            type="text"
            value={addressData.aname}
            onChange={handleChange}
            required
          />
          <label>House No.</label>
          <input
            name="hno"
            type="text"
            value={addressData.hno}
            onChange={handleChange}
            required
          />
          <label>Street</label>
          <input
            name="street"
            type="text"
            value={addressData.street}
            onChange={handleChange}
            required
          />
          <label>Landmark</label>
          <input
            name="landmark"
            type="text"
            value={addressData.landmark}
            onChange={handleChange}
            required
          />
          <label>City</label>
          <input
            name="city"
            type="text"
            value={addressData.city}
            onChange={handleChange}
            required
          />
          <label>State</label>
          <input
            name="state"
            type="text"
            maxLength={6}
            value={addressData.state}
            onChange={handleChange}
            required
          />
          <label>Pincode</label>
          <input
            name="pincode"
            type="text"
            pattern="[0-9]*"
            value={addressData.pincode}
            onChange={handleChange}
            required
          />
          <button>Add Address</button>
        </form>

        <div className="addright">
          <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">
            Select from Address List
          </h2>
          {gettedAddressData ? (
            gettedAddressData.map((add, index) => {
              const isActive = add._id === selectedAddressId;

              return (
                <div
                  className={`addresses ${isActive ? "active" : ""}`}
                  key={index}
                  onClick={() => handleAddressClick(add._id)}
                >
                  <p>
                    <b>{add.aname}</b>
                  </p>
                  <pre>
                    <b>HNo</b> {add.hno} <br />
                    <b>Street</b> {add.street} <br />
                    <b>City</b> {add.city} <br />
                    <b>State</b> {add.state} <br />
                    <b>Pincode</b> {add.pincode}
                    <br />
                  </pre>

                  <div className="classy">
                    <EditOutlined
                      className={`edity ${isActive ? "active" : ""}`}
                      onClick={() => handleEditClick(add._id)}
                    />

                    <DeleteOutlined
                      onClick={() =>
                        deleteAddress(add._id, userEmail, setSample)
                      }
                      className={`delety ${isActive ? "active" : ""}`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <img src={NoDatar} alt="" />
            </>
          )}
          <EditAddressModal
            open={open}
            userEmail={userEmail}
            selectedAddressId={selectedAddressId}
            setOpen={setOpen}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setSample={setSample}
            sample={sample}
          />
        </div>
        <button
          onClick={() =>
            finalOrder(cartItems, userName, selectedAddress, userEmail)
          }
          style={{
            marginTop: "20px",
            color: "white",
            marginLeft: "3rem",
            marginRight: "4rem",
            border: "none",
            cursor: "pointer",
            paddingLeft: "35px",
            paddingRight: "35px",
            height: "40px",
            backgroundColor: "#2e2d2d",
          }}
        >
          Order Now
        </button>
      </div>
    </Modal>
  );
}

export default AddressModalFormCheckout;
