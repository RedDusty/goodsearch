import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCards } from "../../firebase";
import { cardTypeShort } from "../../types";

function AlbumPage() {
  const [album, setAlbum] = useState<string>();
  const [cards, setCards] = useState<cardTypeShort[]>([]);
  const [cardsCount, setCardsCount] = useState<number>(0);
  useEffect(() => {
    setAlbum(window.location.pathname.substring(7));
    const dAlbums = cards;
    const getter = async () => {
      const fbAlbums = await getCards(
        10,
        cardsCount,
        window.location.pathname.substring(7)
      );
      const concated = dAlbums?.concat(fbAlbums);
      setCards(concated);
    };

    getter();

    return () => {};
  }, [window.location.pathname.substring(7), cardsCount]);

  const renderCards = cards?.map((card: cardTypeShort) => {
    return (
      <NavLink
        to={"/card/" + card.id}
        className="w-56 h-32 m-4 font-medium flex flex-col justify-center items-center rounded-xl"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${card.fileURL})`,
        }}
        key={card.id}
      ></NavLink>
    );
  });
  return (
    <div className="h-full w-full">
      <div className="flex flex-wrap">{renderCards}</div>
      <button
        onClick={() => {
          const newCount = cardsCount + 10;
          setCardsCount(newCount);
        }}
        className="btn-pr mt-4"
      >
        <p>More</p>
      </button>
    </div>
  );
}

export default AlbumPage;
