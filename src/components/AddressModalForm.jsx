  import React, { useState, useEffect, useRef } from "react";
  import { Modal } from "antd";
  import { useSelector } from "react-redux";
  import axios from "axios";
  import "./AddressModalForm.scss";
  import NoDatar from "../assets/NoData.png";
  import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
  import { deleteAddress } from "../utils/deleteAddress";
  import EditAddressModal from "./EditAddressModal";

  function AddressModalForm({ isModalOpen, setIsModalOpen }) {
    const userEmail = useSelector((state) => state.users.email);
    const [open, setOpen] = useState(false);
    const [gettedAddressData, setGettedAddressData] = useState([]);
    const [sample, setSample] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressData, setAddressData] = useState({
      aname: "",
      hno: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });

    //Active address
    const handleAddressClick = (addressId) => {
      setSelectedAddressId(addressId);
    };

    //Getaddress
    useEffect(() => {
      const getAddress = async () => {
        await axios
          .get(`http://localhost:4000/getAddress/${userEmail}`)
          .then((response) => {
            setGettedAddressData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAddress();
    }, [sample]);

    const formRef = useRef(null); // Add this line

    //Handle ADDRESS Addition
    const handleSubmit = async (e) => {
      const obn = {
        addressData: addressData,
        email: userEmail,
      }
      e.preventDefault();
      try {
        await axios.post("http://localhost:4000/addAddress", obn);
        setAddressData({
          aname: "",
          hno: "",
          street: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          phone: "",
        });
      formRef.current.reset(); // Reset the form fields
        setSample(!sample);
      } catch (err) { 
        console.log(err);
      }
    };
    
    const handleChange = (e) => {
      setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    //IMPORTANT---------------------------------------------------------------->
    const handleEditClick = (addressId) => {
      const selectedAddress = gettedAddressData.find((address) => address._id === addressId);
      setSelectedAddress(selectedAddress);
      setOpen(true);
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
          <form onSubmit={handleSubmit} ref={formRef}>
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
              maxLength="6"
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
              required
            />
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              value={addressData.phone}
              onChange={handleChange}
              required
              maxLength="12"
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
                      <b>Pincode</b> {add.pincode} <br />
                      <b>Phone</b> {add.phone}
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
              setSample = {setSample}
              sample = {sample}
            />
          </div>
        </div>
      </Modal>
    );
  }

  export default AddressModalForm;
