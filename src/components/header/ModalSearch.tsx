import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAlbumsBySearch } from '../../firebase';
import { albumType, querySearchType } from '../../types';
import SearchIcon from '../icons/SearchIcon';

const ModalSearch: React.FC<{ setSearchCards: React.Dispatch<React.SetStateAction<string>>; searchCards: string }> = ({
  setSearchCards,
  searchCards
}) => {
  const [tag, setTag] = useState<string>('');
  const [tagList, setTagList] = useState<albumType[]>([]);
  const [querySearch, setQuerySearch] = useState<querySearchType[]>([]);

  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    const timeTyping = setTimeout(async () => {
      if (tag !== '') {
        setTagList(await getAlbumsBySearch(tag));
      }
    }, 2500);

    return () => {
      clearTimeout(timeTyping);
    };
  }, [tag, tagList]);

  const renderTagList = tagList.map((album: albumType, i: number) => {
    return (
      <button
        className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1 text-blue-900 text-lg hover:bg-pink-200 hover:text-pink-800"
        key={`div${album.name + i}`}
        onClick={() => {
          if (querySearch.length < 10) {
            const newQuery = querySearch;
            newQuery.push({ id: album.id, name: album.name, count: album.count });
            setQuerySearch(newQuery);
            const valuesArray = inputRef.current?.value.split(' ');
            const values = valuesArray?.map((value: string, i: number) => {
              if (valuesArray.length - 1 === i) {
                return album.name;
              }
              return value;
            });
            setSearchCards(values!.join(' '));
            inputRef.current!.value = values!.join(' ');
          }
        }}
      >
        <p key={`p${album.name + i}`}>{album.name + ' (' + album.count + ')'}</p>
      </button>
    );
  });
  return (
    <div className="w-full mt-2 ">
      <div className="bg-blue-300 shadow-xl mx-2 box-content flex justify-center items-center rounded-2xl relative z-10">
        <input
          type="text"
          className="w-full h-8 bg-gray-100 outline-none hover:bg-white focus:bg-white rounded-xl p-2 m-2"
          placeholder="[10 тегов макс.] Поиск..."
          ref={inputRef}
          value={searchCards}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            if (querySearch.length < 10) {
              e.currentTarget.classList.remove('placeholder-pink-800');
              const tags =
                e.currentTarget.value.match(/[^ -][^ ]*/g)?.map((value: string, i: number) => {
                  return value.charAt(0).toUpperCase() + value.substr(1);
                }) || [];
              setTag(tags.slice(-1)[0]);
              setSearchCards(e.currentTarget.value);
            } else {
              e.currentTarget.classList.add('placeholder-pink-800');
            }
          }}
        />
        <div className="w-px h-10 border-solid border-l border-black"></div>
        <NavLink
          className="flex justify-center items-center w-12 h-12 outline-none hover:bg-pink-200 focus:bg-pink-300 pl-2 rounded-tr-2xl rounded-br-2xl fill-current text-blue-700 hover:text-pink-600 focus:text-pink-700"
          to={'/search'}
        >
          <div className="w-6 h-6 mr-2">
            <SearchIcon />
          </div>
        </NavLink>
      </div>
      {tagList.length !== 0 ? (
        <div className="relative mx-8 -top-4 z-0">
          <div className="absolute bg-blue-200 p-2 pt-4 flex flex-wrap rounded-bl-2xl rounded-br-2xl z-0">
            {renderTagList}
            <button
              className="btn-pr-small mt-1"
              onClick={() => {
                setTagList([] as albumType[]);
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ModalSearch;
