import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AddressModalForm.scss";
import NoDatar from "../../assets/NoData.png";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteAddress } from "../../services/deleteAddress";
import { addToCart } from "../../services/addToCart";
import { useNavigate } from "react-router-dom";

function AddressModalFormBuy({
  isModalOpen,
  setIsModalOpen,
  prod,
  vendorData,
  quanValue,
}) {
  const userEmail = useSelector((state) => state.users.users.email);
  const [gettedAddressData, setGettedAddressData] = useState([]);
  const [sample, setSample] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [length, setLength] = useState(0);
  const navigate = useNavigate();
  const handleAddressClick = (addressId) => {
    setSelectedAddressId(addressId);
  };

  // Get address
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddress/${userEmail}`);
        setGettedAddressData(response.data);
        setLength(response.data.length);
      } catch (error) {
        console.log(error);
      }
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
    e.preventDefault();
    const obn = {
      addressData: addressData,
      email: userEmail,
    };

    try {
      await axios.post("http://localhost:4000/addAddress", obn);
    } catch (err) {
      console.log(err);
    }

    setSample(!sample);
  };

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const gotoCart = (prod, vendorData, quanValue, userEmail) => {
    addToCart(prod, vendorData, quanValue, userEmail);
    setTimeout(() => {
      navigate("/cartPage");
    }, 1500);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      width={1000}
    >
      <div className="address">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">
            Add New Address
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
            // maxLength="6"
            pattern="[A-Za-z]{2,}"
            value={addressData.state}
            onChange={handleChange}
            required
          />
          <label>Pincode</label>
          <input
            name="pincode"
            type="text"
            value={addressData.pincode}
            onChange={handleChange}
            pattern="[0-9]*" // Allow only numbers
            maxLength={6} // Limit length to 6 characters
            required
          />
          
          <button>Add Address</button>
        </form>

        <div className="addright">
          <h2 className="text-2xl mb-10 font-bold tracking-tight text-gray-900">
            Address List
          </h2>
          {gettedAddressData ? (
            gettedAddressData.map((add) => {
              const isActive = add._id === selectedAddressId;

              return (
                <div
                  className={`addresses ${isActive ? "active" : ""}`}
                  key={add._id}
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

          {length ? (
            <>
              <button
                onClick={() => gotoCart(prod, vendorData, quanValue, userEmail)}
                style={{
                  marginTop: "20px",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  height: "40px",
                  backgroundColor: "#2e2d2d",
                }}
              >
                Go To Cart{" "}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddressModalFormBuy;
