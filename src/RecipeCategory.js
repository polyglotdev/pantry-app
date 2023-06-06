import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

function RecipeCategory() {
  return (
    <div className="flex justify-center my-8">
      <NavLink to="/cuisine/Italian" className="flex flex-col items-center mx-4">
        <FaPizzaSlice className="text-4xl mb-2" />
        <h4 className="text-xl">Italian</h4>
      </NavLink>
      <NavLink to="/cuisine/American" className="flex flex-col items-center mx-4">
        <FaHamburger className="text-4xl mb-2" />
        <h4 className="text-xl">American</h4>
      </NavLink>
      <NavLink to="/cuisine/Thai" className="flex flex-col items-center mx-4">
        <GiNoodles className="text-4xl mb-2" />
        <h4 className="text-xl">Thai</h4>
      </NavLink>
      <NavLink to="/cuisine/Japanese" className="flex flex-col items-center mx-4">
        <GiChopsticks className="text-4xl mb-2" />
        <h4 className="text-xl">Japanese</h4>
      </NavLink>
    </div>
  );
}

export default RecipeCategory;