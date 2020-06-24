import React from "react";
import s from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditArticleView from "./routes/editArticle";
import ViewArticleView from "./routes/viewArticle";
import Mainpage from "./pages/index";
import NewTopic from "./pages/new_topic";
import Contest from "./pages/contest/contest";

import topic from "./pages/topic";
import Dashboard from "./routes/dashboard";
import "antd/dist/antd.css";
import { Menu, Layout } from "antd";
import {
  SettingOutlined,
  FileTextOutlined,
  WechatOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Form from './Containers/Form';
import Leaderboard from './components/Leaderboard/Leaderboard';

const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapse] = React.useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Layout style={{ padding: "0 24px 24px" }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className={` ${s.appWrapper} site-layout-background`}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Router>
            <Switch>
              <Route path="/edit">
                <EditArticleView />
              </Route>
              <Route path="/view">
                <ViewArticleView />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/forum" >
                <Mainpage />
              </Route>
              <Route exact path="/new_topic" component={NewTopic} />
              
              <Route exact path="/topic" component={topic} />
              <Route path="/form">
                <Form/>
              </Route>
              <Route path="/leaderboard">
                <Leaderboard/>
              </Route>
              <Route path='/contest'>
                <Contest />
              </Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
