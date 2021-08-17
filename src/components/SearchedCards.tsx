import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCardsBySearch } from '../firebase';
import { cardType } from '../types';

const SearchedCards: React.FC<{ searchCards: string }> = ({ searchCards }) => {
  const [lastId, setLastId] = useState<number | string>('');
  const [isLoadedCards, setLoadedCards] = useState<boolean>(false);
  const [cards, setCards] = useState<cardType[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [lastQuery, setLastQuery] = useState<string>();

  console.log(searchCards);

  useEffect(() => {
    const timeTyping = setTimeout(() => {
      if (lastQuery !== searchCards) {
        setLastId('');
      }
      console.log(searchCards);
      const dCards = cards;
      const getter = async () => {
        const fbCards = await getCardsBySearch(searchCards.split(' '), lastId, 10);
        setLastQuery(searchCards);
        console.log(fbCards);

        if (fbCards.length !== 0) {
          let concated = dCards?.concat(fbCards);
          concated = concated.filter((card, index, self) =>
          index === self.findIndex((t) => (
            t.id === card.id
          ))
        )
          setCards(concated);
          setLastId(fbCards.slice(-1)[0].id);
        } else {
          setLoadedCards(true);
        }
      };

      getter();
    }, 2500);
    return () => {
      clearTimeout(timeTyping);
    };
  }, [update, searchCards]);

  document.title = 'GoodSearch cards';

  const renderCards = cards?.map((card: cardType) => {
    return (
      <NavLink
        to={'/card/' + card.id}
        className="w-36 h-24 ss:w-40 sl:w-44 sm:h-32 md:w-56 xm:w-60 2xl:w-64 2xl:h-40 3xl:w-72 m-2 sl:m-3 md:m-4 sm:m-2 2xl:m-6 3xl:m-4 rounded-xl hoverBlockShadow bg-gray-300"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url('${card.fileURL}')`
        }}
        key={`link${card.id}`}
      ></NavLink>
    );
  });

  const renderTagList = searchCards.split(' ').map((tag: string) => {
    return (
      <div
        className="flex bg-blue-50 p-1 items-center rounded-lg mx-2 my-1 text-blue-900 text-lg hover:bg-pink-200 hover:text-pink-800"
        key={`div${tag}`}
      >
        <p key={`p${tag}`}>{tag}</p>
      </div>
    );
  });
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap justify-center">{renderTagList}</div>
      <div className="flex flex-wrap ">{renderCards}</div>
      {isLoadedCards ? (
        <div className="p-4 bg-blue-200 text-blue-800 hover:bg-pink-200 hover:text-pink-800 w-min whitespace-nowrap mx-auto my-4 rounded-xl">
          <p className="font-medium">All cards are loaded</p>
        </div>
      ) : (
        <button
          onClick={() => {
            setUpdate(update + 1);
          }}
          className="btn-pr my-4"
        >
          <p>More</p>
        </button>
      )}
    </div>
  );
};

export default SearchedCards;
