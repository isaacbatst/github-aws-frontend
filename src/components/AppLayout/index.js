import React from "react";
import { Layout, Menu } from 'antd';
import  { Link } from 'react-router-dom';
import Routes from "../../routes";
import './style.css';

export default function AppLayout() {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/donate">Donate</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Routes />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        GithubAWS - Coding Experience
      </Footer>
    </Layout>
  );
}
