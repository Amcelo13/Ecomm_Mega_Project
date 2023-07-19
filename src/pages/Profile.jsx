import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VendorProducts from "../components//VendorProducts";
import VendorDrafts from "../components/VendorDrafts";
import MyProfie from "../components/MyProfile";
import MyOrders from "../components/MyOrders";
import AdminDashboard from "../components/AdminDashboard";
import AllVendorsProductsForAdmin from '../components/AllVendorsProductsForAdmin'
import DashBoard from "../components/DashBoard";
import ProductModalForm from "../components/ProductModalForm";
import AddressModalForm from "../components/AddressModalForm";
import { useForm } from "rc-field-form";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.users);
  const [draftOption, setDraftOption] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const nameFromRedux = useSelector((state) => state.users.name);
  const location = useLocation();
  const [role, setIsRole] = useState("");
  const [form] = useForm();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/findVendorInfobyuid/${user.uid}`
        );

        setIsRole(response.data.designation);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileDetails();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleAvatarUpload = () => {
    const formData = new FormData();
    formData.append("profileImg", avatar);

    axios
      .post("http://localhost:4000/profileUpload", formData)
      .then((response) => {
        console.log("Avatar uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading avatar:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="containerofprofile">
        <div className="profleft">
          <div className="imgflex" style={{ display: "flex", marginTop: "2rem" }}>
            <label htmlFor="avatarInput">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
                alt=""
                width="50px"
                style={{ marginRight: "1.5rem", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            {avatar && (
              <span className="edit-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 10.814V15h4.186L14.63 6.555 9.444 1.37 1 9.814zm5.185 1.185l-.22.22-1.389.464a.657.657 0 0 1-.847-.848l.464-1.389.22-.22L6.315 11zM14.63 5.27L10.73 1.37a1 1 0 0 0-1.414 0L1.37 9.317a1 1 0 0 0-.196.356l-.523 1.57a1 1 0 0 0 1.17 1.17l1.57-.523a1 1 0 0 0 .356-.196l7.95-7.9a1 1 0 0 0 0-1.415z" />
                </svg>
              </span>
            )}
            <h1>{location.state ? location.state : nameFromRedux}</h1>
          </div>

          <div>
            <div style={{ display: "flex" }}>
              <p id="def">{role}</p>
              <p style={{ marginLeft: "2rem" }}>{email ? email : phone}</p>
            </div>
          </div>

          <p className={draftOption === -1 ? "mine1active" : "mine1"} id="mhj" onClick={() => setDraftOption(-1)}>
            My Profile
          </p>

          {role === "Customer" || role === "Admin" ? (
            ""
          ) : (
            <>
              <p className={draftOption === 3 ? "mine1active" : "mine1"} id="mhjq" onClick={() => setDraftOption(3)}>
                My DashBoard
              </p>
            </>
          )}

          {role === "Customer" || role === "Vendor" ? (
            ""
          ) : (
            <>
              <p className={draftOption === 5 ? "mine1active" : "mine1"} id="mhjq" onClick={() => setDraftOption(5)}>
                DashBoard
              </p>
            </>
          )}

          {role === "Customer" || role === "Admin" ? (
            ""
          ) : (
            <>
              <p className={draftOption === 0 ? "mine1active" : "mine1"} onClick={() => setDraftOption(0)}>
                Products
              </p>
            </>
          )}

          {role === "Vendor" ? (
            <>
              <p className={draftOption === 1 ? "mine1active" : "mine1"} onClick={() => setDraftOption(1)}>
                My Drafts
              </p>
            </>
          ) : (
            ""
          )}

          {role === "Admin" ? (
            <>
              <p className={draftOption === 4 ? "mine1active" : "mine1"} onClick={() => setDraftOption(4)}>
                All Products
              </p>
            </>
          ) : (
            ""
          )}

          <p className={draftOption === 2 ? "mine1active" : "mine1"} onClick={() => setDraftOption(2)}>
            My Orders
          </p>

          <p className="mine2" onClick={showModal}>
            My Addresses
          </p>
          <AddressModalForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>

        <div className="profright">
          {draftOption === 0 && <VendorProducts outOfStockActivator={true} />}
          {draftOption === 1 && <VendorDrafts outOfStockActivator={false} />}
          {draftOption === -1 && <MyProfie name={location.state} />}
          {draftOption === 2 && <MyOrders />}
          {draftOption === 3 && <DashBoard />}
          {draftOption === 4 && <AllVendorsProductsForAdmin />}
          {draftOption === 5 && <AdminDashboard />}
        </div>

        {role === "Customer" ? (
          ""
        ) : (
          <>
            <button id="add--post" onClick={() => setOpen(true)} style={{ position: "fixed" }}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>{" "}
              Add a Product
            </button>
          </>
        )}

        <ProductModalForm open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default Profile;
