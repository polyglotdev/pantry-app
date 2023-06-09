import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

function RecipeCategory() {
  return (
    <div className="flex justify-center my-8">
      <NavLink to="/cuisine/Italian" className="flex flex-col justify-center items-center rounded-full p-4 m-4 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-16 h-16 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-4 hover:ring-green-500 transition-all duration-300">
        <FaPizzaSlice className="text-2xl  text-white" />
        <h4 className="text-sm">Italian</h4>
      </NavLink>
      <NavLink to="/cuisine/American" className="flex flex-col justify-center items-center rounded-full p-4 m-4 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-16 h-16 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-4 hover:ring-green-500 transition-all duration-300">
        <FaHamburger className="text-2xl  text-white" />
        <h4 className="text-sm text-white">American</h4>
      </NavLink>
      <NavLink to="/cuisine/Thai" className="flex flex-col justify-center items-center rounded-full p-4 m-4 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-16 h-16 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-4 hover:ring-green-500 transition-all duration-300">
        <GiNoodles className="text-2xl  text-white" />
        <h4 className="text-sm  text-white">Thai</h4>
      </NavLink>
      <NavLink to="/cuisine/Japanese" className="flex flex-col justify-center items-center rounded-full p-4 m-4 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-16 h-16 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-4 hover:ring-green-500 transition-all duration-300">
        <GiChopsticks className="text-2xl  text-white" />
        <h4 className="text-sm  text-white">Japanese</h4>
      </NavLink>
    </div>
  );
}

export default RecipeCategory;