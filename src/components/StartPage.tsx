import { Link } from "react-router-dom";
import SearchIcon from "./icons/SearchIcon";

const StartPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-blue-500 hover:text-pink-400 font-medium italic text-6xl my-4">
        Hornylib
      </p>
      <div className="bg-blue-100 shadow-xl w-4/5 md:w-2/4 min-w-min m-4 rounded-2xl box-content flex justify-center items-center">
        <input
          type="text"
          className="w-full h-8 bg-gray-100 outline-none hover:bg-white focus:bg-white rounded-xl p-2 m-2"
          placeholder="Search..."
        />
        <div className="w-px h-10 border-solid border-l border-black"></div>
        <button className="w-12 h-12 outline-none hover:bg-pink-200 focus:bg-pink-300 pl-2 rounded-tr-2xl rounded-br-2xl fill-current text-blue-400 hover:text-pink-600 focus:text-pink-700">
          <div className="w-6 h-6">
            <SearchIcon />
          </div>
        </button>
      </div>
      <div className="flex mt-4">
        <Link to="/all" className="btn-pr">
          Show all
        </Link>
        <Link to="/upload" className="btn-pr ml-4">
          Upload
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
