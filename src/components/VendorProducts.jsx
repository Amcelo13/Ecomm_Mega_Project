import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorProducts.css";
import { useSelector } from "react-redux";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import NuData from "../assets/NoData.png";
import ProductModalForm from "./ProductModalForm";

function VendorProducts({outOfStockActivator}) {
  const vendEmail = useSelector((state) => state.users.email);
  const [products, setProducts] = useState([]);
  const [singleModelProps, setsingleModelProps] = useState(null);
  const [sample, setSample] = useState(false);

  
  // Vendor Specific Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${vendEmail}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();

  }, [sample]);

  useEffect(() => { 
    // Animations
    const productElement = document.getElementById("prof");
    productElement.classList.add("enter");
    return () => {
      productElement.classList.remove("enter");
    };
  },[])
  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:4000/deleteDraft", { id });
      console.log("Draft deleted succcessfully");
      setSample(!sample)
    } catch (error) {
      console.log(error);
    }
  
  };
  const handleEdit = (index) => {
    setsingleModelProps(index);
  };

  return (
    <div className="pro--container">
      <p id="head">My Products</p>
      <div className="prodDiv1" id="prof">
        {products ? (
          products.map((prod, index) => {
            if (prod.isDraft === false) {
              return (
                <div className="one-prod1" key={prod.name}>
                  <img
                    src={prod.prodImage}
                    alt="err"
                    width="95%"
                    id="prodimage1"
                  />
                  <div className="info">
                    <h3 style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
                      {prod.name}
                    </h3>
                    <h4 style={{ color: "gray", paddingRight: "1rem" }}>
                      ₹{prod.price}
                    </h4>
                  </div>
                  <p id="cat">{prod.category}</p>
                  <EyeOutlined
                    onClick={() => handleEdit(index)}
                    className="qp"
                    style={{
                      fontSize: "2rem",
                      marginRight: "2rem",
                      paddingTop: "1rem",
                    }}
                  />

                  {/*Opening the Modal*/}
                  {singleModelProps === index && (
                    <ProductModalForm
                    outOfStockActivator ={outOfStockActivator}
                      open={true}
                      setOpen={() => setsingleModelProps(null)} //means if the setsingleModelProps is null then the modal closes
                      formValues={prod}
                    />
                  )}
                  <DeleteOutlined
                    onClick={() => handleDelete(prod._id)}
                    className="qp"
                    style={{
                      fontSize: "2rem",
                      color: "red",
                      paddingTop: "1rem",
                    }}
                  />
                </div>
              );
            }
            return null;
          })
        ) : (
          <img src={NuData} alt="No data" />
        )}
      </div>
    </div>
  );
}

export default VendorProducts;
