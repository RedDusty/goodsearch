import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAlbums } from '../../firebase';
import { albumType } from '../../types';

function AlbumsContainer() {
  const [albumsCount, setAlbumCount] = useState<number>(0);
  const [isLoadedAlbums, setLoadedAlbums] = useState<boolean>(false);
  const [albums, setAlbums] = useState<albumType[]>([]);

  useEffect(() => {
    const dAlbums = albums;
    const getter = async () => {
      const fbAlbums = await getAlbums(10, albumsCount);
      if (fbAlbums.length !== 0) {
        const concated = dAlbums?.concat(fbAlbums);
        setAlbums(concated);
      } else {
        setLoadedAlbums(true);
      }
    };

    getter();

    return () => {};
  }, [albumsCount]);

  document.title = 'Hornylib albums';

  const renderAlbums = albums?.map((album: albumType) => {
    return (
      <NavLink
        to={'/album/' + album.name}
        className="w-36 h-24 ss:w-40 sl:w-44 sm:h-32 md:w-56 xm:w-60 2xl:w-64 2xl:h-40 3xl:w-72 m-1 sl:m-2 md:m-3 sm:m-1 2xl:m-5 3xl:m-3 rounded-xl hoverBlockShadow"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${album.image})`
        }}
        key={`link${album.id}`}
      >
        <div
          className="w-full h-full bg-black text-white hover:text-blue-100 hover:bg-blue-800 font-medium bg-opacity-50 flex flex-col justify-center items-center rounded-xl hover:bg-opacity-25"
          key={`div${album.id}`}
        >
          <p key={`pname${album.id}`}>{album.name}</p>
          <p key={`pcount${album.id}`}>{album.count}</p>
        </div>
      </NavLink>
    );
  });
  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap ">{renderAlbums}</div>
      {isLoadedAlbums ? (
        <div className="p-4 bg-blue-200 text-blue-800 hover:bg-pink-200 hover:text-pink-800 w-min whitespace-nowrap mx-auto my-4 rounded-xl">
          <p className="font-medium">All albums are loaded</p>
        </div>
      ) : (
        <button
          onClick={() => {
            const newCount = albumsCount + 10;
            setAlbumCount(newCount);
          }}
          className="btn-pr my-4"
        >
          <p>More</p>
        </button>
      )}
    </div>
  );
}

export default AlbumsContainer;
