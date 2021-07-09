import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import ModalHeader from './components/header/ModalHeader';
import LoadingIcon from './components/icons/LoadingIcon';
import StartPage from './components/StartPage';
const AllCards = lazy(() => import('./components/AllCards'));
const SearchedCards = lazy(() => import('./components/SearchedCards'));
const AlbumPage = lazy(() => import('./components/albums/AlbumPage'));
const AlbumsContainer = lazy(() => import('./components/albums/AlbumsContainer'));
const Upload = lazy(() => import('./components/Upload'));
const Card = lazy(() => import('./components/Card'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [searchCards, setSearchCards] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  document.title = 'Hornylib';
  return (
    <div className="App">
      <ModalHeader setSearchCards={setSearchCards} isOpen={isOpen} setIsOpen={setIsOpen} searchCards={searchCards} />
      <Suspense fallback={<LoadingIcon size={500} />}>
        <Switch>
          <Route exact path="/">
            <StartPage setSearchCards={setSearchCards} />
          </Route>
          <Route exact path="/search">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <SearchedCards searchCards={searchCards} />
          </Route>
          <Route exact path="/upload">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <Upload />
          </Route>
          <Route exact path="/albums">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <AlbumsContainer />
          </Route>
          <Route exact path="/cards">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <AllCards />
          </Route>
          <Route exact path="/album/:name">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <AlbumPage />
          </Route>
          <Route exact path="/card/:id">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
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
