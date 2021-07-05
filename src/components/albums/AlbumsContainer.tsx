import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAlbums } from "../../firebase";
import { albumType } from "../../types";

function AlbumsContainer() {
  const [albumsCount, setAlbumCount] = useState<number>(0);
  const [albums, setAlbums] = useState<albumType[]>([]);


  useEffect(() => {
    const dAlbums = albums;
    const getter = async () => {
      const fbAlbums = await getAlbums(10, albumsCount);
      const concated = dAlbums?.concat(fbAlbums);
      setAlbums(concated);
    };

    getter();

    return () => {};
  }, [albumsCount]);

  document.title = "Hornylib albums"

  const renderAlbums = albums?.map((album: albumType) => {
    return (
      <NavLink
        to={"/album/" + album.name}
        className="w-40 h-24 sm:w-56 sm:h-32 m-4 rounded-xl"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${album.image})`,
        }}
        key={album.id}
      >
        <div className="w-full h-full bg-black text-white font-medium bg-opacity-50 flex flex-col justify-center items-center rounded-xl">
          <p>{album.name}</p>
          <p>{album.count}</p>
        </div>
      </NavLink>
    );
  });
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap">{renderAlbums}</div>
      <button
        onClick={() => {
          const newCount = albumsCount + 10;
          setAlbumCount(newCount);
        }}
        className="btn-pr mt-4"
      >
        <p>More</p>
      </button>
    </div>
  );
}

export default AlbumsContainer;
