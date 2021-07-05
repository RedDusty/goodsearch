import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  document.title = "Not found";
  return (
    <div className="w-full h-full justify-center items-center flex flex-col">
      <div className="text-red-800 bg-red-100 p-2 md:p-4 lg:p-6 rounded-lg">
        <p className="text-6xl lg:text-8xl font-medium">404</p>
        <p className="text-4xl lg:text-6xl">Page not found!</p>
      </div>
      <NavLink to="/" className="btn-pr mt-6">Main</NavLink>
    </div>
  );
};

export default NotFound;
