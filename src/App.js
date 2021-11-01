import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Explore from "./components/Explore";
import db from "./firebase";
import React, { useEffect } from "react";
import AllExperiments from "./components/AllExperiments";
import SearchExperiments from "./components/SearchExperiments";
import StarredExperiments from "./components/StarredExperiments";
import PrivateRoute from "./components/PrivateComponent";
import { auth, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUserLoginDetails } from "./features/user/userSlice";
import MeetComponent from "./components/MeetComponent";

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        history.push("/");
      }
    });
  }, [userName]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      })
    );
  };

  return (
    <div className="App">
      <Header />
      {userName ? (
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/detail/:id" component={Detail} />
          <PrivateRoute path="/explore-experiment/:id" component={Explore} />
          <PrivateRoute path="/experiments/:slug" component={AllExperiments} />
          <PrivateRoute path="/search/:slug" component={SearchExperiments} />
          <PrivateRoute
            path="/starred-experiments"
            component={StarredExperiments}
          />
          <PrivateRoute path="/meet/:slug" component={MeetComponent} />
        </Switch>
      ) : (
        <Route exact path="/" component={Login} />
      )}
    </div>
  );
}

export default App;
