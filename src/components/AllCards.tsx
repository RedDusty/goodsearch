import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllCards } from '../firebase';
import { cardType } from '../types';

function AllCards() {
  const [lastId, setLastId] = useState<number | string>('');
  const [isLoadedCards, setLoadedCards] = useState<boolean>(false);
  const [cards, setCards] = useState<cardType[]>([]);
  const [update, setUpdate] = useState<number>(0);

  useEffect(() => {
    const dCards = cards;
    const getter = async () => {
      const fbCards = await getAllCards(10, lastId);
      if (fbCards.length !== 0) {
        const concated = dCards?.concat(fbCards);
        setCards(concated);
        setLastId(fbCards.slice(-1)[0].id);
      } else {
        setLoadedCards(true);
      }
    };

    getter();

    return () => {};
  }, [update]);

  document.title = 'GoodSearch карты';

  const renderCards = cards?.map((card: cardType) => {
    return (
      <NavLink
        to={'/card/' + card.id}
        className="w-32 h-24 ss:w-40 sl:w-40 sm:h-32 md:w-52 xm:w-60 2xl:w-64 2xl:h-40 3xl:w-72 m-1 sl:m-3 md:m-3 sm:m-2 2xl:m-2 3xl:m-2 rounded-xl hoverBlockShadow bg-gray-300"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url('${card.fileURL}')`
        }}
        key={`link${card.id}`}
      ></NavLink>
    );
  });
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap w-full justify-center">{renderCards}</div>
      {isLoadedCards ? (
        <div className="p-4 bg-blue-200 text-blue-800 hover:bg-pink-200 hover:text-pink-800 w-min whitespace-nowrap mx-auto my-4 rounded-xl">
          <p className="font-medium">Нет новых карт.</p>
        </div>
      ) : (
        <button
          onClick={() => {
            setUpdate(update + 1);
          }}
          className="btn-pr my-4"
        >
          <p>Ещё</p>
        </button>
      )}
    </div>
  );
}

export default AllCards;
