import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, Checkbox } from "antd";
import Mobile from "../components/Mobile";
import "./Signup.css";
import GOG from "../assets/google.svg";
import { LoadingOutlined } from "@ant-design/icons";

//redux
import { useDispatch } from "react-redux";
import { setLogin } from "../app/features/templateSlice";
import axios from "axios";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

import LOG from "../assets/LOG.svg";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const options = [
  {
    label: "Vendor",
    value: "Vendor",
  },
  {
    label: "Customer",
    value: "Customer",
  },
];
function Signup() {
  const navigate = useNavigate();
  const [isloading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value3, setValue3] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isMobileSign, setIsMobileSign] = useState(false);

  const onChange3 = ({ target: { value } }) => {
    setValue3(value);
    setIsButtonDisabled(false);
  };

  //Animatins
  useEffect(() => {
    const logoElement = document.getElementById("LOMG");
    const headfElement = document.getElementById("h1style");
    const rightElement = document.getElementById("yright");
    headfElement.classList.add("enter");
    logoElement.classList.add("enter");
    rightElement.classList.add("enter");
    return () => {
      logoElement.classList.remove("enter");
      headfElement.classList.remove("enter");
      rightElement.classList.remove("enter");
    };
  }, []);

  //On Sign UP of the form
  const onFinish = async (values) => {
    setloading(true);
    const obn = {
      name: values.name,
      email: values.email,
      password: values.password,
      designation: value3,
      jointime: new Date(),
      uid: values.password, 
    
    }; 

    try {
      await axios.post("http://localhost:4000/signup", obn).then((res) => {
        if (res.status === 200 ) {
          navigate("/login", { state: values.name });
        } else {
          setErr("User Already found Please Log In");
        }
        setloading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Continuing with google
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const data = res._tokenResponse;
      const pass = res.user.uid;

      const obn = {
        name: data.displayName,
        email: data.email,
        password: pass,
        designation: value3,
        jointime: new Date(),
        uid: pass,
        
      };

      await axios.post("http://localhost:4000/goomglepost", obn).then((res) => {
        if (res.status === 200) {
          navigate("/");
          dispatch(
            setLogin({
              email: data.email,
              name: data.displayName,
              password: pass,
              designation: value3,
              jointime: new Date(),
              uid: pass,
            })
          );  
        }

      else if(res.status === 204) {
        setErr('You are unauthorized by the Admin')
      }

      });
    } catch (err) {
      console.log(err);
    }
  };

  //going to login
  const gotologin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="left">
        <img src={LOG} alt="" id="LOMG" className="logo" />
        <h1 id="h1style" className="headf">
          Evolve
        </h1>
      </div>
      <div
        className="right"
        style={{
          height: "auto", // paddingTop: "1rem",
        }}
      >
        <h1
          style={{
            paddingTop: "10rem",
            paddingLeft: "5rem",
            paddingBottom: "1.5rem",
          }}
        >
          Sign up
        </h1>
        <button
          style={{
            padding: "1.3rem",
            border: "none",
            background: "#fff",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            cursor: "pointer",
            borderRadius: "1rem",
            marginLeft: "5rem",
            marginBottom: "2rem",
          }}
          onClick={signInWithGoogle}
          disabled={isButtonDisabled}
        >
          {" "}
          <img
            src={GOG}
            width="20px"
            style={{ marginTop: "-1rem", marginBottom: "-.35rem" }}
            alt=""
          />{" "}
          Continue with Google{" "}
        </button>

        <div className="yolu" id="yright" style={{ paddingLeft: "12rem" }}>
          <p id="aler">
            {" "}
            {isButtonDisabled
              ? "Select a role below first before continuing "
              : ""}
          </p>

          <div className="rad">
            <Radio.Group
              options={options}
              onChange={onChange3}
              value={value3}
              optionType="button"
              buttonStyle="solid"
              className="custom-radio-group"
            />
            <span style={{ marginLeft: "2rem" }}>
              {" "}
              <Checkbox
                className="rff"
                onChange={(e) => setIsMobileSign(e.target.checked)}
                value={isMobileSign}
              >
                <p id="bg">Login With Mobile</p>
              </Checkbox>
            </span>
          </div>
          {!isMobileSign ? (
            <>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="name"
                  label="Name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your name"
                    style={{ padding: ".6rem" }}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    style={{ padding: ".6rem" }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Enter your password"
                    style={{ padding: ".6rem" }}
                  />
                </Form.Item>
                <p
                  style={{
                    color: "red",
                    paddingLeft: "13rem",
                    fontWeight: "700",
                    fontSize:'1.5rem',  
                    marginBottom:'1rem'
                  }}
                >
                  {err}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "10rem",
                    paddingLeft: "11rem",
                  }}
                >
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#2e2d2d",
                        border: "none",
                        fontWeight: "600",
                      }}
                    >
                      Register
                    </Button>
                  </Form.Item>

                  {isloading ? (
                    <p style={{ marginTop: "0.2rem" }}>
                      {" "}
                      <LoadingOutlined />
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Form>

              <p style={{ marginTop: "-3rem", paddingLeft: "5rem" }}>
                Already In Use{" "}
                <span
                  style={{
                    color: "#578aff",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={gotologin}
                >
                  Log In
                </span>
              </p>
            </>
          ) : (
            <Mobile value3={value3} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
