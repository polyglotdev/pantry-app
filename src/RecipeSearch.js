import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function RecipeSearch() {
    const[input, setInput] =useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/recipesearched/'+ input)
    }

  return (
    <form 
    onSubmit={submitHandler}
    className="justify-center flex pt-2 relative w-full">
        <div>
            <FaSearch style={{ color: 'white' }} className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2"></FaSearch>
            <input 
            onChange={(e)=> setInput(e.target.value)}
            type="text" 
            value={input}
            className="w-full border-none bg-gradient-to-br from-gray-900 to-gray-700 text-white text-lg px-12 py-2 rounded-lg focus:outline-none"/>

        </div>
    </form>
  ) 
}

export default RecipeSearch