import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../fbConfig';
import { userType } from '../types';
import { UserContext } from '../UserProvider';
import StartPageSearch from './search/StartPageSearch';

const StartPage: React.FC<{ setSearchCards: React.Dispatch<React.SetStateAction<string>> }> = ({
  setSearchCards
}) => {
  const user: userType = useContext(UserContext);
  let renderAccess: JSX.Element = <></>;
  let renderUpload: JSX.Element = (
    <NavLink to="/upload" className="btn-pr ml-4">
      Upload
    </NavLink>
  );
  let renderProfile: JSX.Element = <></>;

  if (user.uid) {
    if (user.banned) {
      renderUpload = (
        <div className="bg-pink-100 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium rounded-lg ml-4 cursor-default">
          <p>Account is blocked</p>
        </div>
      );
    }
    renderProfile = (
      <div className="flex items-center text-lg font-medium rounded-lg mt-4 cursor-default">
        <img src={user.photoURL} alt="" className="w-10 h-10 profileImage" />
        <p className="ml-2">{user.displayName}</p>
      </div>
    );
    renderAccess = (
      <>
        {renderUpload}
        <button className="btn-pr ml-4" onClick={logOut}>
          Log out
        </button>
      </>
    );
  }
  if (!user.uid) {
    renderAccess = (
      <button className="btn-pr ml-4" onClick={signInWithGoogle}>
        Login with Google
      </button>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-blue-500 hover:text-pink-400 font-extrabold italic text-6xl my-4 startPageName">Hornylib</p>
      <StartPageSearch setSearchCards={setSearchCards} />
      <div className="flex mt-4">
        <NavLink to="/albums" className="btn-pr">
          Show all albums
        </NavLink>
        <NavLink to="/cards" className="btn-pr ml-4">
          Show all cards
        </NavLink>
      </div>
      <div className="flex mt-4">{renderAccess}</div>
      {!user.uid ? (
        <p className="mt-4 w-full sm:w-auto bg-pink-100 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium sm:rounded-lg cursor-default">
          Don't forget to enable cookies if you can't login!
        </p>
      ) : (
        <></>
      )}
      {renderProfile}
    </div>
  );
};

export default StartPage;
