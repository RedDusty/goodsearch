import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../fbConfig";
import { userType } from "../types";
import { UserContext } from "../UserProvider";
import SearchIcon from "./icons/SearchIcon";

const StartPage = () => {
  const user: userType = useContext(UserContext);
  let renderAccess: JSX.Element = <></>;
  let renderUpload: JSX.Element = (
    <Link to="/upload" className="btn-pr ml-4">
      Upload
    </Link>
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
      <p className="text-blue-500 hover:text-pink-400 font-medium italic text-6xl my-4">
        Hornylib
      </p>
      <div className="bg-blue-100 shadow-xl w-4/5 md:w-2/4 min-w-min m-4 rounded-2xl box-content flex justify-center items-center">
        <input
          type="text"
          className="w-full h-8 bg-gray-100 outline-none hover:bg-white focus:bg-white rounded-xl p-2 m-2"
          placeholder="Search..."
        />
        <div className="w-px h-10 border-solid border-l border-black"></div>
        <button className="w-12 h-12 outline-none hover:bg-pink-200 focus:bg-pink-300 pl-2 rounded-tr-2xl rounded-br-2xl fill-current text-blue-400 hover:text-pink-600 focus:text-pink-700">
          <div className="w-6 h-6">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="flex mt-4">
        <Link to="/all" className="btn-pr">
          Show all
        </Link>
        {renderAccess}
      </div>
    {renderProfile}
    </div>
  );
};

export default StartPage;
