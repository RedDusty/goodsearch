import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAlbum, getCards } from '../../firebase';
import { cardTypeShort } from '../../types';

function AlbumPage() {
  const [album, setAlbum] = useState<string>();
  const [cards, setCards] = useState<cardTypeShort[]>([]);
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);
  const [isLoadedCards, setLoadedCards] = useState<boolean>(false);

  useEffect(() => {
    setAlbum(window.location.pathname.substring(7));
    const dCards = cards;
    const getter = async () => {
      if (cardArray.length === 0) {
        setCardArray((await getAlbum(window.location.pathname.substr(7))).reverse());
      }

      const fbCards = await getCards(cardArray.slice(cardsCount, cardsCount + 10));

      if (cardArray.slice(cardsCount, cardsCount + 10).length !== 0) {
        const concated = dCards?.concat(fbCards);
        setCards(concated);
      } else {
        if (cardsCount !== 0 && cardArray.length !== 0) {
          setLoadedCards(true);
        }
      }
    };

    getter();

    return () => {};
  }, [window.location.pathname.substring(7), cardsCount, cardArray]);

  document.title = album || 'GoodSearch album';

  const renderCards = cards?.map((card: cardTypeShort) => {
    return (
      <NavLink
        to={'/card/' + card.id}
        className="w-36 h-24 ss:w-40 sl:w-44 sm:h-32 md:w-56 xm:w-60 2xl:w-64 2xl:h-40 3xl:w-72 m-2 sl:m-3 md:m-4 sm:m-2 2xl:m-6 3xl:m-4 rounded-xl hoverBlockShadow bg-gray-300"
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
      <div className="flex flex-wrap">{renderCards}</div>
      {isLoadedCards ? (
        <div className="p-4 bg-blue-200 text-blue-800 hover:bg-pink-200 hover:text-pink-800 w-min whitespace-nowrap mx-auto my-4 rounded-xl">
          <p className="font-medium">All cards are loaded</p>
        </div>
      ) : (
        <button
          onClick={() => {
            const newCount = cardsCount + 10;
            setCardsCount(newCount);
          }}
          className="btn-pr my-4"
        >
          <p>More</p>
        </button>
      )}
    </div>
  );
}

export default AlbumPage;
