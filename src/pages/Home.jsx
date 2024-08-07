import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { LoadingOutlined } from "@ant-design/icons";
import "../components/Products/Products.css";
import { useLocation } from "react-router-dom";
import Products from "../components/Products/Products";
import { Carousel } from "antd";
import "./Home.css";
import { useSelector } from "react-redux";

function Home() {

  const location = useLocation();
  const [sample, setSample] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users)
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(loadingTimer);
  }, []);


  //Scroll down on click
  const scrollDown = () => {
    const scrollAmount = 120.9 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({
      top: window.scrollY + scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar name={location?.state} />
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "105vh",
          }}
        >
          <LoadingOutlined style={{ fontSize: "2rem", color: "black" }} />
        </div>
      ) : (
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
              alt='img'
              style={{ borderRadius: "2rem", width: "100%", height: "100vh" }}
              src="https://static.zara.net/assets/public/4b22/e65e/e7664078934c/f2134c33398c/image-landscape-fill-74599ce6-bf87-45d7-85f5-61957d76cb5a-default_0.jpg?ts=1720177239504&w=1260"
            />
          </div>
        </Carousel>
      )}

      <div style={{ marginTop: "-1rem" }}>
        <video
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/n5memKLbF0_HD.mp4"
          muted
          autoPlay
          loop
        ></video>{" "}
      </div>


      <Products sample={sample} setSample={setSample} />

      <button id="proda" onClick={scrollDown}>
        Explore More with Us
      </button>
    </>
  );
}

export default Home;
