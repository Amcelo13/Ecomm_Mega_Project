import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import CategoryProducts from "../components/CategoryProducts";
import '../components/CategoryProducts.css'
function CategoryPage() {

    const location = useLocation();
    const cateGory = location.state
  return (
    <>
      <Navbar />
      <h1 className="top--selling-heading1">Top Selling {location.state}</h1>
      <div style={{marginTop:'4rem'}}>
        <CategoryProducts cateGory={cateGory}/>
      </div>
    </>
  );
}

export default CategoryPage;
