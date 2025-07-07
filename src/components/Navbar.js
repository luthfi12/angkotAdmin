import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Monitoring Angkot</div>
      <div className="space-x-4">
        <a href="#home" className="text-white hover:underline">
          Home
        </a>
        <a href="#about" className="text-white hover:underline">
          About
        </a>
        <a href="#profile" className="text-white hover:underline">
          Profile
        </a>
        <Link
          to="/login"
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
