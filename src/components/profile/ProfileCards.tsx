import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCards, getProfileCards } from '../../firebase';
import { cardType, cardTypeShort, userType } from '../../types';
import { UserContext } from '../../UserProvider';

export default function ProfileCards() {
  const user: userType = useContext(UserContext);

  const [isLoadedCards, setLoadedCards] = useState<boolean>(false);
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);
  const [cards, setCards] = useState<cardType[]>([]);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [type, setType] = useState<'fav' | 'all'>('all');

  useEffect(() => {
    const dCards = cards;
    const getter = async () => {
      if (cardArray.length === 0) {
        if (type === 'all') {
          setCardArray(await getProfileCards(user, 'all'));
        }
        if (type === 'fav') {
          setCardArray(await getProfileCards(user, 'fav'));
        }
      }

      let cards: number[];

      if (order === 'desc') {
        cards = cardArray.slice().reverse();
      }
      if (order === 'asc') {
        cards = cardArray.slice();
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
        if (type === 'all' && user.cardsID.length === 0) {
          setLoadedCards(true);
        }
        if (type === 'fav' && user.cardsIDFav.length === 0) {
          setLoadedCards(true);
        }
        if (cardsCount !== 0 && cardArray.length !== 0) {
          setLoadedCards(true);
        }
      }
    };

    getter();

    return () => {};
  }, [order, type, cardsCount, cardArray, window.location.pathname.substr(9)]);

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
    <div className="w-full">
      <div className="w-full flex justify-center items-center flex-col">
        <p className="mr-2 whitespace-nowrap text-lg font-medium cursor-default text-blue-700">Фильтры:</p>
        <div className="w-full flex flex-wrap justify-center mt-2">
          <button
            className="btn-pr cursor-pointer flex items-center"
            onClick={() => {
              setCards([]);
              setCardArray([]);
              setLoadedCards(false);
              setCardsCount(0);
              if (order === 'asc') setOrder('desc');
              if (order === 'desc') setOrder('asc');
            }}
          >
            {order === 'desc' ? 'Сначала новые' : 'Сначала старые'}
          </button>
          <button
            className="btn-pr cursor-pointer flex items-center ml-4"
            onClick={() => {
              setCards([]);
              setCardArray([]);
              setLoadedCards(false);
              setCardsCount(0);
              if (type === 'all') {
                setType('fav');
              }
              if (type === 'fav') {
                setType('all');
              }
            }}
          >
            {type === 'all' ? 'Все карты' : 'Избранные'}
          </button>
        </div>
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
