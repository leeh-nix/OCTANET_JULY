import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { loginWithEmailAndPassword } from "../firebase.jsx";

const LoginDialog = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      loginWithEmailAndPassword(email, password);
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
      <Button onClick={() => setVisible(true)} style={{ marginLeft: 8 }}>
        Login
      </Button>
      <Modal
        visible={visible}
        title="Login"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="login" type="primary" onClick={handleLogin}>
            Login
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

export default LoginDialog;
