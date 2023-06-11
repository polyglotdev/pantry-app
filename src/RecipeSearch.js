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
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-2xl font-extrabold mb-4">Recipes</h1>
    <form 
    onSubmit={submitHandler}
    className="justify-center flex pt-4 relative w-full">
       <div className='relative w-full mt-6 mx-28'>
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900">
            <FaSearch style={{ color: 'green' }} ></FaSearch>
            </div>
            <input 
            onChange={(e)=> setInput(e.target.value)}
            type="text" 
            value={input}
            className="w-full border-none bg-gradient-to-br from-gray-100 to-blue-200 text-gray text-lg px-12 py-2 rounded-lg focus:outline-none"/>

        </div>
    </form>
  </main>
  ) 
  
}

export default RecipeSearch