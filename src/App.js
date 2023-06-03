import React from 'react'
import './index.css';
import './App.css'
import Main from './Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'
import Pantry from './Pages/Pantry'
import ShoppingList from './Pages/ShoppingList'
import LoginPage from './Pages/LoginPage'
import LazySusan from './Pages/LazySusan'
import ItemForm from './Pages/CreateItem'
import Update from './Pages/EditItem'
import SearchPage from './Pages/SearchPage';
import StartShopping from './Pages/StartShopping'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lazysusan" element={<LazySusan />} />
        <Route path="/itemform" element={<ItemForm />} />
        <Route path="/update" element={<Update />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/startshopping" element={<StartShopping />} />

        
      
      </Routes>
    </Router>
  )
}

export default App
