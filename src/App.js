import React from 'react'
import './App.css'
import Main from './Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'
import Pantry from './Pages/Pantry'
import ShoppingList from './Pages/ShoppingList'
import LoginPage from './Pages/LoginPage'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
