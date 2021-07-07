import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { uploadImage } from "../../firebase";
import { renameImage } from "../../scripts";
import { fileType, userType } from "../../types";
import { UserContext } from "../../UserProvider";
import LoadingIcon from "../icons/LoadingIcon";

const Preview: React.FC<{
  setFile: Dispatch<SetStateAction<File | undefined>>;
  setPreviewFile: Dispatch<SetStateAction<fileType | undefined>>;
  previewFile: fileType;
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}> = ({ setFile, setPreviewFile, previewFile, setTags, tags }) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const user: userType = useContext(UserContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAnon, setAnon] = useState<boolean>(false);
  const renderTags: JSX.Element[] = tags.map((tag: string, i: number) => {
    return (
      <div
        className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1"
        key={i}
      >
        <p className="text-blue-900 text-lg">{tag}</p>
        <button
          className="outline-none ont-medium text-blue-900  ml-2 select-none bg-blue-50 hover:bg-blue-300 hover:text-blue-600 focus:text-blue-300 focus:bg-blue-700 rounded-full w-5 h-5 flex items-center justify-center"
          onClick={() => {
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
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 justify-center items-center ${
          isLoading ? "flex" : "hidden"
        }`}
        style={{ zIndex: 60 }}
      >
        <LoadingIcon size={250} />
      </div>
      <div className="w-full flex justify-center flex-wrap items-center mt-6">
        <button
          className="btn-pr shadow-none sm:shadow-xl"
          onClick={() => {
            if (!isLoading) {
              setFile(undefined);
              setPreviewFile(undefined);
            } else {
              setError("Error: uploading card");
            }
          }}
        >
          Clear
        </button>
        <button
          className="btn-pr ml-4  shadow-none sm:shadow-xl"
          onClick={() => {
            if (tags.length <= 15 && tags.length >= 3) {
              if (!isLoading) {
                // setLoading(true);
                uploadImage(previewFile, tags, user, isAnon);
              } else {
                setError("Error: uploading card");
              }
            } else {
              setError("Error: empty [required] tag");
            }
          }}
        >
          Create
        </button>
        <a
          className="ml-4 flex justify-center items-center bg-blue-100  hover:bg-pink-100 focus:bg-pink-200 shadow-none sm:shadow-xl rounded-lg"
          href={previewFile.source}
        >
          <p className="text-blue-800 hover:text-pink-700 focus:text-pink-800 p-2 font-medium text-lg">
            Download
          </p>
        </a>
      </div>
      {error.length !== 0 ? (
        <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-red-300 text-red-800 font-medium p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
          <p>{error}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 bg-blue-200 text-blue-900 p-2 mt-4 mx-auto sm:rounded-lg text-sm sm:text-lg">
        <p className="break-all">{`Name: ${fileName}_id######.webp`}</p>
        <p>{"Size: " + fileSize}</p>
      </div>
      <div className="bg-blue-100 w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 mx-auto p-2 sm:rounded-md sm:shadow-lg sm:mt-4">
        <input
          type="text"
          className="bg-white w-full h-full outline-none p-2 rounded-md placeholder-blue-800 font-medium"
          maxLength={50}
          placeholder="Set file name here - 50 symbols"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setFileName(e.currentTarget.value.substring(0, 50));
            if (e.currentTarget.value.length <= 50) {
              renameImage(previewFile, e.currentTarget.value.substring(0, 50));
            }
          }}
        />
      </div>
      <div className="w-full sm:w-auto my-4 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-12 py-2 sm:px-2 flex flex-col items-center">
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
        <div className="w-full my-4 flex items-center justify-evenly">
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          <div className="flex items-center">
            <button
              className="btn-pr cursor-pointer flex items-center"
              onClick={() => {
                setAnon(!isAnon);
              }}
            >
              <p className="font-medium">Anonymously?</p>
              <div className="ml-2 fill-current">
                {isAnon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                  </svg>
                )}
              </div>
            </button>
          </div>
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          {isAnon ? (
            <></>
          ) : (
            <img
              src={user.photoURL}
              alt=""
              className="w-10 h-10 profileImage cursor-default"
            />
          )}
          {isAnon ? (
            <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default text-blue-700">
              Anon
            </p>
          ) : (
            <p className="ml-2 whitespace-nowrap text-lg font-medium cursor-default">
              {(user.displayName?.length || 0) >= 15
                ? user.displayName?.substring(0, 15) + "..."
                : user.displayName}
            </p>
          )}

          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
          <p className="text-blue-900">{tags.length}/15</p>
          <div className="w-full border-t border-solid border-blue-700 mx-2"></div>
        </div>
        <div className="flex flex-col w-full md:w-4/5">
          <div className="bg-blue-100 w-full sm:w-2/3 lg:w-2/4 2xl:w-2/5 mx-auto p-2 sm:rounded-md sm:shadow-lg sm:mt-4">
            <input
              type="text"
              className="bg-white w-full h-full outline-none p-2 rounded-md placeholder-blue-800 font-medium"
              placeholder="[3 min] Tags - 25 symbols / 15 tags"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                if (e.currentTarget.value.length > 26) {
                  e.preventDefault();
                  e.currentTarget.classList.add("text-blue-900");
                } else {
                  e.currentTarget.classList.remove("text-blue-900");
                  if (/\s/.test(e.currentTarget.value)) {
                    const dTags: string[] = tags;
                    e.currentTarget.value
                      .match(/[^ -][^ ]*/g)
                      ?.map((value: string, i: number) => {
                        let canPush: boolean = true;
                        for (
                          let checker = 0;
                          checker < dTags.length;
                          checker++
                        ) {
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
                    e.currentTarget.value = "";
                  }
                }
              }}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === " " || e.code === "Space") {
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
          <div className="flex flex-wrap">{renderTags}</div>
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
};

export default Preview;
