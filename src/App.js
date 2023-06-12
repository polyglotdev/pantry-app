import React from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from './Pages/SignUpPage';
import Pantry from './Pages/Pantry';
import ShoppingList from './Pages/ShoppingList';
import LoginPage from './Pages/LoginPage';
import ItemForm from './Pages/CreateItem';
import Update from './Pages/EditItem';
import SearchPage from './Pages/SearchPage';
import StartShopping from './Pages/StartShopping';
import RecipePage from './Pages/RecipePage';
import Alerts from './Pages/Alerts';
import SignedOut from './Pages/SignedOut';
import Home from './Pages/Home';
import LazySusan from './Pages/LazySusan';
import Cuisine from './Pages/Cuisine';
import RecipeSearched from './Pages/RecipeSearched';
import RecipeDetail from './Pages/RecipeDetail';

// Simulating the user login status
const isAuthenticated = localStorage.getItem('user')

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lazysusan" element={<LazySusan />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Routes that require authentication */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Pantry />} />
            <Route path="/shoppinglist" element={<ShoppingList />} />
            <Route path="/itemform" element={<ItemForm />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/startshopping" element={<StartShopping />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/updateitem/:itemId" element={<Update />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/signedout" element={<SignedOut />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cuisine/:type" element={<Cuisine />} />
            <Route path="/recipesearched/:recipesearch" element={<RecipeSearched />} />
            <Route path="/recipedetail/:name" element={<RecipeDetail />} />
          </>
        )}
        {/* Redirect to /lazysusan if not logged in */}
        {!isAuthenticated && <Route path="/" element={<Home/>} />}
      </Routes>
    </Router>
  );
}

export default App;
