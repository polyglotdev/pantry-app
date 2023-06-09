import React from "react"
import NavBar from "../Navbar"
import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import LazySusanRoundLogo from '../LazySusanRoundLogo.png'


export default function LoginPage() {
    /* mike start here*/
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(null)
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("username:", username);
        console.log("password:", password);
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { username, password });
            console.log(response.data)
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("user", response.data.userID);
            navigate("/");
        } catch(error) {
            console.error();
            setError("Database not found");
        }
    };
    return (
        <>
            <NavBar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-13 w-auto"
                        src= {LazySusanRoundLogo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" /*action="#" method="POST"*/ onSubmit={ handleSubmit }>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) =>setUsername(event.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Sign in
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}