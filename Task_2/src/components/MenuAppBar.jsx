import React from "react";
import { Layout, Button, Typography } from "antd";
import { LogoutOutlined, BulbOutlined } from "@ant-design/icons";
import RegisterDialog from "./registerDialog";
import LoginDialog from "./loginDialog";
import { logout } from "../firebase";
import { Box } from "@mui/material";

const { Header } = Layout;
const { Text } = Typography;

function MyAppBar({ isLoggedIn, user }) {
  return (
    <Header
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Text style={{ paddingRight: "3em", color: "white", marginRight: "auto" }}>
        {user?.email || "Todo App"}
      </Text>

      {!isLoggedIn ? (
        <>
          <RegisterDialog />
          <LoginDialog />
        </>
      ) : (
        <Button type="primary" onClick={logout} icon={<LogoutOutlined />}>
          Logout
        </Button>
      )}
    </Header>
  );
}

export default MyAppBar;
