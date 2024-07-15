import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorProducts.css";
import { useSelector } from "react-redux";
import {  DeleteOutlined } from "@ant-design/icons/lib/icons";
import ProductModalForm from "./ProductModalForm";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { getVendorProducts } from "../../services/getVendorProducts";

function VendorProducts({outOfStockActivator}) {
  const vendEmail = useSelector((state) => state.users.users.email);
  const [products, setProducts] = useState([]);
  const [singleModelProps, setsingleModelProps] = useState(null);
  const [sample, setSample] = useState(false);

  const handleDelete = async (id) => {
    
    try {
      await axios.post("https://ecomm-mega-project.onrender.com/deleteDraft", { id });
      console.log("Draft deleted SUCCESSFUL");
    } catch (error) {
      console.log(error);
    }
    setSample(!sample)
  };

  // Vendor Specific Products
  useEffect(() => {
    const getProducts = getVendorProducts(vendEmail);
    getProducts.then((res) => {
      setProducts(res);
    }).catch((err)=>{
      console.log(err)
    })

    // Animations
    const productElement = document.getElementById("prof");
    productElement.classList.add("enter");
    return () => {
      productElement.classList.remove("enter");
    };
  }, [sample]);

  const handleEdit = (index) => {
    setsingleModelProps(index);
  };

  return (

    <div className="pro--container">
      <p id="head">My Drafts</p>
      <div className="prodDiv1" id="prof">
        {products.length !==0 &&      products.map((prod, index) => {
          if (prod.isDraft === true) {
            return (
              <div className="one-prod1" key={prod.name}>
                <img
                  src={prod.images[0]}
                  alt="err"
                  width="95%"
                  id="prodimage1"
                />
                <div className="info">
                <h3 style={{ textAlign: "left", paddingLeft:'1.5rem' }}>{prod.name}</h3>
                <h4 style={{ color: "gray" ,  paddingRight:'1rem'}}>₹{prod.price}</h4>
                </div>
                <p id="cat">{prod.category}</p>
                <ModeEditOutlineOutlinedIcon
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
                  sample = {sample}
                  setSample =  {setSample}
                  outOfStockActivator= {outOfStockActivator}
                    open={true}
                    setOpen={() => setsingleModelProps(null)}
                    formValues={prod}
                  />
                )}
                <DeleteOutlined
                  onClick={() => handleDelete(prod._id)}
                  className="qp"
                  style={{ fontSize: "2rem", color: "red", paddingTop: "1rem" }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
    
  );
}

export default VendorProducts;
