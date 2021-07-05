import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingIcon from "./components/icons/LoadingIcon";
import StartPage from "./components/StartPage";
const AllAlbums = lazy(() => import("./components/AllAlbums"));
const Upload = lazy(() => import("./components/Upload"));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<LoadingIcon size={500} />}>
        <Switch>
          <Route exact path="/">
            <StartPage />;
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/all">
            <AllAlbums />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
