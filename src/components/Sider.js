import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const App = () => {
  return (
    <Sider>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
        <Menu.Item key="1">Opção 1</Menu.Item>
        <Menu.Item key="2">Opção 2</Menu.Item>
        <Menu.Item key="3">Opção 3</Menu.Item>
        <Menu.Item key="4">Opção 4</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default App;
