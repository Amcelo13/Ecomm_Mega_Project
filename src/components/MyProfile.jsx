import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button, Image, Spin, InputNumber, message } from "antd";
import "./VendorProducts.css";
import "./MyProfile.css";
import { useSelector } from "react-redux";

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

function MyProfile({ namefromNavigate }) {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Order Status updated",
    });
  };
  const [form] = Form.useForm();
  const [sample, setSample] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.users);

  //Getting the details from Database and updating the form
  useEffect(() => {
    const handleFill = (data) => {
      form.setFieldsValue({
        name: `${!namefromNavigate ? data.name || "" : namefromNavigate || ""}`,
        phone: data?.phone || "",
        email: data?.email || "",
        designation: data.designation,
        profilePic:
          "https://static.vecteezy.com/system/resources/previews/000/390/524/original/modern-company-logo-design-vector.jpg",
      });

      setIsLoading(false);
   
    };

    const getProfileDetails = async (req, res) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/findVendorInfobyuid/${user.uid}`
        );
        handleFill(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileDetails();
  }, []);

  //On Details Updation
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      const response = await axios.post(
        `http://localhost:4000/updateUserInfo/${user.uid}`,
        values
      );
      console.log(response.data);
      setSample(!sample);
    } catch (err) {
      console.log(err);
    }
    success();
  };

  return (
    <>
      {contextHolder}
      <p id="head" className="moin">
        My Profile
      </p>
      <div className="pro--container23">
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
          <Form.Item style={{ marginLeft: "3rem" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <Image
                style={{ marginLeft: "10rem", borderRadius: "50%" }}
                src={form.getFieldValue("profilePic")}
                alt="Profile Picture"
              />
            )}
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
                required: false,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input style={{ width: "500px" }} disabled/>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input style={{ width: "500px" }} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: false,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "500px ",
              }}
              maxLength={13}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            tooltip="What do you want others to call you?"
            rules={[
              {
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input
              style={{ width: "500px" }}
              placeholder="Enter the password you want to set make sure to remember it"
            />
          </Form.Item>

          <Form.Item
            name="designation"
            label="Designation"
            tooltip="What do you want others to call you?"
            rules={[
              {
                message: "Please input your designation!",
                whitespace: true,
              },
            ]}
          >
            <Input disabled style={{ width: "500px" }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#2e2e2e", 
                outline: "none",
                border: "none",
              }}
            >
              Update Details
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default MyProfile;
