import React from 'react'
import { Fragment, useState } from 'react'
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


const pantryItem = [
    { name: 'Baked Beans', quantity: '2', unit: 'cans', foodType: 'Canned Goods', expirationDate: 'October 2, 2025' },
    // More pantryItem...
  ]
  const refrigeratorItem = [
    { name: 'Yogurt', quantity: '12', unit: 'oz', foodType: 'Dairy', expirationDate: 'October 2, 2023' },
    // More pantryItem...
  ]
  const freezerItem = [
    { name: 'Chicken ', quantity: '2', unit: 'lbs', foodType: 'Meat', expirationDate: 'October 2, 2023' },
    // More pantryItem...
  ]

  export default function Example() {
    return ( 
    <div className="mx-auto max-w-5xl">
      <div className="bg-gray-900">
          <div className="bg-gray-900 py-10">
            <div className="px-4 sm:px-6 lg:px-8"> 
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-night">My Pantry</h1>
                  <p className="mt-2 text-sm text-night-300">
                    A list of all items in your pantry including their name, quantity, unit, .
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
                        {pantryItem.map((item) => (
                          <tr key={item.unit}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.quantity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.foodType}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.expirationDate}</td>
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
      

<div className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-jet">My 
                  Refrigerator</h1>
                  <p className="mt-2 text-sm text-jet-300">
                    A list of all items in my refrigerator including their name, quantity, and unit.
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
                        {refrigeratorItem.map((item) => (
                          <tr key={item.unit}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodType}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.expirationDate}</td>
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
      </div>

      <div className="bg-gray-900">
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
                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-night hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Edit My Freezer
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-night-700">
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
                      <tbody className="divide-y divide-night-800">
                        {freezerItem.map((item) => (
                          <tr key={item.unit}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodType}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.expirationDate}</td>
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
      </div>
      </div>
      </div>
      </div>
      </div>
      
    )
  }