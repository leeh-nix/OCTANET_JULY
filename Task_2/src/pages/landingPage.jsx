import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Title level={4} align="center">
        Welcome to Todo List
      </Title>
      <Text align="center" style={{ marginBottom: "24px" }}>
        Keep track of your tasks and never forget anything again!
      </Text>
      <Text align="center" style={{ marginBottom: "24px" }}>
        This project is a simple yet powerful Todo List application created with
        the help of Ant Design and Firebase. It allows you to manage and
        organize your tasks efficiently, helping you stay productive and
        focused.
      </Text>
      {/* <Text align="center" style={{ marginBottom: "24px" }}> */}
      <Text align="center" style={{ marginBottom: "24px" }}>
        Features:
      </Text>
      <Text align="center" style={{ marginBottom: "24px" }}>
        Add, edit, and delete tasks easily.
      </Text>
      <Text align="center" style={{ marginBottom: "24px" }}>
        Set priorities to prioritize your tasks.
      </Text>
      <Text align="center" style={{ marginBottom: "24px" }}>
        Mark tasks as completed to track your progress.
      </Text>
      <Text align="center" style={{ marginBottom: "24px" }}>
        User authentication to securely manage your tasks.
      </Text>
      {/* </Text> */}
      <Text align="center" style={{ marginBottom: "24px" }}>
        This project is created by{" "}
        <a
          href="https://github.com/leeh-nix"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nikheel Kumar Sonkar
        </a>
        {" "}with Ant Design and Firebase.
      </Text>
      <div style={{ display: "flex", justifyContent: "center" }}>
      </div>
    </div>
  );
}

export default LandingPage;
