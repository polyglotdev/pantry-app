import React from "react";
import NavBar from "../Navbar";
import GeneratedShoppingList from "../GeneratedShoppingList";
import { useNavigate } from "react-router-dom";


function StartShopping() {
  return <div className="App">
    <NavBar />
    <GeneratedShoppingList />
    </div>
}

export default StartShopping;