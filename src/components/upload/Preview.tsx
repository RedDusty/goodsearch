import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { uploadImage } from "../../firebase";
import { fileType, userType } from "../../types";
import { UserContext } from "../../UserProvider";

const Preview: React.FC<{
  setFile: Dispatch<SetStateAction<File | undefined>>;
  setPreviewFile: Dispatch<SetStateAction<fileType | undefined>>;
  previewFile: fileType;
  setAlbum: Dispatch<SetStateAction<string>>;
  album: string;
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}> = ({
  setFile,
  setPreviewFile,
  previewFile,
  setAlbum,
  album,
  setTags,
  tags,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("File name");
  const user: userType = useContext(UserContext);
  const renderAlbum: JSX.Element =
    album.length !== 0 ? (
      <div className="flex bg-pink-100 p-0.5 items-center rounded-lg mx-2 my-1">
        <p className="text-pink-900">{album}</p>
        <button
          className="outline-none ont-medium text-pink-900  ml-2 select-none bg-pink-50 hover:bg-pink-300 hover:text-pink-600 focus:text-pink-300 focus:bg-pink-700 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={() => {
            setAlbum("");
          }}
        >
          X
        </button>
      </div>
    ) : (
      <></>
    );
  const renderTags: JSX.Element[] = tags.map((tag: string, i: number) => {
    return (
      <div
        className="flex bg-blue-50 p-0.5 items-center rounded-lg mx-2 my-1"
        key={i}
      >
        <p className="text-blue-900">{tag}</p>
        <button
          className="outline-none ont-medium text-blue-900  ml-2 select-none bg-blue-50 hover:bg-blue-300 hover:text-blue-600 focus:text-blue-300 focus:bg-blue-700 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={() => {
            console.log("delete");
            const dTags: string[] = tags;
            dTags.splice(i, 1);
            setTags([...dTags]);
          }}
        >
          X
        </button>
      </div>
    );
  });
  let fileSize: string = "";
  if (previewFile.size <= 1024) {
    fileSize = `${previewFile.size.toFixed(2)} b`;
  }
  if (previewFile.size <= 1048576 && previewFile.size > 1024) {
    fileSize = `${(previewFile.size / 1000).toFixed(2)} kb`;
  }
  if (previewFile.size <= 16777216 && previewFile.size > 1048576) {
    fileSize = `${(previewFile.size / 1000 / 1000).toFixed(2)} mb`;
  }
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center flex-wrap items-center mt-6">
        <button
          className="btn-pr shadow-none sm:shadow-xl"
          onClick={() => {
            setFile(undefined);
            setPreviewFile(undefined);
          }}
        >
          Clear
        </button>
        <button
          className="btn-pr ml-4  shadow-none sm:shadow-xl"
          onClick={() => {
            uploadImage(album, previewFile, tags, user);
          }}
        >
          Create
        </button>
        <button className="ml-4 flex justify-center items-center bg-blue-100  hover:bg-pink-100 focus:bg-pink-200 shadow-none sm:shadow-xl rounded-lg">
          <p className="text-blue-800 hover:text-pink-700 focus:text-pink-800 p-2 font-medium text-lg">
            Download
          </p>
        </button>
      </div>
      <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-blue-200 text-blue-900 p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
        <p className="break-all">{"Name: " + fileName + ".webp "}</p>
        <p>{"Size: " + fileSize}</p>
      </div>
      <div className="bg-blue-100 w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 mx-auto p-2 sm:rounded-md sm:shadow-lg sm:mt-4">
        <input
          type="text"
          className="bg-white w-full h-full outline-none p-2 rounded-md"
          maxLength={50}
          placeholder="Set file name here - 50 symbols"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setFileName(e.currentTarget.value.substring(0, 50));
          }}
        />
      </div>
      <div className="bg-blue-100 w-full sm:w-auto my-4 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-12 py-2 sm:px-2 flex flex-col items-center sm:rounded-lg sm:shadow-xl border-t-2 border-solid border-blue-200">
        <div className="flex justify-center items-center">
          <div
            className={`${
              isFullscreen
                ? "w-screen h-screen bg-black fixed z-40 top-0 left-0 flex justify-center items-center"
                : "w-full h-full"
            }`}
          >
            <img
              src={previewFile?.source}
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
        <div className="w-full my-2 flex items-center justify-evenly">
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          <img
            src={user.photoURL}
            alt=""
            className="w-10 h-10 profileImage cursor-default"
          />
          <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default">
            {(user.displayName?.length || 0) >= 15
              ? user.displayName?.substring(0, 15) + "..."
              : user.displayName}
          </p>
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          <p className="text-blue-900">{tags.length}/25</p>
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
        </div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            className="w-full sm:w-64 lg:w-2/4 2xl:w-2/5 h-10 outline-none px-2 mx-auto sm:rounded-md"
            placeholder="[Optional] Tags - 25 symbols/tags"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (e.currentTarget.value.length > 26) {
                e.preventDefault();
                e.currentTarget.classList.add("text-blue-900");
              } else {
                e.currentTarget.classList.remove("text-blue-900");
              }
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === " " || e.code === "Space") {
                const dTags: string[] = tags;
                e.currentTarget.value
                  .match(/[^ -][^ ]*/g)
                  ?.map((value: string, i: number) => {
                    let canPush: boolean = true;
                    for (let checker = 0; checker < dTags.length; checker++) {
                      if (
                        value.charAt(0).toUpperCase() +
                          value.substring(1).toLowerCase() ===
                        dTags[checker]
                      ) {
                        canPush = false;
                      }
                    }
                    if (canPush) {
                      dTags.push(
                        value.charAt(0).toUpperCase() +
                          value.substring(1).toLowerCase()
                      );
                    }
                  });
                dTags.splice(25, dTags.length - 25);
                setTags([...dTags]);
              }
            }}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === " " || e.code === "Space") {
                e.currentTarget.value = "";
              }
            }}
          />
          <input
            type="text"
            className="w-full sm:w-64 lg:w-2/4 2xl:w-2/5 h-10 outline-none mt-2 sm:mx-auto px-2 sm:rounded"
            placeholder="[Required] Tag - 1 tag, 50 symbols"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (e.currentTarget.value.length > 50) {
                e.preventDefault();
              } else {
                const value = e.currentTarget.value.match(/[^ -][^ ]*/g);
                setAlbum(
                  (value || [""])[0].charAt(0).toUpperCase() +
                    (value || [""])[0].substring(1).toLowerCase()
                );
              }
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === " " || e.code === "Space") {
                e.preventDefault();
              }
            }}
          />
          <div className="flex flex-wrap">
            {renderAlbum}
            {renderTags}
          </div>
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
};

export default Preview;
