import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import NOM from '../../assets/NoData.png'

function CategoryProducts({ cateGory }) {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();


  //Getting Category Products
  useEffect(() => {
   
    const getProducts = async () => {
      await axios
        .get(`https://ecomm-mega-project.onrender.com/getCategoryProducts/${cateGory}`)
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
  }, [cateGory]);

  //going to product page
  const goToProductPage = (id) => {
    navigate("/productPage", { state: id });
  };
  return (
    <div className="pro--container">
      <div className="prodDiv" id="prof">
        {product.length !==0  ?(
          product.map((prod) => {
            if (prod.stock === true) {
              return (
                <div
                  className="one-prod"
                  key={prod.name}
                  onClick={() => goToProductPage(prod._id)}
                >
                  <img
                    src={prod.images[0]}
                    alt="err"
                    width="95%"
                    id="prodimage"
                  />
                  <div className="info">
                    <h3 style={{ textAlign: "left", paddingLeft: "1rem" }}>
                      {prod.name}
                    </h3>
                    <h4 style={{ color: "gray", paddingRight: "1rem" }}>
                      ₹{prod.price}
                    </h4>
                  </div>
                  <p id="cat">{prod.category}</p>
                </div>
              );
            }
          })
        ):(
          <img src={NOM} alt="No data"  style={{width:'50%', height:"100%", marginLeft:"23%"}}/>

        )
        }
      </div>
    </div>
  );
}

export default CategoryProducts;
