import React from 'react'
import axios from 'axios'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


  export default function Example() {
    const [pantryItems, setPantryItems] = useState([]);
    const [refrigeratorItems, setRefrigeratorItems] = useState([]);
    const [freezerItems, setFreezerItems] = useState([]);
    
    useEffect(() => {
      const fetchInventory = async () => {

        const user = localStorage.getItem('user');

        try {
          const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
          const inventoryData = response.data;
  
          
          const pantryItems = inventoryData.filter((item) => item.location === 'pantry');
          setPantryItems(pantryItems);
  
          const refrigeratorItems = inventoryData.filter((item) => item.location === 'refrigerator');
          setRefrigeratorItems(refrigeratorItems);
  
          const freezerItems = inventoryData.filter((item) => item.location === 'freezer');
          setFreezerItems(freezerItems);
        } catch (error) {
          console.error('Error fetching inventory:', error);
        }
      };
  
      fetchInventory();
    }, []);

    return ( 
  
    <div className="mx-auto max-w-7xl">
      <div>
      <br></br>
      <h1 className="text-3xl font-bold text-black ">Inventory</h1>
      <br></br>
      </div>
        <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
            <div className="px-5 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-night">My Pantry</h1>
                  <p className="mt-2 text-sm text-night-300">
                    A list of all items in your pantry including their name, quantity, unit, type and expiration date.
                  </p>
                </div>   
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Edit My Pantry
                    </button>
                  </div>
                </div>
                </div>  
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  
                </div>
                
                
            
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Quantity
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Unit
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Food Type
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Expiration Date
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Restock</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {pantryItems.map((item) => (
                          <tr key={item.unit}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                Restock<span className="sr-only">, {item.name}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          
        
        
                     
        
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-jet">My
                      Refrigerator</h1>
                    <p className="mt-2 text-sm text-night-300">
                      A list of all items in my refrigerator including their name, quantity, unit, type and expiration date.
                    </p>
                  </div>
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Edit My Refrigerator
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Quantity
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Unit
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Food Type
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
                            Expiration Date
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Restock</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {refrigeratorItems.map((item) => (
                          <tr key={item.unit}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                Restock<span className="sr-only">, {item.name}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
     
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-night">My Freezer</h1>
                    <p className="mt-2 text-sm text-night-300">
                      A list of all items in my freezer including their name, quantity, unit, type and expiration date.
                    </p>
                  </div>
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Edit My Freezer
                    </button>
                  </div>
                </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">Name</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Quantity</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Unit</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Food Type</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Expiration Date</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                              <span className="sr-only">Restock</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {freezerItems.map((item) => (
                            <tr key={item.unit}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
                                {item.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                  Restock<span className="sr-only">, {item.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              
            </div>
          </div>
       
      </div>
    )
  }