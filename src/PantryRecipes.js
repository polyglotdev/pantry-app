import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";


    
function PantryRecipe() {
    const [pantryRecipe, setPantryRecipe] = useState([]);
  
    useEffect(() => {
      getPantryRecipe();
    }, []);
  
    const getPantryRecipe = async () => {
      // const check = localStorage.getItem('veggie');
  
      // if (check) {
      //   setVeggie(JSON.parse(check));
      // } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=fafd9ff6a143416a83ad19289ee5490d&number=9&tags=vegetarian`);
        const data = await api.json();
        // localStorage.setItem('veggie', JSON.stringify(data.recipes));
        setPantryRecipe(data.recipes);
        console.log(data.recipes);
      }
    

    return  (
    <div className="flex justify-center">
    <div className="h-full ml-14 mr-14  mb-10 md:ml-20 md:mr-20 w-screen">
    <div className="m-0 p-0 box-border bg-white-100"><h3 className="text-1xl font-semi-bold mb-4 text-gradient">Pantry Dishes </h3>
    <div className=" bg-gray-100 wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
    
      {pantryRecipe && pantryRecipe.length > 0 ? (
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {pantryRecipe.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <div className="min-h-25rem rounded overflow-hidden relative">
              <Link to={'/recipedetail/'+ recipe.id}>
                <div className="absolute z-10 left-0 bottom-0 mb-4 text-center w-full">
                  <p
                    className="text-white text-xl font-semibold"
                    style={{
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {recipe.title}
                  </p>
                </div>
                <img
                  className="mt-2 rounded-xl w-full h-full object-cover border border-gray-200"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ borderRadius: "2rem" }}
                />
                </Link>
              </div>
            </SplideSlide>
          ))}
        </Splide>
                 ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
    </div>
    </div>
    )
}
;


export default PantryRecipe;