import React, { useContext, useState } from 'react';
// import { setDiscordUser } from '../../firebase';
import { userType } from '../../types';
import { UserContext } from '../../UserProvider';

export default function ProfileUser() {
  const user: userType = useContext(UserContext);

  // const [discordChange, setDiscordChange] = useState<boolean>(false);
  // const [disName, setDisName] = useState<string>(user.disName || '');
  // const [disTag, setDisTag] = useState<string>(user.disTag || '');

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center text-lg font-medium rounded-lg mt-4 cursor-default">
        <img src={user.photoURL} alt="" className="w-10 h-10 profileImage" />
        <p className="ml-2">{user.displayName}</p>
      </div>
      <div className="mt-2">
        <p>Количество карт: {user.cardsID.length}</p>
      </div>
      {user.banned ? (
        <div className="bg-pink-100 hover:bg-pink-300 text-pink-800 hover:text-pink-900 px-4 py-2 text-lg font-medium rounded-lg ml-4 cursor-default">
          <p>Аккаунт заблокирован</p>
        </div>
      ) : (
        <></>
      )}
      {/* <div className="mt-2">
        <p>Discord bot connect</p>
        <div className="flex bg-gray-200 mt-1 rounded-xl hover:bg-gray-300">
          <label htmlFor="discordName">
            <input
              type="text"
              name=""
              id="discordName"
              className="bg-transparent pl-2 py-2 text-black bg outline-none"
              placeholder="Some user"
              value={disName}
              onChange={(e) => {
                setDisName(e.target.value);
                setDiscordChange(true);
              }}
            />
          </label>
          <label htmlFor="discordTag">
            #
            <input
              type="text"
              name=""
              id="discordTag"
              className="bg-transparent pr-2 py-2 text-black w-11 outline-none"
              maxLength={4}
              placeholder="1234"
              value={disTag}
              onChange={(e) => {
                setDisTag(e.target.value);
                setDiscordChange(true);
              }}
            />
          </label>
        </div>
        {discordChange ? (
          <>
            <button
              className="btn-pr bg-gray-300 hover:bg-gray-400 focus:bg-gray-500 text-black hover:text-black focus:text-black mt-2"
              onClick={() => {
                setDisName(user.disName || '');
                setDisTag(user.disTag || '');
                setDiscordChange(false);
              }}
            >
              Отмена
            </button>
            <button
              className="btn-pr bg-gray-300 hover:bg-gray-400 focus:bg-gray-500 text-black hover:text-black focus:text-black mt-2 ml-4"
              onClick={() => {
                setDiscordChange(false);
                if (user.disTag !== disTag || user.disName !== disName) {
                  setDiscordUser(disName, disTag, window.location.pathname.substr(9));
                }
              }}
            >
              Подтвердить
            </button>
          </>
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
}
