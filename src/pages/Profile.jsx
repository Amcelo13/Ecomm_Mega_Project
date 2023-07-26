import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VendorProducts from "../components/Products/VendorProducts";
import VendorDrafts from "../components/Products/VendorDrafts";
import MyProfie from "../components/Profiles/MyProfile";
import MyOrders from "../components/Order/MyOrders";
import AdminDashboard from "../components/Dashboards/AdminDashboard";
import AllVendorsProductsForAdmin from "../components/Products/AllVendorsProductsForAdmin";
import DashBoard from "../components/Dashboards/DashBoard";
import ProductModalForm from "../components/Products/ProductModalForm";
import AddressModalForm from "../components/AddressesModals/AddressModalForm";
import { useForm } from "rc-field-form";
import axios from "axios";
import { Upload } from "antd";
import PROFILEE from "../assets/Circle-icons-profile.svg.png";
import { EditOutlined } from "@ant-design/icons";

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
  const [avatar, setAvatar] = useState("");
  const [sample, setSample] = useState(false);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/findVendorInfobyuid/${user.uid}`
        );

        setIsRole(response.data.designation);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAvatar(response.data.profileImg);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileDetails();
  }, [sample]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = ({ file: newFile }) => {
    newFile.status === "done" &&
      onFinish(`http://localhost:4000/mediaUpload/${newFile.response}`);
  };

  //On change this function get the recieved img url and call the update api again
  const onFinish = async (imgURL) => {
    console.log(imgURL);
    try {
      const response = await axios.post(
        `http://localhost:4000/updateUserInfo/${user.uid}`,
        { profileImg: imgURL }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setSample(!sample);
  };
  
  return (
    <>
      <Navbar/>
      <div className="containerofprofile">
        <div className="profleft">
          <div
            className="imgflex"
            style={{ display: "flex", marginTop: "2rem", position: "relative" }}
          >
            <img
              src={avatar ? avatar : PROFILEE}
              alt=""
              width="100rem"
              height="100rem"
              style={{ borderRadius: "50%" }}
            />{" "}
            <br />
            <Upload
              action="http://localhost:4000/uploads"
              onChange={handleChange}
              name="image"
              maxCount={1}
              multiple={false}
            >
              <button className="changeImg">
                <EditOutlined />
              </button>
            </Upload>
          </div>
          <h1>{location.state ? location.state : nameFromRedux}</h1>

          <div>
            <div style={{ display: "flex" }}>
              <p id="def">{role}</p>
              <p style={{ marginLeft: "2rem" }}>{email ? email : phone}</p>
            </div>
          </div>

          <p
            className={draftOption === -1 ? "mine1active" : "mine1"}
            id="mhj"
            onClick={() => setDraftOption(-1)}
          >
            My Profile
          </p>

          {role === "Vendor" ? (
            <>
              <p
                className={draftOption === 3 ? "mine1active" : "mine1"}
                id="mhjq"
                onClick={() => setDraftOption(3)}
              >
                My DashBoard
              </p>
            </>
          ) : (
            ""
          )}

          {role === "Customer" || role === "Vendor" ? (
            ""
          ) : (
            <>
              <p
                className={draftOption === 5 ? "mine1active" : "mine1"}
                id="mhjq"
                onClick={() => setDraftOption(5)}
              >
                DashBoard
              </p>
            </>
          )}

          {role === "Customer" || role === "Admin" ? (
            ""
          ) : (
            <>
              <p
                className={draftOption === 0 ? "mine1active" : "mine1"}
                onClick={() => setDraftOption(0)}
              >
                Products
              </p>
            </>
          )}

          {role === "Vendor" ? (
            <>
              <p
                className={draftOption === 1 ? "mine1active" : "mine1"}
                onClick={() => setDraftOption(1)}
              >
                My Drafts
              </p>
            </>
          ) : (
            ""
          )}

          {role === "Admin" ? (
            <>
              <p
                className={draftOption === 4 ? "mine1active" : "mine1"}
                onClick={() => setDraftOption(4)}
              >
                All Products
              </p>
            </>
          ) : (
            ""
          )}

          <p
            className={draftOption === 2 ? "mine1active" : "mine1"}
            onClick={() => setDraftOption(2)}
          >
            My Orders
          </p>

          <p className="mine2" onClick={showModal}>
            My Addresses
          </p>
          <AddressModalForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        <div className="profright">
          {draftOption === 0 && <VendorProducts outOfStockActivator={true} />}
          {draftOption === 1 && <VendorDrafts outOfStockActivator={false} />}
          {draftOption === -1 && (
            <MyProfie
              name={location.state}
              sample={sample}
              setSample={setSample}
            />
          )}
          {draftOption === 2 && <MyOrders />}
          {draftOption === 3 && <DashBoard />}
          {draftOption === 4 && <AllVendorsProductsForAdmin />}
          {draftOption === 5 && <AdminDashboard />}
        </div>

        {role === "Customer" ? (
          ""
        ) : (
          <>
            <button
              id="add--post"
              onClick={() => setOpen(true)}
              style={{ position: "fixed" }}
            >
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

        <ProductModalForm open={open} setSample={setSample} setOpen={setOpen} sample={sample}/>
      </div>
    </>
  );
}

export default Profile;
