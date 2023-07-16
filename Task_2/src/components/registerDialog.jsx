import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { registerWithEmailAndPassword } from "../firebase.jsx";

const RegisterDialog = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      registerWithEmailAndPassword(email, password);
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: 8 }}
        onClick={() => setVisible(true)}
      >
        Register
      </Button>
      <Modal
        visible={visible}
        title="Register"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="register" type="primary" onClick={handleRegister}>
            Register
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterDialog;
