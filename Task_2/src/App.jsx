import { useState, useEffect } from "react";
import { Layout, Spin, Button, ConfigProvider, theme } from "antd";
import LandingPage from "./pages/landingPage";
import TodoListPage from "./pages/todoListPage";
import MenuAppBar from "./components/MenuAppBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CssBaseline } from "@mui/material";

const { Header, Content } = Layout;

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setisLoggedIn(!!user);
      setIsLoading(false);
      setUser(user);
      console.log(user);
    });

    return () => unsubscribe();
  }, []);

  return (
      <ConfigProvider
    theme={{
        algorithm: theme.darkAlgorithm,
      }}>
    <Layout style={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Header className="header">
        <MenuAppBar
          // onThemeChange={handleThemeChange}
          // isDark={darkMode}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      </Header>
      <Content className="content">
        {isLoading ? (
          <div className="loading-spinner">
              <Spin size="large" />
          </div>
        ) : (
          isLoggedIn ? <TodoListPage user={user} /> : <LandingPage />
        )}
      </Content>
      </Layout>
      </ConfigProvider>
  );
}

export default App;
