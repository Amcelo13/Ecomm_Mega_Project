import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {  useLocation, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import axios from "axios";
import { Carousel, Image, Tooltip } from "antd";
import { message } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { getTime } from "../utils/getTime";
import { addToCart } from "../utils/addToCart";
import { useSelector } from "react-redux";
import AddressModalFormBuy from "../components/AddressModalFormBuy";

function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressLength, setAddressLength] = useState();
  const userEmail = useSelector((state) => state.users.email);
  const [prodInfo, setProductInfo] = useState();
  const location = useLocation();
  const id = location.state;
  const [loading, setLoading] = useState(true);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [quanValue, setQuanValue] = useState(1);
  const [vendorData, setVendorData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Added to Cart Successfully",
    });
  };

  //Get specific product info and getting the vendor information alongside by calling its function
  useEffect(() => {
    const getVendor = async (vendID) => {
      console.log(vendID);
      try {
        await axios
          .get(`http://localhost:4000/findVendorInfo/${vendID}`)
          .then((response) => {
            setVendorData(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      } 
          setLoading(false) 
    };

    //TODO: Firstly THIS EXECUTES THEN
    const getProduct = async () => {
      try {
        await axios
          .get(`http://localhost:4000/getProducts/${id}`)
          .then((response) => {
            if (response.status === 200) {
              const prod = response.data;
              setProductInfo(prod);
              getVendor(prod[0].vendorID); //TODO: Then this will execute later
            } else {
              console.log(response.status);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);


  //Getting addresses on buy address select form empty address in profile
  useEffect(() => {
    const getAddress = async () => {
      await axios
        .get(`http://localhost:4000/getAddress/${userEmail}`)
        .then((response) => {
          if (response.data.length >= 1) {
            setAddressLength(1);
          } else {
            setAddressLength(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAddress();
  }, []);

  //Cart Addition Handling
  const handleAddToCart = (prod, vendorData, quanValue, userEmail) => {
   if(userEmail ){
    addToCart(prod, vendorData, quanValue, userEmail);
    setLoading(true);

    setTimeout(() => {
      success();
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
   }

   else{
    navigate('/signup')
   }
  };

  const handleBuyButtonClick = (prod, vendorData, quanValue, userEmail) => {
    if (userEmail) {
      setLoadingBuy(true);
 
      if (addressLength) {
        addToCart(prod, vendorData, quanValue, userEmail);

        setTimeout(() => {
          success();
        }, 1000);
        setTimeout(() => {
          setLoadingBuy(false);
          navigate("/cartPage");
        }, 2000);
      } else {
        setIsModalOpen(true);
        setLoadingBuy(false);
      }
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="productPageContainer">
      {contextHolder}
      <Navbar />
  
      {/* Show the loader when loading is true */}
      {loading ? (
        <div className="loaderContainer">
          <LoadingOutlined style={{ fontSize: "2rem", marginTop:"20%" }} />
        </div>
      ) : (
        // Show the product details when loading is false
        <>
          {prodInfo &&
            prodInfo.map((prod, index) => {
              return (
                <div className="prodInfo">
                  <div className="leftu" id="LOMGu">
                    <h2>{prod.name}</h2>
                    <p
                      style={{
                        color: "gray",
                        fontSize: "15px",
                        paddingBottom: "3rem",
                      }}
                    >
                      {prod.category}
                    </p>
                    <h3>Description</h3>
                    <p
                      style={{
                        color: "gray",
                        fontSize: "13px",
                        maxWidth: "25rem",
                        maxHeight: "27rem",
                      }}
                    >
                      {prod.description}
                    </p>
                  </div>
  
                  <div>
                    <Carousel autoplay effect="fade" className="imn">
                      <div className="nu" style={{ borderRadius: "1rem" }}>
                        <Image
                          preview={true}
                          width={"90%"}
                          height={"90%"}
                          style={{ borderRadius: "1rem" }}
                          src={prod.images[0]}
                        />
                      </div>
                      <div className="nu">
                        <Image
                          width={"90%"}
                          height={"100%"}
                          style={{ borderRadius: "1rem" }}
                          src={prod.images[1]}
                        />
                      </div>
                      <div className="nu">
                        <Image
                          style={{ borderRadius: "1rem" }}
                          width={"90%"}
                          height={"100%"}
                          src={prod.images[2]}
                        />
                      </div>
                      <div className="nu">
                        <Image
                          style={{ borderRadius: "1rem" }}
                          width={"90%"}
                          height={"100%"}
                          src={prod.images[3]}
                        />
                      </div>
                    </Carousel>
                  </div>
  
                  <div className="actionButtons">
                    <b>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "2rem",
                          textAlign: "left",
                          marginBottom: "3rem",
                          paddingLeft: "8rem",
                        }}
                      >
                        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; ₹ {prod.price}
                      </p>
                    </b>
  
                    <p id="nmi"> Quantity</p>
                    <input
                      id="vb"
                      type="number"
                      min="1"
                      max="6"
                      value={quanValue}
                      onChange={(e) => setQuanValue(e.target.value)}
                      width="10px"
                    />
                    <div>
                      <button
                        className="nnu1"
                        onClick={() =>
                          handleBuyButtonClick(
                            prod,
                            vendorData,
                            quanValue,
                            userEmail
                          )
                        }
                      >
                        {loadingBuy ? (
                          <LoadingOutlined />
                        ) : (
                          <>
                            <span>Buy Now</span>
                          </>
                        )}
                      </button>
                      <AddressModalFormBuy
                        prod={prod}
                        vendorData={vendorData}
                        quanValue={quanValue}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                      />
                      <button
                        className="nnu2"
                        onClick={() =>
                          handleAddToCart(
                            prod,
                            vendorData,
                            quanValue,
                            userEmail
                          )
                        }
                      >
                        {loading ? <LoadingOutlined /> : "Add to Cart"}
                      </button>
                    </div>
  
                    <div className="seller">
                      <h4 id="nmi1">Seller Information</h4>
  
                      <p className="gy">
                        <b>Name</b> &nbsp; &nbsp;&nbsp; {vendorData?.name}
                      </p>
  
                      <p className="gy">
                        <b>Email</b> &nbsp; &nbsp;&nbsp; {prod.vendorID}
                      </p>
                      <p className="gy">
                        <b>Last Active</b> &nbsp; &nbsp;&nbsp;{" "}
                        {getTime(vendorData?.jointime)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
} 
export default ProductPage