import React from "react";
import { Layout } from "antd";
import Sider from "./components/Sider";
import Konva from "./components/Konva";

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Konva />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
