import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

import Home from "./components/Home";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/details/:id" component={MovieDetails}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
