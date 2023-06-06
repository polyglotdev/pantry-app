import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";

function Recipe() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const check = localStorage.getItem('recipe');

    if (check) {
      setRecipe(JSON.parse(check));
    } else {
     
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=5`);
      const data = await api.json();
      localStorage.setItem('recipe', JSON.stringify(data.recipes));
      setRecipe(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div className="m-0 p-0 box-border bg-white-100">
      <div className="wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
      <h3 className="text-2xl font-bold mb-4 text-gradient">Popular Dishes</h3>
        {recipe && recipe.length > 0 ? (
          <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "5rem",
            }}
          >
            {recipe.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <div className="min-h-25rem rounded overflow-hidden relative">
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
                </div>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Recipe;