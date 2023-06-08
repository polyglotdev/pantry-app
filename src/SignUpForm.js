import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export default function SignUpForm() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { username, password }
        try{
            axios.post('http://localhost:3001/auth/register', user)
            .then(res => {
                console.log(res)
                console.log(res.data)
                navigate('/login')
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
<<<<<<< HEAD
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"> 
            <form>
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                            Create a username and password for your LazySusan.
                        </p>

                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                    Username
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            placeholder="janesmith"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                    Password
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="password"
                                            id="password"
                                            autoComplete="password"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Your password must be at least 8 characters long."
                                        
                                        />
                                    </div>
=======
        <div className="flex justify-center">
            <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
    {/* <!-- Statistics Cards --> */}
        <form>
            <div className="space-y-12 sm:space-y-16">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">New User</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                        Create a username and password for your LazySusan.
                    </p>

                    <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Username
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                Password
                            </label>
                            <div className="mt-2 sm:col-span-2 sm:mt-0">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Your password must be at least 8 characters long."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
>>>>>>> d865e9c8de0cd04dcda150434d617eb6884c2c45
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form> 
=======
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button 
                type="button" 
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate('/login')}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>
        </form>
        </div>
>>>>>>> d865e9c8de0cd04dcda150434d617eb6884c2c45
        </div>
    )
}