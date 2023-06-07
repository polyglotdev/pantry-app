import React from "react";
import NavBar from "../Navbar";
import PantryDashboard from "../PantryDashboard";
import PantryRecipe from "../PantryRecipes";


function Home() {
  return <div className="App">
    <NavBar />
    <PantryDashboard />
    <PantryRecipe />
</div>
}

export default Home