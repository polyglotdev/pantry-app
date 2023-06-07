import ExpiringItems from "./Pages/ExpiringItems";
import axios from 'axios'
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from "react-router-dom"


export default function Recipe(){
        const [inventory, setInventory] = useState([]);
        const [expiringItems, setExpiringItems] = useState([]);
      
        useEffect(() => {
        const fetchInventory = async () => {
            try {
            const userID = localStorage.getItem('user');
    
            // Make API request with the userID
            const response = await axios.get(`http://localhost:3001/item/inventory/${userID}`);
            const inventoryData = response.data;
    
            setInventory(inventoryData);
    
            const currentDate = new Date();
            const expiringItems = inventoryData.filter((item) => {
                const alertDate = new Date(item.alertDate);
                return alertDate <= currentDate;
            });
    
            setExpiringItems(expiringItems);
            } catch (error) {
            console.error('Error fetching inventory:', error);
            }
        };
        fetchInventory();
}, []);
      
  

/*useEffect(() => {
    getRandomRecipes();
}, []);*/

useEffect(() => {
    getIngredientRecipes();
}, [ExpiringItems]);


// const getRandomRecipes = async() => {
//     const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=b547eeba93b64b919c846a7549289de9&number=8`);
//     const randomData = await api.json();
//     console.log(randomData);
//     }

const getIngredientRecipes = async() => {
    const ingredientsNames = expiringItems.map((item)=> item.name).join(",");
    console.log(ingredientsNames);
    const api = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=0ae06dc4401d466997fffeb5bdf5ff3d&ingredients=${ingredientsNames}&number=5`);
    const data = await api.json();
    console.log(data);
    }
} 

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
            {recipe.map((recipeItem) => (
              <SplideSlide key={recipeItem.id}>
                <div className="min-h-25rem rounded overflow-hidden relative">
                  <Link to={'/recipedetail/' + recipeItem.id}>
                    <div className="absolute z-10 left-0 bottom-0 mb-4 text-center w-full">
                      <p
                        className="text-white text-xl font-semibold"
                        style={{
                          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                        }}
                      >
                        {recipeItem.title}
                      </p>
                    </div>
                    <img
                      className="mt-2 rounded-xl w-full h-full object-cover border border-gray-200"
                      src={recipeItem.image}
                      alt={recipeItem.title}
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
  );
