import React from "react";
import {Redirect, Route} from "react-router-dom";

export function PrivateRoute({
                               component: Component,
                               layout: Layout,
                               ...rest
                             }) {
  return (
    <Route
      {...rest}
      render={({props}) =>
        localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME) ? (
          <Layout>
            <Component {...props}/>
          </Layout>
        ) : (
          <Redirect to={"/login"}/>
        )
      }
    />
  );
}

export function AppRoute({component: Component, layout: Layout, ...rest}) {
  return (
    <Route
    {...rest}
  render={(props) => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )}
  />);
}
