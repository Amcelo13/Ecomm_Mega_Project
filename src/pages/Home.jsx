import React from "react";
import Navbar from "../components/Navbar";
import Navbar1 from "../components/Navbar1";
import "../components/Products.css";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { Carousel } from "antd";
import "./Home.css";

function Home() {
  const location = useLocation();

  const scrollDown = () => {
    const scrollAmount = 230 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({
      top: window.scrollY + scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar name={location?.state} />

      <Carousel autoplay style={{ width: "100%", cursor: "pointer" }}>
        <div>
          <video
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/NWKWFFzruO_HD.mp4"
            muted
            autoPlay
            loop
          ></video>{" "}
        </div>

        <div>
          <img
            style={{ borderRadius: "2rem", width: "100%", height: "100vh" }}
            src="https://images.pexels.com/photos/8553173/pexels-photo-8553173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </Carousel>

      <div style={{ marginTop: "-1rem" }}>
        <video
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/n5memKLbF0_HD.mp4"
          muted
          autoPlay
          loop
        ></video>{" "}
      </div>

      <h1 className="top--selling-heading">Top Selling Products</h1>
      <Products />

      <button id="proda" onClick={scrollDown}>
        Discover Collection
      </button>
    </>
  );
}

export default Home;
