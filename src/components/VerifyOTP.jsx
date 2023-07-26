import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setLogin } from "../app/features/Users/templateSlice";

function VerifyOTP({ name, expandForm, setExpandForm, fullPhoneNumber, value3,}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fullOTP, setFullOTP] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleOTP = (value) => {
    setFullOTP(value);
  };

  const submitOTP = (e) => {
    e.preventDefault();

    setIsLoading(true); // Set isLoading to true when OTP submission starts

    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(fullOTP).then(async (result) => {
   
        const obn = {
          name: name,
          designation: value3,
          uid: fullPhoneNumber,
          phone: fullPhoneNumber,
          jointime: new Date(),
        };
        // User signed in successfully.
        const user = result.user;
        await axios
          .post("http://localhost:4000/phones", obn)
          .then((response) => {
            dispatch(setLogin(obn));
            console.log(response.status);
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error);
        setErr("Wrong OTP");
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when OTP submission completes (either success or failure)
        setErr("");
        setExpandForm(false);
      });
  };

  return (
    <>
      {expandForm === true ? (
        <div
          style={{
            marginBottom: "1rem",
            width: "20rem",
            marginLeft: "15rem",
          }}
        >
          <form action="" onSubmit={submitOTP}>
            <input
              value={fullOTP}
              onChange={(e) => handleOTP(e.target.value)}
              placeholder="Enter your OTP"
              style={{
                padding: ".6rem",
                outline: "none",
                border: "1px solid darkgray",
                width: "10rem",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            />
            <button
              type="submit"
              disabled={isLoading} // Disable the button when isLoading is true
              style={{
                backgroundColor: "#2e2d2d",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: ".8rem",
                borderRadius: ".6rem",
                marginTop: "2rem",
                fontWeight: "600",
              }}
            >
              {isLoading ? (
                <LoadingOutlined style={{ marginRight: "0.5rem" }} />
              ) : (
                "Submit OTP"
              )}
            </button>
            <p style={{ color: "red" }}>{err}</p>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default VerifyOTP;
