import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import "./App.css";
import "./assets/css/main.css";
import "./components/FontAwesomeIcons/index";
import "./components/_init";
import Login from "./views/Sign/Login/login";
import Home from "./views/Home/home";
import Logout from "./views/Sign/Logout/logout";
import Register from "./views/Sign/Register/register";
import Profile from "./views/User/Profile/profile";
import ChangePassword from "./views/User/ChangePassword/index";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// layouts
import UserLayout from "./layouts/User/user-layout";
import SignLayout from "./layouts/Sign/sign-layout";

// pages
import Encounter from "./views/Encounters/index";
import Message from "./views/Messages/index";
import Friend from "./views/Friends/index";
import Restaurant from "./views/Restaurants/index";
import Group from "./views/Groups/index";
import { PrivateRoute } from './utils/RouteUtils';

import LocationContext from './context/LocationContext'
import MatchContext from './context/MatchContext'
import VideoCall from "./components/VideoCall/VideoCall";

dotenv.config();

// define route
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

function App() {
  const [response, setResponse] =  useState("");
  console.log("App render")


  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact layout={UserLayout} component={Home} />
        <PrivateRoute
          path="/encounters"
          layout={UserLayout}
          component={Encounter}
        />
        <PrivateRoute
          path="/messages/"
          layout={UserLayout}
          component={Message}
        />
        <PrivateRoute
          path="/video-call"
          layout={UserLayout}
          component={VideoCall}
        />
        <PrivateRoute path="/friends" layout={UserLayout} component={Friend} />
        <PrivateRoute path="/groups" exact layout={UserLayout} component={Group} />
        <PrivateRoute
          path="/restaurants"
          layout={UserLayout}
          component={Restaurant}
        />

        <PrivateRoute
          path="/user/change-password"
          layout={UserLayout}
          component={ChangePassword}
        />
        <PrivateRoute
          path="/user/profile"
          layout={UserLayout}
          component={Profile}
        />
        <AppRoute path="/login" layout={SignLayout} component={Login} />
        <PrivateRoute path="/logout" layout={SignLayout} component={Logout} />
        <AppRoute path="/register" layout={SignLayout} component={Register} />
      </Switch>
    </Router>

  );
}

export default App;
