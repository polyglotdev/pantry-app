import React from "react";
import NavBar from "../Navbar";
import GeneratedShoppingList from "../GeneratedShoppingList";


function StartShopping() {
  return <div className="App">
    <NavBar />
    <GeneratedShoppingList />
  </div>
}

export default StartShopping;