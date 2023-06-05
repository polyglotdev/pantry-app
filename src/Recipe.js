import { useEffect } from "react";

function Recipe(){

useEffect(() => {
    getRecipes();
}, []);

const getRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=a088ac7df3e54e29b9bc9e5d4e75a7db&number=5`);
    const data = await api.json();
    console.log(data)
}

}


export default Recipe