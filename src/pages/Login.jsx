import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Radio, Button, Form, Input, Modal } from "antd";
import GOG from "../assets/google.svg";
import "./Signup.css";
import { LoadingOutlined } from "@ant-design/icons";
//redux

import { useDispatch } from "react-redux";
import { setLogin } from "../app/features/Users/templateSlice";
import axios from "axios";
import { auth, googleProvider } from "../config/firebase";
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
function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [value3, setValue3] = useState("");
  const [form] = Form.useForm();
  const state = useLocation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onChange3 = ({ target: { value } }) => {
    setValue3(value);
    setIsButtonDisabled(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  //GETTING THE USERS
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

  const onFinish = async (values) => {
    setloading(true);
    try {
      const ob = {
        email: values.email,
        password: values.password,
      };
      await axios
        .post("https://ecomm-mega-project.onrender.com/login", ob)
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              setLogin({
                name: response.data.name,
                email: response.data.email,
                password: response.data.password,
                designation: response.data.designation,
                jointime: new Date(),
                uid: response.data.uid,
              })
            );
            navigate("/", { state: state?.state });
          } else if (response.status === 204) {
            setErr(response.statusText);
          } else {
            setErr(response.statusText);
          }
          setloading(false);
        })
        .catch((err) => {
          setErr("Password is wrong");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const data = res._tokenResponse;
      const pass = res.user.uid;

      const email = res.user.email;
      const jointime = new Date();

      const obn = {
        email: email,
        jointime: jointime,
      };

      await axios
        .post("https://ecomm-mega-project.onrender.com/goomglepostlogin", obn)
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              setLogin({
                name: data.displayName,
                email: response.data.email,
                password: response.data.password,
                designation: response.data.designation,
                jointime: new Date(),
                uid: response.data.uid,
              })
            );
            navigate("/");
          } 
          
          else if(response.status === 204){
            setErr('You are unauthorized by the Admin')
          }
          else {
            setIsModalOpen(true);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const uid = res.user.uid;
      const data = res._tokenResponse;
      const pass = res.user.uid;

      const obn = {
        name: data.displayName,
        email: data.email,
        password: pass,
        designation: value3,
        jointime: new Date(),
        uid: uid,
      };

      await axios.post("https://ecomm-mega-project.onrender.com/goomglepost", obn).then((res) => {
        if (res.status === 200) {
          navigate("/");
          dispatch(setLogin(obn));
        }
        
      });
    } catch (err) {
      console.log(err);
    }
  };
  //going to signup page
  const gotosignup = () => {
    navigate("/signup");
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
            paddingTop: "15rem",
            paddingLeft: "-10rem",
            paddingBottom: "1.5rem",
          }}
        >
          Log In
        </h1>
        <button
          style={{
            padding: "1.3rem",
            border: "none",
            background: "#fff",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            cursor: "pointer",
            borderRadius: "1rem",
            marginBottom: "3rem",
          }}
          onClick={signInWithGoogle}
        >
          {" "}
          <img
            src={GOG}
            width="20px"
            style={{ marginTop: "-1rem", marginBottom: "-.35rem" }}
            alt=""
          />{" "}
          Continue with google{" "}
        </button>
        <Modal
          title="New User select your role"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          style={{ paddingTop: "10rem" }}
        >
          <div className="rad11">
            <Radio.Group
              options={options}
              onChange={onChange3}
              value={value3}
              optionType="button"
              buttonStyle="solid"
              className="custom-radio-group"
            />
          </div>
          <div className="vb">
            <button
              style={{
                padding: "1.3rem",
                border: "none",
                background: "#fff",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                cursor: "pointer",
                borderRadius: "1rem",
                marginBottom: "3rem",
              }}
              onClick={signUpWithGoogle}
              disabled={isButtonDisabled}
            >
              {" "}
              <img
                src={GOG}
                width="20px"
                style={{ marginTop: "-1rem", marginBottom: "-.35rem" }}
                alt=""
              />{" "}
              Continue with google{" "}
            </button>
          </div>
        </Modal>
        <div className="yolu" id="yright" style={{ paddingLeft: "12rem" }}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
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
            <p style={{ color: "red", marginLeft: "12rem", fontWeight: "700" ,fontSize:"1.4rem",
          marginBottom:"1.7rem"}}>
              {err}
            </p>{" "} 
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
                  Login
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
          <p style={{ marginTop: "-3rem", paddingLeft: "6rem" }}>
            New here{" "}
            <span
              style={{
                color: "#578aff",
                fontWeight: "500",
                paddingLeft: ".6rem",
                cursor: "pointer",
              }}
              onClick={gotosignup}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
