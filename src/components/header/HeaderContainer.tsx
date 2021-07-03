import { NavLink } from "react-router-dom";
import SearchIcon from "../icons/SearchIcon";

function HeaderContainer() {
  return (
    <div className="w-full h-12 bg-gray-100 shadow-lg sticky top-0 flex items-center">
      <button className="btn-pr-small ml-2">
        <NavLink to={"/"}>Main</NavLink>
      </button>
      <div className="bg-blue-100 w-full m-2 rounded-2xl box-content flex justify-center items-center">
        <input
          type="text"
          className="w-full h-6 bg-gray-100 outline-none hover:bg-white focus:bg-white rounded-tl-lg rounded-bl-lg p-1 ml-2"
          placeholder="Search..."
        />
        <div className="w-px h-8 border-solid border-l border-black"></div>
        <button className="w-10 h-10 outline-none hover:bg-pink-200 focus:bg-pink-300 pl-1 rounded-tr-2xl rounded-br-2xl fill-current text-blue-400 hover:text-pink-600 focus:text-pink-700">
          <div className="w-5 h-5 flex justify-center items-center">
            <SearchIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default HeaderContainer;
