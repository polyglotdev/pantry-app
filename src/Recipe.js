import { useState } from "react";
import { useEffect } from "react";
import ExpiringItems from "./Pages/ExpiringItems";


export default function Recipe(){

const [inventory, setInventory] = useState([]);
const [expiringItems, setExpiringItems] = useState([]);
 
useEffect(() => {
    const fetchItemInventory = async () => {

      const user = localStorage.getItem('user');

      try {
        const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
        setInventory(response.data)
        const currentDate = new Date();
          const expiringItems = inventory.filter((item) => {
            const alertDate = new Date(item.alertDate);
            return alertDate <= currentDate;
            
        });
            setExpiringItems(expiringItems)
            
                   
    } catch (error) {
        console.error('Error fetching inventory:', error);
        }
    }
}, []);

useEffect(() => {
    getRandomRecipes();
}, []);

useEffect(() => {
    getIngredientRecipes();
}, [ExpiringItems]);


const getRandomRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=b547eeba93b64b919c846a7549289de9&number=8`);
    const data = await api.json();
    console.log(data);
    }

const getIngredientRecipes = async() => {
    const ingredientsNames = expiringItems.map((item)=> item.name).join(",");
    const api = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=b547eeba93b64b919c846a7549289de9&ingredients=${ingredientsNames}&number=3`);
    const data = await api.json();
    console.log(data);
    } 
} 
