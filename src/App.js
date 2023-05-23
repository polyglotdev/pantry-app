import React from 'react'
import './index.css';
import './App.css'
import Main from './Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'
import Pantry from './Pages/Pantry'
import ShoppingList from './Pages/ShoppingList'
import LoginPage from './Pages/LoginPage'
<<<<<<< HEAD

=======
>>>>>>> a1482174933d195d820a5de5f371a2f8dfcd0399
import LazySusan from './Pages/LazySusan'



<<<<<<< HEAD

=======
>>>>>>> a1482174933d195d820a5de5f371a2f8dfcd0399

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
        
      
<<<<<<< HEAD

=======
>>>>>>> a1482174933d195d820a5de5f371a2f8dfcd0399
      </Routes>
    </Router>
  )
}

export default App
