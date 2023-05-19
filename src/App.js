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
        
      
      </Routes>
    </Router>
  )
}

export default App
