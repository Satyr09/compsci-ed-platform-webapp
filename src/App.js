import React, { useEffect } from "react";
import s from "./App.module.css";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, withRouter } from "react-router-dom";
import EditArticleView from "./routes/editArticle";
import ViewArticleView from "./routes/viewArticle";
import Mainpage from "./pages/index";
import NewTopic from "./pages/new_topic";
import Contest from "./pages/contest/contest";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp"
import SideBar from "./SideBar";
import ProtectedRoute from "./ProtectedRoute";
import Header from './Containers/Header';


import topic from "./pages/topic";
import Dashboard from "./routes/dashboard";
import MyStudyPlans from "./routes/mystudyplans";
import StudyPlan from "./routes/studyplan";
import "antd/dist/antd.css";
import { Menu, Layout } from "antd";
import Leaderboard from './components/Leaderboard/Leaderboard';

const { Content, Sider } = Layout;

export const AuthContext = React.createContext(null);

function App() {

  const [authData, setAuthData] = React.useState({ isLoading: true });

  const history = useHistory();

  const [user,setUser] = React.useState("");

  const loginHandler = (data) => {
    console.log("Setting", data);
    setAuthData({ accessToken: data.accessToken, user: data.user });
    window.location.reload(true);
  }
  function getCookie(name) {
    var cookies = '; ' + document.cookie;
    var splitCookie = cookies.split('; ' + name + '=');
    if (splitCookie.length == 2) return splitCookie.pop();
  }
  function deleteCookie(name) {
    console.log("Hello");
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload(true);
  };
  useEffect(() => {
    if (getCookie("refreshToken")) {
      if (!authData || !authData.accessToken) {
        setAuthData({ ...authData, isLoading: true })
        fetch("http://localhost:5000/auth/refresh/", {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            if (data && data.accessToken && data.user) {
              setAuthData({
                accessToken: data.accessToken, user: data.user, isLoading: false
              })
              setUser(data.user.firstName);
            }
          })
          .catch(e => {
            setAuthData({ isLoading: false })
          })
      }
    }else{
      setAuthData({...authData,isLoading:false})
    }
  }, [])


  return (
    <AuthContext.Provider value={authData}>
      <Layout style={{ minHeight: "100vh" }}>
        {authData && authData.user && <SideBar />}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className={` ${s.appWrapper} site-layout-background`}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Header userData={user} logoutHandler={deleteCookie}/>
            <Router>
              <Switch>
                <ProtectedRoute path="/edit" component={EditArticleView} />
                <ProtectedRoute path="/view" component={ViewArticleView} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/forum" component={Mainpage} />
                <ProtectedRoute exact path="/new_topic" component={NewTopic} />
                <ProtectedRoute path="/leaderboard" component={Leaderboard} />
                <ProtectedRoute path='/contest' component={Contest} />
                <ProtectedRoute path="/mystudyplans" component={MyStudyPlans}/>
                <ProtectedRoute path="/studyplan" component = {StudyPlan} />

                <Route exact path="/topic" component={topic} />
                <Route path='/signin' render={(props) => <SignIn loginHandler={loginHandler} {...props} />} />
                <Route path='/signup' component={SignUp} />
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    </AuthContext.Provider>

  );
}

export default (App);
