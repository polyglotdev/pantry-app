import React from "react";
import NavBar from "../Navbar";
import Recipe from "../Recipe"
import Veggie from "../Veggie";
import RecipeCategory from "../RecipeCategory";


function Recipes() {
  return <div className="App">
    <NavBar />
    <RecipeCategory />
    <Recipe />
    <Veggie />
  
</div>
}

export default Recipes;