import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AllAlbums from "./components/AllAlbums";
import StartPage from "./components/StartPage";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route exact path="/upload">
          <Upload />
        </Route>
        <Route exact path="/all">
          <AllAlbums />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
