import React from "react";
import { Menu, Layout } from "antd";
import {
  SettingOutlined,
  FileTextOutlined,
  WechatOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;


function SideBar(){
    const [collapsed, setCollapse] = React.useState(false);

    return (
        <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={state => setCollapse(state)}
        width={200}
        className="site-layout-background"
      >
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <HomeOutlined />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <FileTextOutlined />
            <span>Articles</span>
          </Menu.Item>
          <Menu.Item key="3">
            <WechatOutlined />
            <span>Discuss</span>
          </Menu.Item>
          <Menu.Item key="4">
            <SettingOutlined />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="5">
            <UserOutlined />
            <span>Profile</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
}
export default SideBar;