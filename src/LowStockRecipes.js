import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LowStock() {
  const [lowStock, setLowStock] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const userID = localStorage.getItem("user");
        const response = await axios.get(`http://localhost:3001/item/inventory/${userID}`);
        const inventoryData = response.data;
        const data = inventoryData.filter((item) => item.quantity <= item.minimumQuantity);
        setLowStockItems(data);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchLowStockRecipe = async () => {
      if (lowStockItems.length === 0) {
        return; // Return early if lowStockItems is empty
      }

      const ingredientsNames = lowStockItems.map((item) => item.name).join(",");
      console.log(ingredientsNames);
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=0ae06dc4401d466997fffeb5bdf5ff3d&ingredients=${ingredientsNames}&number=3`);
        const data = response.data;
        console.log(data);
        setLowStock(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLowStockRecipe();
  }, [lowStockItems]);

  return (
    <div className="m-0 p-0 box-border bg-white-100">
      <h3 className="text-2xl font-bold mb-4 text-gradient">Low Stock Dishes</h3>
      <div className="bg-gray-100 wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
        {!isLoading ? ( // Render only when loading is false
          lowStock && lowStock.length > 0 ? (
            <Splide
              options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem",
              }}
            >
              {lowStock.map((recipe) => (
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
            <p>No low stock dishes available</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default LowStock;
