import React ,{useEffect}from "react";
import Navbar from "../components/Navbar";
import '../components/Products.css'
import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { Carousel } from 'antd';
import Cover  from '../assets/cover.jpg'
import Cover3  from '../assets/cover3.jpg'
import { useSelector } from "react-redux";
const contentStyle = {
  height: '70vh',
  marginTop: '4rem',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
function Home() {
  const location = useLocation()
  return (
    <>
    <Navbar name = {location?.state} />

      <Carousel autoplay style={{width:'100%', cursor:'pointer' }}>
      <div>
        <img style={{borderRadius:'2rem'}} width='100%' height='700px' src='https://images.pexels.com/photos/3806753/pexels-photo-3806753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
      </div>
      <div>
      <img style={{borderRadius:'2rem'}} width='100%' height='700px' src={Cover3} />
      </div>
      <div>
      <img style={{borderRadius:'2rem'}} width='100%' height='700px' src='https://images.pexels.com/photos/8553173/pexels-photo-8553173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ' />
      </div>
      <div>
      <img style={{borderRadius:'2rem'}} width='100%' height='700px' src='https://images.pexels.com/photos/8553173/pexels-photo-8553173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ' />
      </div>
    </Carousel>
      <h1 className="top--selling-heading">Top Selling Products</h1>
      <Products />
    </>
  );
}

export default Home;
