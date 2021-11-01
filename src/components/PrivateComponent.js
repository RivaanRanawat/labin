import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectUserName } from "../features/user/userSlice";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userName = useSelector(selectUserName);
  console.log("this is suername" + userName);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userName ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
