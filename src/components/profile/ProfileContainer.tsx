import React, { useContext } from 'react';
import { signInWithGoogle } from '../../fbConfig';
import { userType } from '../../types';
import { UserContext } from '../../UserProvider';
import ProfileCards from './ProfileCards';
import ProfileUser from './ProfileUser';

export default function ProfileContainer() {
  const user: userType = useContext(UserContext);

  document.title = user.displayName || 'Loading user'

  const renderLogin = (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <button className="btn-pr ml-4" onClick={signInWithGoogle}>
        Вход через Google
      </button>
      <p className="mt-4 w-full sm:w-auto bg-pink-100 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium sm:rounded-lg cursor-default">
        Включите Cookies, если не можете войти на сайт!
      </p>
    </div>
  );

  const renderProfile = (
    <div className="w-full h-full flex flex-col items-center">
      <ProfileUser />
      <div className="w-11/12 md:w-2/4 xm:w-2/5 3xl:w-1/5 border-t border-solid border-blue-700 my-4"></div>
      <ProfileCards />
    </div>
  );

  return (
    <div className="w-full h-full">
      {user.uid !== '' && user.uid !== undefined && user.uid.length !== 0 ? renderProfile : renderLogin}
    </div>
  );
}
