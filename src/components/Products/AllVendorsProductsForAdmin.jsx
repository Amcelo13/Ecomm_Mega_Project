import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorProducts.css";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import NuData from "../../assets/NoData.png";
import ProductModalForm from "./ProductModalForm";

function VendorProducts({ outOfStockActivator }) {
  const [singleModelProps, setsingleModelProps] = useState(null);
  const [sample, setSample] = useState(false);
  const [product, setProduct] = useState([]);

  // Vendor Specific Products
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("https://ecomm-mega-project.onrender.com/products")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProducts();
    //Animations
    const productElement = document.getElementById("prof");
    productElement.classList.add("enter");
    return () => {
      productElement.classList.remove("enter");
    };
  }, [sample]);

  useEffect(() => {
    // Animations
    const productElement = document.getElementById("prof");
    productElement.classList.add("enter");
    return () => {
      productElement.classList.remove("enter");
    };
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.post("https://ecomm-mega-project.onrender.com/deleteDraft", { id });
      console.log("Draft deleted succcessfully");
      setSample(!sample);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (index) => {
    setsingleModelProps(index);
  };

  return (
    <div className="pro--container">
      <p id="head">All Products</p>
      <div className="prodDiv1" id="prof">
        {product ? (
          product.map((prod, index) => {
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
                      outOfStockActivator={outOfStockActivator}
                      open={true}
                      sample={sample}
                      setSample={setSample}
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
