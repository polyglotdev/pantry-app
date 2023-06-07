import React from "react";
import NavBar from "../Navbar";
import Recipe from "../Recipe"
import LowStock from "../LowStockRecipes";
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";


function Recipes() {
  return <div className="App">
    <NavBar />
    <RecipeSearch />
    <RecipeCategory />
    <Recipe />
    <LowStock />
  
</div>
}

export default Recipes;