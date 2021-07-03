import React, { Dispatch, SetStateAction, useState } from "react";
import { fb, uploadImage } from "../../firebase";
import { fileType } from "../../types";

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
  const [scale, setScale] = useState<number>(1);
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
    <div>
      <div className={`flex flex-col fixed left-0 bottom-4 ${isFullscreen ? 'z-0' : 'z-50'}`}>
        <button
          className="text-4xl my-2 font-bold bg-blue-200 hover:bg-blue-300 focus:bg-blue-400 text-blue-700 hover:text-blue-800 focus:text-blue-900 fill-current w-8 h-8 p-2 box-content mx-4 flex justify-center items-center rounded-full"
          onClick={() => {
            if (scale < 4.95) {
              setScale(scale + 0.05);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M13 10h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
          </svg>
        </button>
        <button
          className="text-4xl my-2 font-bold bg-blue-200 hover:bg-blue-300 focus:bg-blue-400 text-blue-700 hover:text-blue-800 focus:text-blue-900 fill-current w-8 h-8 p-2 box-content mx-4 flex justify-center items-center rounded-full"
          onClick={() => {
            setScale(1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M13 8h-8v-2h8v2zm0 4h-8v-2h8v2zm8.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
          </svg>
        </button>
        <button
          className="text-4xl my-2 font-bold bg-blue-200 hover:bg-blue-300 focus:bg-blue-400 text-blue-700 hover:text-blue-800 focus:text-blue-900 fill-current w-8 h-8 p-2 box-content mx-4 flex justify-center items-center rounded-full"
          onClick={() => {
            if (scale > 0.05) {
              setScale(scale - 0.05);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path d="M13 10h-8v-2h8v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex justify-center items-center mt-6">
        <button
          className="btn-pr-small"
          onClick={() => {
            setFile(undefined);
            setPreviewFile(undefined);
          }}
        >
          Clear
        </button>
        <button className="btn-pr-small ml-4" onClick={() => {
          uploadImage(album, previewFile, tags, fb)
        }}>Create</button>
        <button className="btn-pr-small ml-4">Download {fileSize}</button>
      </div>
      <div
        className="bg-blue-100 my-4 pb-2 w-full flex flex-col items-center shadow-xl border-t-2 border-solid border-blue-200"
        style={{
          transform: `${isFullscreen ? "unset" : "scale(" + scale + ")"}`,
          marginTop: `${isFullscreen ? "unset" : (scale * 50 + 'px')}`
        }}
      >
        <div className="flex justify-center items-center">
          <div
            className={`${
              isFullscreen
                ? "w-screen h-screen bg-black bg-opacity-90 fixed z-40 top-0 left-0 flex justify-center items-center"
                : "w-full h-full"
            }`}
          >
            <img
              src={previewFile?.source}
              alt=""
              className={`z-50 ${
                isFullscreen
                  ? "w-full h-full object-contain"
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
          <div className="w-2/3 border-t border-solid border-blue-700"></div>
          <p className="text-blue-900">{tags.length}/25</p>
        </div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            className="w-full h-10 outline-none px-2"
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
            className="w-full h-10 outline-none mt-2 px-2"
            placeholder="[Required] Album - 1 word, 50 symbols"
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
    </div>
  );
};

export default Preview;
