import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../fbConfig';
import { tipsType, userType } from '../types';
import { UserContext } from '../UserProvider';
import StartPageSearch from './search/StartPageSearch';

const StartPage: React.FC<{
  setSearchCards: React.Dispatch<React.SetStateAction<string>>;
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
  tips: tipsType;
}> = ({ setSearchCards, setTips, tips }) => {
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
      <div
        className={`bg-green-200 text-green-800 w-full sl:w-auto font-medium text-lg py-2 px-4 flex justify-center flex-col sm:flex-row items-center sl:rounded-lg ${
          tips.start ? 'hidden' : 'block'
        }`}
      >
        <p>Try to find something or upload it yourself.</p>
        <button
          className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
          onClick={() => {
            localStorage.setItem('startTip', 'true');
            setTips({
              start: true,
              uName: tips.uName,
              uTags: tips.uTags,
              upload: tips.upload,
              zoomImage: tips.zoomImage,
              tagsImage: tips.tagsImage
            });
          }}
        >
          Close
        </button>
      </div>
      <div className="flex mt-4">
        <NavLink to="/albums" className="btn-pr">
          Show all albums
        </NavLink>
        <NavLink to="/cards" className="btn-pr ml-4">
          Show all cards
        </NavLink>
      </div>
      <div className="flex mt-4">
        {renderAccess}
        <button
          className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
          onClick={() => {
            setTips({
              start: false,
              uName: false,
              uTags: false,
              upload: false,
              zoomImage: false,
              tagsImage: false
            });
            localStorage.setItem('startTip', 'false');
            localStorage.setItem('uploadTip', 'false');
            localStorage.setItem('uTagsTip', 'false');
            localStorage.setItem('uNameTip', 'false');
            localStorage.setItem('zoomImageTip', 'false');
            localStorage.setItem('tagsImageTip', 'false');
          }}
        >
          Reset tips
        </button>
      </div>
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
