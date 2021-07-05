import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingIcon from "./components/icons/LoadingIcon";
import StartPage from "./components/StartPage";
const AlbumPage = lazy(() => import("./components/albums/AlbumPage"));
const AllAlbums = lazy(() => import("./components/AllAlbums"));
const Upload = lazy(() => import("./components/Upload"));
const Card = lazy(() => import("./components/Card"));
const NotFound = lazy(() => import("./components/NotFound"))

function App() {
  document.title = "Hornylib"
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
          <Route exact path="/album/:name">
            <AlbumPage />
          </Route>
          <Route exact path="/card/:id">
            <Card />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
