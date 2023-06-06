import { useEffect } from "react";

//import itemModel from "itemMode../item";

let recipeForExpiring = [];

function Recipe(){
   // if(ItemSchema.methods.isExpiringSoon === true) {
   //     recipeForExpiring.push(ItemSchema.name)
    //}
useEffect(() => {
    getRandomRecipes();
}, []);

useEffect(() => {
    getIngredientRecipes();
}, []);


const getRandomRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=a088ac7df3e54e29b9bc9e5d4e75a7db&number=8`);
    const data = await api.json();
    console.log(data);
    }

const getIngredientRecipes = async() => {
    const api = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=a088ac7df3e54e29b9bc9e5d4e75a7db&number=5')
    const data = await api.json();
    console.log(data);
}    
}


export default Recipe