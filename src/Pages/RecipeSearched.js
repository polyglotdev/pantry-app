import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";
   import NavBar from "../Navbar";



   function RecipeSearched() {
 

    const[searchedRecipes, setSearchedRecipes] = useState([]);
    let params =useParams();

    const getRecipeSearched = async (name) => {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=b547eeba93b64b919c846a7549289de9&query=${name}`
        );
        const recipes = await data.json();
        // console.log(recipes);
        setSearchedRecipes(recipes.results);
      };

      useEffect(() => {
        getRecipeSearched(params.RecipeSearched);
      },[params.RecipeSearched])
  
  
      return (
        <>
          <NavBar />
          <RecipeSearch />
          <RecipeCategory />
          <div>
            <div className="mt-5 m-8 grid grid-cols-5 gap-10">
              {searchedRecipes && searchedRecipes.length > 0 ? (
                searchedRecipes.map((item) => (
                  <div key={item.id} className="card">
                    <img src={item.image} alt="" className="h-0.5w-full rounded-2xl" />
                    <h4 className="text-center py-4">{item.title}</h4>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </>
      );
    }
    
    export default RecipeSearched;