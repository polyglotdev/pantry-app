import React from 'react'
import './index.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'
import Pantry from './Pages/Pantry'
import ShoppingList from './Pages/ShoppingList'
import LoginPage from './Pages/LoginPage'
import LazySusan from './Pages/LazySusan'
import ItemForm from './Pages/CreateItem'
import Update from './Pages/EditItem'
import SearchPage from './Pages/SearchPage'
import StartShopping from './Pages/StartShopping'
import ExpiringItems from './Pages/ExpiringItems'
import Settings from './Pages/Settings'
import SignedOut from './Pages/SignedOut'
import Recipe from './Pages/RecipePage'
import Recipes from './Pages/RecipePage';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LazySusan />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/inventory" element={<Pantry />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/itemform" element={<ItemForm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/startshopping" element={<StartShopping />} />
        <Route path="/updateitem/:itemId" element={<Update/>} />
        <Route path="/expiringitems" element ={<ExpiringItems />} />
        <Route path="/settings" element ={<Settings />} />
        <Route path="/signedout" element ={<SignedOut />} />
        <Route path="/recipe" element ={<Recipes />} />
      </Routes>
    </Router>
  )
}

export default App
