import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userID = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:3001/item/inventory/${userID}`);
        const inventoryData = response.data;
        const currentDate = new Date();
        const expiringItems = inventoryData.filter((item) => {
          const alertDate = new Date(item.alertDate);
          return alertDate <= currentDate;
        });
  
        setExpiringItems(expiringItems);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchExpiringRecipe = async () => {
      if (expiringItems.length === 0) {
        return; // Return early if expiringItems is empty
      }

      const ingredientsNames = expiringItems.map((item) => item.name).join(",");
      console.log(ingredientsNames);
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=0ae06dc4401d466997fffeb5bdf5ff3d&ingredients=${ingredientsNames}&number=3`);
        const data = response.data;
        console.log(data);
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpiringRecipe();
  }, [expiringItems]);

  return (
    <div className="flex justify-center">
    <div className="h-full ml-14 mr-14  mb-10 md:ml-20 md:mr-20 w-screen">
    <div className="m-0 p-0 box-border bg-white-100">
      <h3 className="text-2xl font-bold mb-4 text-gradient">Pantry Fare Farewell: Transforming Expiring Ingredients</h3>
      <div className="bg-gray-100 wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
        {!isLoading ? ( // Render only when loading is false
          recipe && recipe.length > 0 ? (
            <Splide
              options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem",
              }}
            >
              {recipe.map((recipe) => (
                <SplideSlide key={recipe.id}>
                  <div className="min-h-25rem rounded overflow-hidden relative">
                    <Link to={'/recipedetail/' + recipe.id}>
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
            <p>No recipes available</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
     </div>
     </div>
  );
}

export default Recipe;
