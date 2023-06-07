import axios from 'axios'
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from "react-router-dom"
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import '@splidejs/splide/dist/css/splide.min.css';


export default function Recipe(){
    const [recipe, setRecipe] = useState([]);
    const [expiringItems, setExpiringItems] = useState([]);
      
    useEffect(() => {
      const fetchInventory = async () => {
        try {
        const userID = localStorage.getItem('user');

        // Make API request with the userID
        const response = await axios.get(`http://localhost:3001/item/inventory/${userID}`);
        const inventoryData = response.data

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

  const getIngredientRecipes = async() => {
    const ingredientsNames = expiringItems.map((item)=> item.name).join(",");
    console.log(ingredientsNames);
    const api = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=1b432fa04d7a4f608cc1e4ad6491a8c9&ingredients=${ingredientsNames}&number=5`);
    const data = await api.json();
    setRecipe(data.recipes);
    console.log(data);
    }

  useEffect(() => {
    getIngredientRecipes();
  }, [expiringItems]);
  
  return (
    <div className="m-0 p-0 box-border bg-white-100">
    <h3 className="text-2xl font-bold mb-4 text-gradient">Pantry Fare Farewell: Transforming Expiring Ingredients</h3>
    <div className="bg-gray-100 wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
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
                <Link to={'/recipedetail/' + recipe.id}>
                  <div className="absolute z-10 left-0 bottom-0 mb-4 text-center w-full">
                    <p
                      className="text-white text-xl font-semibold"
                      style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)" }}
                    >
                      {recipe.title}
                    </p>
                    <img
                      className="mt-2 rounded-xl w-full h-full object-cover border border-gray-200"
                      src={recipe.image}
                      alt={recipe.title}
                      style={{ borderRadius: "2rem" }}
                    />
                  </div>
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
}