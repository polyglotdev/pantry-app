import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";
import NavBar from "../Navbar";
import { Link } from 'react-router-dom';




   function RecipeSearched() {
 

    const[searchedRecipes, setSearchedRecipes] = useState([]);
    let params =useParams();

    const getRecipeSearched = async (name) => {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=0ebd3d63b0f742c988e9f8f0764797b2&query=${name}`
        );
        const recipes = await data.json();
        // console.log(recipes);
        setSearchedRecipes(recipes.results);
      };

      useEffect(() => {
        getRecipeSearched(params.recipesearch);
      },[params.recipesearch])
  
  
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
                     <Link to={'/recipedetail/'+ item.id}>
                    <img src={item.image} alt="" className="h-0.5w-full rounded-2xl" />
                    <h4 className="text-center py-4">{item.title}</h4>
                    </Link>
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