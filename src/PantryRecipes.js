import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import axios from "axios";


    
function PantryRecipe() {
  const [inventory, setInventory] = useState([]);
  const [pantryRecipe, setPantryRecipe] = useState([]);
  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userID = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:3001/item/inventory/${userID}`);
        const inventoryData = response.data;
        setInventory(inventoryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchPantryRecipe = async () => {
      const ingredientsNames = inventory.map((item) => item.name).join(",");
      console.log(ingredientsNames);
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=0ae06dc4401d466997fffeb5bdf5ff3d&ingredients=${ingredientsNames}&number=4`);
        const data = response.data;
        console.log(data);
        setPantryRecipe(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPantryRecipe();
  }, [inventory]);

    return  (
    <div className="flex justify-center">
    <div className="h-full ml-14 mr-14  mb-10 md:ml-20 md:mr-20 w-screen">
    <div className="m-0 p-0 box-border bg-white-100"><h3 className="text-2xl font-extrabold ml-3 mb-4">Recipe Suggestions </h3>
    <div className="border-none bg-gradient-to-br from-blue-200 to-gray-100 shadow-lg rounded-md justify-between p-3 border-b-4 border-gray-700 dark:border-gray-600 text-gray-600 font-medium group">
    
      {pantryRecipe && pantryRecipe.length > 0 ? (
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
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