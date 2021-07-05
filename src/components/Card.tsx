import React, { useEffect, useState } from "react";
import { getCard } from "../firebase";
import { cardType } from "../types";
import HeaderContainer from "./header/HeaderContainer";

const Card = () => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [card, setCard] = useState<cardType>({
    album: "",
    fileName: "",
    fileSize: 0,
    fileType: "",
    fileURL: "",
    id: 0,
    infoTags: [],
    infoTime: 0,
    userName: "",
    userPhoto: "",
    userUID: "",
  } as cardType);

  useEffect(() => {
    const getter = async () => {
      const cardInfo = await getCard(window.location.pathname.substring(6));
      setCard(cardInfo);
    };

    getter();
  }, [window.location.pathname.substring(6)]);

  document.title = card.album

  let renderTags: JSX.Element[] = [];

  if (card.infoTags) {
    renderTags = card.infoTags.map((tag: string, i: number) => {
      return (
        <div
          className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1"
          key={i}
        >
          <p className="text-blue-900 text-lg">{tag}</p>
        </div>
      );
    });
  }

  let fileSize: string = "";
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
      <HeaderContainer />
      <div className="w-full flex justify-center flex-wrap items-center mt-6">
        <button className="ml-4 flex justify-center items-center bg-blue-100  hover:bg-pink-100 focus:bg-pink-200 shadow-none sm:shadow-xl rounded-lg">
          <p className="text-blue-800 hover:text-pink-700 focus:text-pink-800 p-2 font-medium text-lg">
            Download
          </p>
        </button>
      </div>
      <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-blue-200 text-blue-900 p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
        <p className="break-all">{`Name: ${card.fileName}_${card.id}.webp`}</p>
        <p>{"Size: " + fileSize}</p>
      </div>
      <div className="w-full md:w-4/5 my-4 md:mx-auto py-2 md:px-2 flex flex-col items-center">
        <div className="flex justify-center items-center">
          <div
            className={`${
              isFullscreen
                ? "w-screen h-screen bg-black fixed z-40 top-0 left-0 flex justify-center items-center"
                : "w-full h-full"
            }`}
          >
            <img
              src={card.fileURL}
              alt=""
              className={`${
                isFullscreen
                  ? "w-full h-full object-contain z-50"
                  : "relative w-auto h-auto"
              }`}
              data-fullscreen="false"
              onClick={() => {
                setFullscreen(!isFullscreen);
              }}
            />
          </div>
        </div>
        <div className="w-full my-4 flex items-center justify-evenly">
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          <img
            src={card.userPhoto}
            alt=""
            className="w-10 h-10 profileImage cursor-default"
          />
          <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default">
            {(card.userName.length || 0) >= 15
              ? card.userName.substring(0, 15) + "..."
              : card.userName}
          </p>
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
        </div>
        <div className="flex flex-col w-full md:w-4/5">
          <div className="flex flex-wrap">
            <div className="flex bg-pink-100 p-1 items-center rounded-lg mx-2 my-1">
              <p className="text-pink-900 text-xl font-medium">{card.album}</p>
            </div>
            {renderTags}
          </div>
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
};

export default Card;
