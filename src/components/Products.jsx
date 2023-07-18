import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";

function Products() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("http://localhost:4000/products")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getProducts();
    //Animations
      const productElement = document.getElementById("prof")
      productElement.classList.add('enter')
      return ()=>{
        productElement.classList.remove('enter')
        

      }
  }, []);
  

  //going to product page
  const goToProductPage = (id) => {
    navigate('/productPage', {state:id})
  }
  
  return (
    <div className="pro--container">
    
      <div className="prodDiv" id="prof">
        {product &&
          product.map((prod) => {
              if(prod.stock === 1){
                return (
                  <div className="one-prod" key={prod.name}  onClick={()=>goToProductPage(prod._id)}>
                    <img
                      src={prod.prodImage}
                      alt="err"
                      width="95%"
                      id="prodimage"
                    />
                    <div className="info">
                      <h3 style={{ textAlign: "left", paddingLeft:'1.5rem' }}>{prod.name}</h3>
                      <h4 style={{ color: "gray", paddingRight:'1.3rem' }}>₹{prod.price}</h4>
                    </div>
                    <p id="cat">{prod.category}</p>
                  </div>
                );  
              }
          })}
      </div>
    </div>
  );
}

export default Products;
