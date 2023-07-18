import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import VerifyOTP from "./VerifyOTP";
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
function Mobile({value3}) {
  const navigate = useNavigate();

  const [fullPhoneNumber, setFullPhoneNumber] = useState();
  const [fullOTP, setFullOTP] = useState("");

  const [expandForm, setExpandForm] = useState(false);
  const [isloading, setloading] = useState(false);
  const [name, setName] = useState('');
  const [err, setErr] = useState("");
    const [form] = Form.useForm();
  const handlePhone = (value) => {
    setFullPhoneNumber(`+91${value}`);

  };


  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  };

  //Send OTP Function to mobile
  const onFinish = (values) => {
    setExpandForm(true);
    generateRecaptcha();

    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  //Verify OTP and navigating API hit also

  return (
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
        <Input value={name}
        onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" style={{ padding: ".6rem" }} />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          {
            pattern: /^\d{0,10}$/,
            message:
              "Please enter a valid numeric phone number with maximum 10 digits.",
          },
        ]}
      >
        <Input
          value={fullPhoneNumber}
          onChange={(e) => handlePhone(e.target.value)}
          placeholder="Enter your phone number"
          style={{ padding: ".6rem" }}
        />
      </Form.Item>

      <div id="recaptcha-container"></div>

      <p style={{ color: "red", paddingLeft: "1rem", fontWeight: "600" }}>
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
     
        {expandForm === false ? (
          <>
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
                Request OTP
              </Button>
            </Form.Item>
          </>
        ) : null}
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
    <VerifyOTP  expandForm={expandForm}  name={name} value3 = {value3}
    fullPhoneNumber={fullPhoneNumber}setExpandForm={setExpandForm}/>

  </>);
}

export default Mobile;
