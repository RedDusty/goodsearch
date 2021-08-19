import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../../fbConfig';
import { tipsType, userType } from '../../types';
import { UserContext } from '../../UserProvider';
import MenuIcon from '../icons/MenuIcon';
import ModalSearch from './ModalSearch';

const ModalHeader: React.FC<{
  setSearchCards: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchCards: string;
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
}> = ({ setSearchCards, isOpen, setIsOpen, searchCards, setTips }) => {
  const user: userType = useContext(UserContext);
  if (!isOpen) {
    return null;
  }
  let renderAccess: JSX.Element = <></>;
  let renderUpload: JSX.Element = (
    <NavLink
      className="btn-pr ml-2 bg-blue-300"
      to={'/upload'}
      onClick={() => {
        document.title = 'GoodSearch';
      }}
    >
      Загрузить
    </NavLink>
  );
  let renderProfile: JSX.Element = <></>;

  if (user.uid) {
    if (user.banned) {
      renderUpload = (
        <div className="bg-pink-100 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium rounded-lg ml-4 cursor-default">
          <p>Аккаунт заблокирован</p>
        </div>
      );
    }
    renderProfile = (
      <div className="flex items-center text-lg font-medium rounded-lg ml-2 my-4 cursor-default">
        <img src={user.photoURL} alt="" className="w-10 h-10 profileImage" />
        <p className="ml-2">{user.displayName}</p>
      </div>
    );
    renderAccess = (
      <>
        {renderUpload}
        <button className="btn-pr ml-4 bg-blue-300" onClick={logOut}>
          Выйти
        </button>
      </>
    );
  }
  if (!user.uid) {
    renderAccess = (
      <button className="btn-pr ml-4 bg-blue-300" onClick={signInWithGoogle}>
        Вход через Google
      </button>
    );
  }
  return (
    <div className="absolute bg-blue-100 border-b-2 sm:border-r-2 border-solid border-blue-400 w-full sm:w-auto sm:p-2 sm:rounded-br-lg flex flex-col justify-center z-40">
      <div className="flex mt-2 ml-2">
        <button
          className="w-12 h-12 hover:bg-pink-300 hover:text-pink-900 bg-blue-300 text-blue-900 fill-current rounded-full p-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <MenuIcon />
          </div>
        </button>
        <NavLink
          className="btn-pr ml-2 bg-blue-300"
          to={'/'}
          onClick={() => {
            document.title = 'GoodSearch';
          }}
        >
          Стартовая страница
        </NavLink>
      </div>

      <ModalSearch setSearchCards={setSearchCards} searchCards={searchCards} />
      <div className="flex flex-wrap mt-4">
        <NavLink to="/albums" className="btn-pr ml-2 bg-blue-300">
          Показать все альбомы
        </NavLink>
        <NavLink to="/cards" className="btn-pr ml-2 sm:ml-4 mt-2 sm:mt-0 bg-blue-300">
          Показать все карты
        </NavLink>
      </div>
      <div className="flex mt-4">{renderAccess}</div>
      <button
        className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 mx-4 mt-2 rounded-md max-w-xs"
        onClick={() => {
          setTips({
            start: false,
            uName: false,
            uTags: false,
            upload: false,
            zoomImage: false
          });
          localStorage.setItem('startTip', 'false');
          localStorage.setItem('uploadTip', 'false');
          localStorage.setItem('uTagsTip', 'false');
          localStorage.setItem('uNameTip', 'false');
          localStorage.setItem('zoomImageTip', 'false');
        }}
      >
        Сбросить подсказки
      </button>
      {!user.uid ? (
        <p className="mt-4 w-full sm:w-auto bg-pink-200 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium sm:rounded-lg cursor-default">
          Включите Cookies, если не можете войти на сайт!
        </p>
      ) : (
        <></>
      )}
      {renderProfile}
    </div>
  );
};

export default ModalHeader;
