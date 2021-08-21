import React, { useContext, useEffect, useState } from 'react';
import { editTags, getCard, getUserFav, setUserFav } from '../firebase';
import { cardType, tipsType, userType } from '../types';
import { UserContext } from '../UserProvider';

function errorCreate(setError: React.Dispatch<React.SetStateAction<string>>, message: string) {
  setError(message);
  setTimeout(() => {
    setError('');
  }, 5000);
}

const Card: React.FC<{
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
  tips: tipsType;
}> = ({ setTips, tips }) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [card, setCard] = useState<cardType>({
    album: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    fileURL: '',
    id: 0,
    infoTags: [],
    infoTime: 0,
    userName: '',
    userPhoto: '',
    userUID: ''
  } as cardType);

  const user: userType = useContext(UserContext);

  const [tags, setTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [isEditTags, setEditTags] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFav, setFav] = useState<boolean>(user.cardsIDFav.includes(card.id));

  useEffect(() => {
    const getter = async () => {
      let cardInfo: cardType = card;

      if (card.userUID.length === 0 || card.userUID === '') {
        cardInfo = await getCard(window.location.pathname.substring(6));
        setCard(cardInfo);
        setTags(cardInfo.infoTags);
      }
      if (user.uid) {
        setFav(await getUserFav(cardInfo, user));
      }
    };

    getter();
  }, [window.location.pathname.substring(6), user]);

  document.title = card.infoTags[0] || 'Loading...';

  let renderTags: JSX.Element[] = [];

  if (card.infoTags) {
    const tagsArray = isEditTags ? newTags : tags;
    renderTags = tagsArray.map((tag: string, i: number) => {
      return (
        <div
          className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1 text-blue-900 text-lg hover:bg-pink-200 hover:text-pink-800"
          key={i}
        >
          <p>{tag}</p>
          {isEditTags ? (
            <button
              className="outline-none font-medium text-blue-900  ml-2 select-none bg-blue-50 hover:bg-blue-300 hover:text-blue-600 focus:text-blue-300 focus:bg-blue-700 rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => {
                const dTags: string[] = newTags.slice();
                dTags.splice(i, 1);
                setNewTags([...dTags]);
              }}
            >
              X
            </button>
          ) : (
            <></>
          )}
        </div>
      );
    });
  }

  let fileSize: string = '';
  if (card.fileSize <= 1024) {
    fileSize = `${card.fileSize.toFixed(2)} байт`;
  }
  if (card.fileSize <= 1048576 && card.fileSize > 1024) {
    fileSize = `${(card.fileSize / 1000).toFixed(2)} кб`;
  }
  if (card.fileSize <= 16777216 && card.fileSize > 1048576) {
    fileSize = `${(card.fileSize / 1000 / 1000).toFixed(2)} мб`;
  }
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center flex-wrap items-center mt-6">
        <a
          className="ml-4 flex justify-center items-center bg-blue-100  hover:bg-pink-100 focus:bg-pink-200 shadow-none sm:shadow-xl rounded-lg"
          href={card.fileURL}
        >
          <p className="text-blue-800 hover:text-pink-700 focus:text-pink-800 p-2 font-medium text-lg">Скачать</p>
        </a>
        <button
          className={`btn-pr ml-4 ${
            isFav
              ? 'bg-yellow-300 hover:bg-yellow-200 focus:bg-yellow-500 text-black hover:text-black focus:text-black'
              : ''
          }`}
          onClick={() => {
            setFav(!isFav);
            setUserFav(card, user, isFav);
          }}
        >
          {isFav ? 'В избранном' : 'В избранное'}
        </button>
      </div>
      <div className="w-full sm:w-auto sm:my-4 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-12 sm:px-2 flex flex-col items-center mt-4">
        <div
          className={`bg-green-200 text-green-800 font-medium text-base sm:text-lg flex-col sm:flex-row py-2 px-4 flex justify-center items-center sm:rounded-lg ${
            tips.zoomImage ? 'hidden' : 'block'
          }`}
        >
          <div className="flex justify-center items-start flex-col">
            <p>Нажмите на картинку, чтобы перейти в полный экран. Нажмите ещё раз, чтобы выйти.</p>
          </div>
          <button
            className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
            onClick={() => {
              localStorage.setItem('zoomImageTip', 'true');
              setTips({
                start: tips.start,
                uName: tips.uName,
                uTags: tips.uTags,
                upload: tips.upload,
                zoomImage: true
              });
            }}
          >
            Close
          </button>
        </div>
      </div>
      {error.length !== 0 ? (
        <div className="w-full fixed z-50 sm:flex sm:justify-center select-none">
          <div className="bg-red-300 text-red-800 font-medium p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-blue-200 text-blue-900 p-2 sm:mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
        <p className="break-all">{`Имя: ${card.fileName}_${card.id}.webp`}</p>
        <p>{'Размер: ' + fileSize}</p>
      </div>
      <div className="w-full my-4 flex flex-col sm:flex-row items-center justify-evenly">
        {user.uid === card.userUID ? (
          <>
            <div className="w-full border-t border-solid border-blue-700 mx-2 hidden sm:block"></div>
            <div className="flex items-center">
              <button
                className="btn-pr cursor-pointer flex items-center"
                onClick={() => {
                  if (!isEditTags) {
                    setEditTags(true);
                    setNewTags(tags);
                  }
                  if (isEditTags) {
                    if (newTags.length <= 30 && newTags.length >= 1) {
                      setEditTags(false);
                      const oldTags = tags.slice();
                      setTags(newTags);
                      editTags(oldTags, newTags, card);
                    } else {
                      if (newTags.length > 30) {
                        errorCreate(setError, 'Ошибка: 30 тегов максимально!');
                      } else if (newTags.length < 1) {
                        errorCreate(setError, 'Ошибка: 1 тег минимум!');
                      } else {
                        errorCreate(setError, 'Ошибка: неизвестная ошибка.');
                      }
                    }
                  }
                }}
              >
                <p className="font-medium">{isEditTags ? 'Принять' : 'Редактировать'}</p>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="w-full border-t border-solid border-blue-700 mx-2 hidden sm:block"></div>
        <img src={card.userPhoto} alt="" className="w-10 h-10 profileImage cursor-default mt-2 sm:mt-0" />
        <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default">
          {(card.userName.length || 0) >= 15 ? card.userName.substring(0, 15) + '...' : card.userName}
        </p>
        <div className="w-full border-t border-solid border-blue-700 mx-2 hidden sm:block"></div>
      </div>
      <div className="flex flex-col w-full md:w-4/5">
        {isEditTags ? (
          <div className="bg-blue-100 w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 mx-auto p-2 sm:rounded-md sm:shadow-lg sm:mt-4">
            <input
              type="text"
              className="bg-white w-full h-full outline-none p-2 rounded-md placeholder-blue-800 font-medium"
              maxLength={25}
              placeholder="Здесь писать теги..."
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                if (e.currentTarget.value.length > 26) {
                  e.preventDefault();
                  e.currentTarget.classList.add('text-blue-900');
                } else {
                  e.currentTarget.classList.remove('text-blue-900');
                  if (/\s/.test(e.currentTarget.value)) {
                    const dTags: string[] = newTags.slice();
                    e.currentTarget.value.match(/[^ -][^ ]*/g)?.map((value: string, i: number) => {
                      const tag = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
                      if (!/^\./.test(tag)) {
                        if (!/\.{2,}/.test(tag)) {
                          if (!/\/|\\/.test(tag)) {
                            if (!/^__.*__/.test(tag)) {
                              let canPush: boolean = true;
                              for (let checker = 0; checker < dTags.length; checker++) {
                                if (tag === dTags[checker]) {
                                  canPush = false;
                                }
                              }
                              if (canPush) {
                                dTags.push(tag);
                              }
                            } else {
                              errorCreate(
                                setError,
                                `Ошибка: не может начинаться и заканчиваться с нижних подчёркиваний (__)`
                              );
                            }
                          } else {
                            errorCreate(setError, `Ошибка: не может содержать слэши (/ \\)`);
                          }
                        } else {
                          errorCreate(setError, `Ошибка: не может содержать двоеточие (..)`);
                        }
                      } else {
                        errorCreate(setError, `Ошибка: не может содержать точку в начале (.)`);
                      }
                    });
                    dTags.splice(30, dTags.length - 30);
                    setNewTags([...dTags]);
                    e.currentTarget.value = '';
                  }
                }
              }}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === ' ' || e.code === 'Space') {
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-wrap">{renderTags}</div>
      </div>
      <div className="w-full md:w-4/5 mb-4 sm:my-4 md:mx-auto sm:py-2 md:px-2 flex flex-col items-center">
        <div className="flex justify-center items-center">
          <div
            className={`${
              isFullscreen
                ? 'w-screen h-screen bg-black fixed z-40 top-0 left-0 flex justify-center items-center'
                : 'w-full h-full'
            }`}
          >
            <img
              src={card.fileURL}
              alt=""
              className={`${isFullscreen ? 'w-full h-full object-contain z-50' : 'relative w-auto h-auto'}`}
              data-fullscreen="false"
              onClick={() => {
                setFullscreen(!isFullscreen);
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
};

export default Card;
