import React from "react";
import "./Navbar.css";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import LOGO from "../assets/open-box-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../app/features/templateSlice";

function Navbar(props) {
  const userO = useSelector((state) => state.users?.email);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  const handleToHome = () => {
    navigate("/");
  };

  const navigateToProfilePage = () => {
    navigate("/profile", { state: props?.name });
  };

  const gotoCategoryPage = (category) => {
    navigate("/categoryPage", { state: category });
  };
  
  const gotoCartPage = (category) => {
    navigate("/cartPage");
  };
  
  const gotoSignup = () => {
    navigate("/signup");
  };
  const gotoLogin = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    dispatch(setLogout())
    navigate('/')
  };

  return (
    <div className="NAVCONATINER">
      <div className="left--nav">
        <img
          src={LOGO}
          alt=""
          id="logo"
          style={{
            paddingLeft: "3rem",
            paddingBottom: ".6rem",
            width: "50px",
            paddingTop: "3px",
          }}
        />
        <span id="intro" onClick={handleToHome}>
          Evolve
        </span>
      </div>

      <div className="right--nav">
        {/*Profile*/}
        {userO && (
          <div>
            <UserOutlined
              className="right--nav--items"
              onClick={navigateToProfilePage}
            />
          </div>
        )}

        {/*Categories*/}
        <div>
          <CategoryIcon
            className="right--nav--items"
            onMouseEnter={() => setIsShown(true)}
          />
        </div>

        {isShown && (
          <div id="cvt" onMouseLeave={() => setIsShown(false)}>
            <h2 style={{ paddingLeft: "2rem" }}>Categories</h2>
            <ul style={{ listStyleType: "none" }}>
              <li
                className="li1"
                onClick={() => gotoCategoryPage("Appliances")}
              >
                Appliances
              </li>
              <li className="li2" onClick={() => gotoCategoryPage("Clothes")}>
                Clothes{" "}
              </li>
              <li className="li1" onClick={() => gotoCategoryPage("Shoes")}>
                Shoes{" "}
              </li>
              <li
                className="li2"
                onClick={() => gotoCategoryPage("SmartPhones")}
              >
                SmartPhones{" "}
              </li>
              <li className="li1" onClick={() => gotoCategoryPage("Bags")}>
                Bags{" "}
              </li>
            </ul>
          </div>
        )}
        {/*Cart*/}
        {userO && (
          <div>
            <ShoppingCartOutlined
              className="right--nav--items"
              onClick={gotoCartPage}
            />
          </div>
        )}

        {userO && (
          <div>
            <LogoutOutlined
              className="right--nav--items"
              onClick={handleLogout}
            />
          </div>
        )}

     {!userO &&    <p className="gg"style={{fontSize:'1rem', fontWeight:'600', cursor:'pointer', transition:'1s', marginTop:'0.7rem'}} onClick={gotoSignup}>
     Sign Up
   </p>}

       {!userO &&  <p className="gg"style={{fontSize:'1rem', fontWeight:'600', cursor:'pointer', transition:'1s', marginTop:'0.7rem'}} onClick={gotoLogin}>
       Login
     </p>}

      </div>
    </div>
  );
}

export default Navbar;
