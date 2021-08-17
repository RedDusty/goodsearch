import React from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { tipsType } from '../../types';

export const Input: React.FC<{
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  open: () => void;
  setTips: React.Dispatch<React.SetStateAction<tipsType>>;
  tips: tipsType;
}> = ({ getRootProps, getInputProps, open, setTips, tips }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={`bg-green-200 text-green-800 w-full sl:w-auto font-medium text-lg py-2 px-4 flex flex-col sm:flex-row justify-center items-center sl:rounded-lg ${
          tips.upload ? 'hidden' : 'block'
        }`}
      >
        <div className="flex justify-center items-start flex-col">
          <p>Загрузите PNG или WEBP для наилучшего качества.</p>
          <div className="border-t border-solid border-green-900 w-full h-0 my-1"></div>
          <p>Все картинки конвертируются в формат WEBP.</p>
          <div className="border-t border-solid border-green-900 w-full h-0 my-1"></div>
          <p>GIF не поддерживается.</p>
        </div>
        <button
          className="bg-green-400 hover:bg-green-600 focus:bg-green-800 text-white font-medium text-lg px-2 py-0.5 ml-2 rounded-md"
          onClick={() => {
            localStorage.setItem('uploadTip', 'true');
            setTips({
              start: tips.start,
              uName: tips.uName,
              uTags: tips.uTags,
              upload: true,
              zoomImage: tips.zoomImage,
              tagsImage: tips.tagsImage
            });
          }}
        >
          Закрыть
        </button>
      </div>
      <div
        className="bg-blue-200 w-full sm:w-72 h-72 shadow-lg sm:rounded-3xl flex flex-col justify-center items-center mt-6"
        {...getRootProps()}
      >
        <input type="file" name="" id="" className="opacity-0 select-none" {...getInputProps()} />
        <p className="font-medium text-lg text-blue-900 m-4">Перетащите сюда файл для загрузки.</p>
        <p className="font-medium text-lg text-blue-900 m-4">16 мб максимальный вес!</p>
        <button className="btn-pr" onClick={open}>
          Выбрать файл
        </button>
      </div>
    </div>
  );
};
