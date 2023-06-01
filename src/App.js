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
<<<<<<< HEAD
import StartShopping from './Pages/StartShopping'

=======
import Update from './Pages/EditItem'
>>>>>>> 0a066033b4a351dd13d9da79e0e4170cfc9db9ab


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
<<<<<<< HEAD
        <Route path="/startshopping" element={<StartShopping />} />

        
=======
        <Route path="/update" element={<Update />} />
>>>>>>> 0a066033b4a351dd13d9da79e0e4170cfc9db9ab
      
      </Routes>
    </Router>
  )
}

export default App
