import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import ModalHeader from './components/header/ModalHeader';
import LoadingIcon from './components/icons/LoadingIcon';
import StartPage from './components/StartPage';
import { tipsType } from './types';
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
  const [tips, setTips] = useState<tipsType>({
    start: Boolean(localStorage.getItem('startTip')) || false,
    upload: Boolean(localStorage.getItem('uploadTip')) || false,
    uTags: Boolean(localStorage.getItem('uTagsTip')) || false,
    uName: Boolean(localStorage.getItem('uNameTip')) || false,
    zoomImage: Boolean(localStorage.getItem('zoomImageTip')) || false
  });
  document.title = 'GoodSearch';
  return (
    <div className="App">
      <ModalHeader
        setSearchCards={setSearchCards}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchCards={searchCards}
        setTips={setTips}
      />
      <Suspense fallback={<LoadingIcon size={500} />}>
        <Switch>
          <Route exact path="/">
            <StartPage setSearchCards={setSearchCards} setTips={setTips} tips={tips} />
          </Route>
          <Route exact path="/search">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <SearchedCards searchCards={searchCards} />
          </Route>
          <Route exact path="/upload">
            <HeaderContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            <Upload setTips={setTips} tips={tips} />
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
            <Card setTips={setTips} tips={tips} />
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
