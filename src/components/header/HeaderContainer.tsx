import React from 'react';
import MenuIcon from '../icons/MenuIcon';

const HeaderContainer: React.FC<{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; isOpen: boolean }> = ({
  setIsOpen,
  isOpen
}) => {
  return (
    <button
      className="absolute left-6 top-6 w-12 h-12 hover:bg-pink-300 hover:text-pink-900 bg-blue-300 text-blue-900 fill-current rounded-full p-2 z-30"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <MenuIcon />
      </div>
    </button>
  );
};

export default HeaderContainer;
