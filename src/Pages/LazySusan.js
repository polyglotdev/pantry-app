import React from "react"
import NavBar from "../Navbar"
import LazySusanRoundLogo from '../LazySusanRoundLogo.png'
import { Link } from "react-router-dom"


export default function LoginPage() {
    


    return (
        <>
            <NavBar />
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-13 w-auto"
                        src= {LazySusanRoundLogo}
                        alt="Your Company"
                    />
                </div>
                
               
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    
                    <h4 className="mt-5 text-center text-xl leading-9 tracking-tight text-gray-900">
                        While grocery shopping, do you forget if you have an ingredient at home? 
                    </h4>
                    <h4 className="mt-4 text-center text-xl leading-9 tracking-tight text-gray-900">
                        Or have you ever struggled to find a recipe that uses your expiring ingredients? 
                    </h4>
                    <h4 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                    Look no further for your solution.
                    </h4>
                    <h4 className="mt-10 text-center text-xl leading-9 tracking-tight text-gray-900">
                    Team Rocket presents its first app, Lazy Susan. This app was curated by the finest engineers in the industry, with the shared mission to reduce food waste. The team banded together to utilize ReactJS, MongoDB, and TailwindCSS to create a one-of-a-kind solution. Whether it is in the pantry, refrigerator, or freezer, Lazy Susan provides you with the information you need, such as quantity and expiration date, to shop smart and discover unique recipes for you and your family.                    </h4>
                    <h2 className="mt-10 text-center text-2xl font-bold leading- tracking-tight text-gray-1000">
                    JOIN LAZY SUSAN TODAY!                    
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" /*action="#" method="POST" /*onSubmit={ handleSubmit }*/>           
                        <div>
                            <Link to="/signup">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Sign Up
                            </button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/login">
                            <button
                                type="login-submit"
                                className="flex w-full justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Login
                            </button>
                            </Link>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}
