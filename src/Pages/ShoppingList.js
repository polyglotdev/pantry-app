import React from "react";
import NavBar from "../Navbar";
import ShoppingCart from "../ShoppingCart"
import GeneratedShoppingList from "../GeneratedShoppingList"

function ShoppingList() {
  return <div className="App">
    <NavBar />
    <GeneratedShoppingList /> 
</div>
}

export default ShoppingList;
