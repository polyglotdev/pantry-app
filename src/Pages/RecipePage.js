import React from "react";
import NavBar from "../Navbar";
import Recipe from "../Recipe"
import Veggie from "../Veggie";
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";


function Recipes() {
  return <div className="App">
    <NavBar />
    <RecipeSearch />
    <RecipeCategory />
    <Recipe />
    <Veggie />
  
</div>
}

export default Recipes;