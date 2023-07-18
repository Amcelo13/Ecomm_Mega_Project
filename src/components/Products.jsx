import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import NOM from "../assets/NoData.png"
function Products() {
  const [product, setProduct] = useState([]);
  const [bestproduct, setBestProduct] = useState([]);
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

    //Best products /top selling
    const getBestProducts = async () => {
      await axios.get("http://localhost:4000/bestproducts").then((response) => {
        setBestProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getBestProducts();


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
        {bestproduct.length !==0 ?(
          bestproduct.map((prod) => {
            if(prod.stock === true) {
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
        })
        ):(<>
          <img src={NOM} alt="No data"  style={{width:'50%', height:"100%", marginLeft:"23%"}}/>
          </>)
        }
      </div>

      <h1 style={{margin:'4rem', marginTop:"4rem" }}>All Products</h1>

      <div className="prodDiv" id="prof">
        {product.length !==0 ?(
          product.map((prod) => {
            if(prod.stock === true) {
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
        })
        ):(<>
          <img src={NOM} alt="No data"  style={{width:'50%', height:"100%", marginLeft:"23%"}}/>
          </>)
        }
      </div>
    </div>
  );
}

export default Products;
