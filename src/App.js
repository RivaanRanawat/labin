import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  // useEffect(() => {
  //   async function tempD() {
  //     const id = "50";
  //     try {
  //       await db.collection("movies").doc(id).set({
  //         cardImg:
  //           "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-900.png",
  //         title: "Arithmetics",
  //         subTitle: "Multiplication • Division • Factoring",
  //         expUrl:
  //           "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_en.html",
  //         type: "math",
  //         desc: "Explain how multiplication tables help understand multiplication, factoring, and division. Use an array model to understand multiplication, factoring, and division. Increase accuracy in multiplying, factoring and dividing. Develop multiple strategies for arithmetic problems.",
  //         id: id,
  //       });
  //       console.log("done");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   tempD();
  // }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/explore-experiment/:id">
            <Explore />
          </Route>
          <Route path="/experiments/:slug">
            <AllExperiments />
          </Route>
          <Route path="/search/:slug">
            <SearchExperiments />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
