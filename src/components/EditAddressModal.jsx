import React, { useState ,useEffect} from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "axios";
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

const EditAddressModal = ({setSample,sample, open, setOpen, selectedAddress, setSelectedAddress ,userEmail,selectedAddressId }) => {
  const [form] = Form.useForm();


//Edit Form Prepopulaion
  useEffect(() => {

    console.log(selectedAddressId)
    if (selectedAddress) {
      form.setFieldsValue({
        aname: selectedAddress.aname,
        hno: selectedAddress.hno,
        street: selectedAddress.street,
        landmark: selectedAddress.landmark,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        phone: selectedAddress.phone,
      });
    }
  }, [selectedAddress, form]); 

  const handleClose = () => {
    setOpen(false);
    setSelectedAddress(null);
  };

  const onFinish = async(values) => {
    const obn = {
        addressData: values,
        email: userEmail,
      };
    try {
        await axios.post(`http://localhost:4000/updateAddress/${selectedAddressId}`, obn);
        setSample(!sample)
      } catch (err) {
        console.log(err);
      }
    handleClose()
  };
  return (
    <>
      <Modal
        title="Edit Address"
        centered
        open={open}
        onOk={handleClose}
        onCancel={handleClose}
        width={500}
        footer={null}
      >
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
        label="Name"
        name="aname"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="House No."
        name="hno"
        rules={[
          {
            required: true,
            message: 'Please input your house number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Street"
        name="street"
        rules={[
          {
            required: true,
            message: 'Please input the street!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Landmark"
        name="landmark"
        rules={[
          {
            required: true,
            message: 'Please input the landmark!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input the city!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please input the state!',
          },
        ]}
      >
        <Input maxLength={6} />
      </Form.Item>
      <Form.Item
        label="Pincode"
        name="pincode"
        rules={[
          {
            required: true,
            message: 'Please input the pincode!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input maxLength={12} />
      </Form.Item>
      <Form.Item>
    <Button type="primary" htmlType="submit" style={{backgroundColor:'black', marginLeft:'9.5rem'}}>
          Edit Address
        </Button>
      </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditAddressModal;
