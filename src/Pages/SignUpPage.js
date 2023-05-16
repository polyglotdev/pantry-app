import React from 'react'
import './App.css'
import NavBar from './Navbar'
import Main from './Main'
import SignUpForm from './SignUpForm'

function SignUpPage() {
  return (
    <div className="App">
        <h1>Sign Up</h1>
      <NavBar />
      <Main />
      <SignUpForm />
    </div>
  )
}

export default SignUpPage;
