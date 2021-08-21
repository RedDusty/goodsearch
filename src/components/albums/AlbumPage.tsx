import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAlbum, getAlbumName, getCards } from '../../firebase';
import { cardTypeShort } from '../../types';

function AlbumPage() {
  const [album, setAlbum] = useState<string>();
  const [cards, setCards] = useState<cardTypeShort[]>([]);
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);
  const [isLoadedCards, setLoadedCards] = useState<boolean>(false);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const dCards = cards;
    const getter = async () => {
      setAlbum(await getAlbumName(window.location.pathname.substr(7)));
      if (cardArray.length === 0) {
        setCardArray(await getAlbum(window.location.pathname.substr(7)));
      }

      let cards: number[];

      if (order === 'desc') {
        cards = cardArray.slice();
      }
      if (order === 'asc') {
        cards = cardArray.slice().reverse();
      }
      
      const fbCards = await getCards(cards!.slice(cardsCount, cardsCount + 10));

      if (cardArray.slice(cardsCount, cardsCount + 10).length !== 0) {
        if (order === 'desc') {
          const concated = dCards?.concat(fbCards);
          setCards(concated);
        }
        if (order === 'asc') {
          const concated = dCards?.concat(fbCards.slice().reverse());
          setCards(concated);
        }
      } else {
        if (cardsCount !== 0 && cardArray.length !== 0) {
          setLoadedCards(true);
        }
      }
    };

    getter();

    return () => {};
  }, [window.location.pathname.substring(7), cardsCount, cardArray, order]);

  document.title = album || 'GS Альбом';

  const renderCards = cards?.map((card: cardTypeShort) => {
    return (
      <NavLink
        to={'/card/' + card.id}
        className="w-32 h-24 ss:w-40 sl:w-40 sm:h-32 md:w-52 xm:w-60 2xl:w-64 2xl:h-40 3xl:w-72 m-1 sl:m-3 md:m-3 sm:m-2 2xl:m-2 3xl:m-2 rounded-xl hoverBlockShadow bg-gray-300"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url('${card.fileURL}')`
        }}
        key={card.id}
      ></NavLink>
    );
  });
  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center items-center mt-4">
        <p className="mr-2 whitespace-nowrap text-lg font-medium cursor-default text-blue-700">Фильтры:</p>
        <button
          className="btn-pr cursor-pointer flex items-center"
          onClick={() => {
            setCards([]);
            setLoadedCards(false);
            setCardArray([]);
            setCardsCount(0);
            if (order === 'asc') setOrder('desc');
            if (order === 'desc') setOrder('asc');
          }}
        >
          {order === 'desc' ? 'Сначала новые' : 'Сначала старые'}
        </button>
      </div>
      <div className="flex flex-wrap w-full justify-center mt-4">{renderCards}</div>
      {isLoadedCards ? (
        <div className="p-4 bg-blue-200 text-blue-800 hover:bg-pink-200 hover:text-pink-800 w-min whitespace-nowrap mx-auto my-4 rounded-xl">
          <p className="font-medium">Нет новых карт.</p>
        </div>
      ) : (
        <button
          onClick={() => {
            const newCount = cardsCount + 10;
            setCardsCount(newCount);
          }}
          className="btn-pr my-4"
        >
          <p>Ещё</p>
        </button>
      )}
    </div>
  );
}

export default AlbumPage;
