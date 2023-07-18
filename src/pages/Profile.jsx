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
  const [draftOption, setDraftOption] = useState(5); //for  toggle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const nameFromRedux = useSelector((state) => state.users.name);
  const location = useLocation();
  const [role, setIsRole] = useState(""); //<------------aCHI BAAT for string initial
  const [form] = useForm();
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const getProfileDetails = async (req, res) => {
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
  
  return (
    <>
      <Navbar />
      <div className="containerofprofile">
        <div className="profleft">
          <div
            className="imgflex"
            style={{ display: "flex", marginTop: "2rem" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
              alt=""
              width="50px"
              style={{ marginRight: "1.5rem" }}
            />
            <h1>{location.state ? location.state : nameFromRedux}</h1>
          </div>

         <div>
         <div style={{display:'flex'}}>
         <p id="def">{role}</p>
         
         <p style={{marginLeft:'2rem'}}>{email ? email : phone}</p></div>
         </div>
       
          <p
            className={draftOption === -1 ? "mine1active" : "mine1"}
            id="mhj"
            onClick={() => setDraftOption(-1)}
          >
            My Profile
          </p>

          {role === "Customer" || role === "Admin" ? (
            ""
          ) : (
            <>
              <p
                className={draftOption === 3 ? "mine1active" : "mine1"}
                id="mhjq"
                onClick={() => setDraftOption(3)}
              >
                My DashBoard
              </p>
            </>
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
              {" "}
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
              {" "}
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

        <ProductModalForm open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default Profile;
