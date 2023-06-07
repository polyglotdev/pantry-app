import { useState } from "react";
import { useEffect } from "react";
import ExpiringItems from "./Pages/ExpiringItems";
import axios from 'axios'


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
