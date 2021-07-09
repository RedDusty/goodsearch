import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCard } from '../firebase';
import { cardType, tipsType } from '../types';

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

  useEffect(() => {
    const getter = async () => {
      const cardInfo = await getCard(window.location.pathname.substring(6));
      setCard(cardInfo);
    };

    getter();
  }, [window.location.pathname.substring(6)]);

  document.title = card.infoTags[0];

  let renderTags: JSX.Element[] = [];

  if (card.infoTags) {
    renderTags = card.infoTags.map((tag: string, i: number) => {
      return (
        <NavLink
          to={'/album/' + tag}
          className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1 text-blue-900 text-lg hover:bg-pink-200 hover:text-pink-800"
          key={i}
        >
          <p>{tag}</p>
        </NavLink>
      );
    });
  }

  let fileSize: string = '';
  if (card.fileSize <= 1024) {
    fileSize = `${card.fileSize.toFixed(2)} b`;
  }
  if (card.fileSize <= 1048576 && card.fileSize > 1024) {
    fileSize = `${(card.fileSize / 1000).toFixed(2)} kb`;
  }
  if (card.fileSize <= 16777216 && card.fileSize > 1048576) {
    fileSize = `${(card.fileSize / 1000 / 1000).toFixed(2)} mb`;
  }
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center flex-wrap items-center mt-6">
        <a
          className="ml-4 flex justify-center items-center bg-blue-100  hover:bg-pink-100 focus:bg-pink-200 shadow-none sm:shadow-xl rounded-lg"
          href={card.fileURL}
        >
          <p className="text-blue-800 hover:text-pink-700 focus:text-pink-800 p-2 font-medium text-lg">Download</p>
        </a>
      </div>
      <div className="w-full sm:w-auto sm:my-4 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-12 sm:px-2 flex flex-col items-center">
        <div
          className={`bg-green-200 text-green-800 font-medium text-base sm:text-lg flex-col sm:flex-row py-2 px-4 flex justify-center items-center sm:rounded-lg ${
            tips.zoomImage ? 'hidden' : 'block'
          }`}
        >
          <div className="flex justify-center items-start flex-col">
            <p>You can click on the picture and zoom in on it. To exit click on it again.</p>
          </div>
          <button
            className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
            onClick={() => {
              localStorage.setItem('uTagsTip', 'true');
              setTips({
                start: tips.start,
                uName: tips.uName,
                uTags: tips.uTags,
                upload: tips.upload,
                zoomImage: true,
                tagsImage: tips.tagsImage
              });
            }}
          >
            Close
          </button>
        </div>
      </div>
      <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-blue-200 text-blue-900 p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
        <p className="break-all">{`Name: ${card.fileName}_${card.id}.webp`}</p>
        <p>{'Size: ' + fileSize}</p>
      </div>
      <div className="w-full md:w-4/5 my-4 md:mx-auto py-2 md:px-2 flex flex-col items-center">
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
        <div className="w-full my-4 flex items-center justify-evenly">
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          {card.userPhoto !== 'Anon' ? (
            <>
              <img src={card.userPhoto} alt="" className="w-10 h-10 profileImage cursor-default" />
              <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default">
                {(card.userName.length || 0) >= 15 ? card.userName.substring(0, 15) + '...' : card.userName}
              </p>
            </>
          ) : (
            <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default text-blue-700">Anon</p>
          )}
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
        </div>

        <div
          className={`bg-green-200 text-green-800 w-full sm:w-auto font-medium text-base sm:text-lg py-2 sm:mb-2 px-4 flex flex-col sm:flex-row justify-center items-center sm:rounded-lg ${
            tips.tagsImage ? 'hidden' : 'block'
          }`}
        >
          <div className="flex justify-center items-center flex-col">
            <p>Click on any of these tags to view cards with that tag.</p>
          </div>
          <button
            className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
            onClick={() => {
              localStorage.setItem('tagsImageTip', 'true');
              setTips({
                start: tips.start,
                uName: tips.uName,
                uTags: tips.uTags,
                upload: tips.upload,
                zoomImage: tips.zoomImage,
                tagsImage: true
              });
            }}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col w-full md:w-4/5">
          <div className="flex flex-wrap">{renderTags}</div>
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
};

export default Card;
