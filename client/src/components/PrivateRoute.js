import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { verifyToken } from "../api/index";

const Loading = 'loading';
const LoggedOut = 'loggedout';
const LoggedIn = 'loggedIn';

const PrivateRoute = (props) => {
  const [authenticated, setAuthenticated] = useState(Loading);

  useEffect(() => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined,
      token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : undefined;

    if (!user || !token) {
      setAuthenticated(LoggedOut);
    } else {
      verifyToken({ user, token })
        .then(() => {
          // TODO handel permission for admin role ===>props.role=='admin'
          // TODO check the response and then if it is  ok set state
          if (typeof props.onLogin === "function") props.onLogin(5);

          if (props.role)
            if (user.role === props.role) setAuthenticated(LoggedIn);
            else setAuthenticated(LoggedOut);
          else setAuthenticated(LoggedIn);
        })
        .catch((error) => {
          console.log(error);
          setAuthenticated(LoggedOut);
        });
    }
  }, [props]);

  if (authenticated === LoggedOut) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  } else if (authenticated === LoggedIn) return <Route {...props} />;

  // Loading
  return <div />;
};

export default PrivateRoute;
