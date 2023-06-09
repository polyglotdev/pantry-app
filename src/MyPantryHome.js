import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillTrashFill, BsFillCartPlusFill } from "react-icons/bs";

export default function Example() {
  const [pantryItems, setPantryItems] = useState([]);
  const [refrigeratorItems, setRefrigeratorItems] = useState([]);
  const [freezerItems, setFreezerItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const user = localStorage.getItem("user");

      try {
        const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
        const inventoryData = response.data;

        const pantryItems = inventoryData.filter((item) => item.location === "pantry");
        setPantryItems(pantryItems);

        const refrigeratorItems = inventoryData.filter((item) => item.location === "refrigerator");
        setRefrigeratorItems(refrigeratorItems);

        const freezerItems = inventoryData.filter((item) => item.location === "freezer");
        setFreezerItems(freezerItems);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const deleteRow = (item) => {
    // Delete logic here
  };

  const shopRow = (itemName) => {
    // Shopping logic here
  };

  return (
    <div className="flex justify-center">
      <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
      <h1 className="text-2xl font-extrabold mb-4">My Lazy Susan Inventory</h1>
        {/* Pantry Card */}
        <h2 className="text-2xl font-bold mb-4">Pantry</h2>
        <div className="table-wrapper overflow-x-auto">
          <div className="container flex bg-gray-200 rounded-lg p-2">
            <table className="table flex-auto bg-blue-100 shadow-lg rounded-lg min-w-max-screen">
            {/* sets the width of each column/ so they will have the same width */}
            <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            </colgroup>
<thead>
  <tr>
    <th className="py-2 px-8 text-left">Name</th>
    <th className="py-2 px-8 text-left">Quantity</th>
    <th className="py-2 px-8 text-left">Unit</th>
    <th className="py-2 px-8 text-left">Food Group</th>
    <th className="py-2 px-8 text-left">Expiration Date</th>
    <th className="py-2 px-8 text-left">Action</th>
  </tr>
</thead>
              <tbody>
                {pantryItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
                      {item.name 
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                        }
                      </a>
                    </td>
                    <td className="py-2 px-8 text-left">{item.quantity}</td>
                    <td className="py-2 px-8 text-left">
                      {item.unit.charAt(0).toUpperCase() + item.unit.slice(1)}
                    </td>
                    <td className="py-2 px-8 text-left">{item.foodGroup}</td>
                    <td className="py-2 px-8 text-left">
                      {new Date(item.expirationDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-2 px-8 text-left flex items-center">
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item.name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refrigerator Card */}
        <div className="mt-6"></div>
        <h2 className="text-2xl font-bold mt-2 mb-4">Refrigerator</h2>
        <div className="table-wrapper overflow-x-auto">
          <div className="container flex bg-gray-200 rounded-lg p-2">
            <table className="table flex-auto bg-blue-100 shadow-lg rounded-lg min-w-max-screen">
            <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            </colgroup>
              <thead>
                <tr>
                  <th className="py-2 px-8 text-left">Name</th>
                  <th className="py-2 px-8 text-left">Quantity</th>
                  <th className="py-2 px-8 text-left">Unit</th>
                  <th className="py-2 px-8 text-left">Food Group</th>
                  <th className="py-2 px-8 text-left">Expiration Date</th>
                  <th className="py-2 px-8 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {refrigeratorItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
                      {item.name 
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                        }
                      </a>
                    </td>
                    <td className="py-2 px-8 text-left">{item.quantity}</td>
                    <td className="py-2 px-8 text-left">
                      {item.unit.charAt(0).toUpperCase() + item.unit.slice(1)}
                    </td>
                    <td className="py-2 px-8 text-left">{item.foodGroup}</td>
                    <td className="py-2 px-8 text-left">
                      {new Date(item.expirationDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-2 px-8 text-left flex items-center">
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item.name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Freezer Card */}
        
        <div className="mt-6"></div>
        <h2 className="text-2xl font-bold mt-2 mb-4">Freezer</h2>
        <div className="table-wrapper overflow-x-auto">
          <div className="container flex bg-gray-200 rounded-lg p-2">
            <table className="table flex-auto bg-blue-100 shadow-lg rounded-lg min-w-max-screen">
            <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
</colgroup>
              <thead>
                <tr>
                  <th className="py-2 px-8 text-left">Name</th>
                  <th className="py-2 px-8 text-left">Quantity</th>
                  <th className="py-2 px-8 text-left">Unit</th>
                  <th className="py-2 px-8 text-left">Food Group</th>
                  <th className="py-2 px-8 text-left">Expiration Date</th>
                  <th className="py-2 px-8 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {freezerItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
                      {item.name 
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                        }
                      </a>
                    </td>
                    <td className="py-2 px-8 text-left">{item.quantity}</td>
                    <td className="py-2 px-8 text-left">
                      {item.unit.charAt(0).toUpperCase() + item.unit.slice(1)}
                    </td>
                    <td className="py-2 px-8 text-left">{item.foodGroup}</td>
                    <td className="py-2 px-8 text-left">
                      {new Date(item.expirationDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-2 px-8 text-left flex items-center">
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item.name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}





















// import React from 'react'
// import axios from 'axios'
// import { Fragment, useState, useEffect } from 'react'
// import { Dialog, Menu, Transition } from '@headlessui/react'
// import {
//   ChartBarSquareIcon,
//   Cog6ToothIcon,
//   FolderIcon,
//   GlobeAltIcon,
//   ServerIcon,
//   SignalIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline'
// import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


//   export default function Example() {
//     const [pantryItems, setPantryItems] = useState([]);
//     const [refrigeratorItems, setRefrigeratorItems] = useState([]);
//     const [freezerItems, setFreezerItems] = useState([]);
    
//     useEffect(() => {
//       const fetchInventory = async () => {

//         const user = localStorage.getItem('user');

//         try {
//           const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
//           const inventoryData = response.data;
  
          
//           const pantryItems = inventoryData.filter((item) => item.location === 'pantry');
//           setPantryItems(pantryItems);
  
//           const refrigeratorItems = inventoryData.filter((item) => item.location === 'refrigerator');
//           setRefrigeratorItems(refrigeratorItems);
  
//           const freezerItems = inventoryData.filter((item) => item.location === 'freezer');
//           setFreezerItems(freezerItems);
//         } catch (error) {
//           console.error('Error fetching inventory:', error);
//         }
//       };
  
//       fetchInventory();
//     }, []);

//     return ( 
//       <div className="flex justify-center">
//       <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
//       <div>
//       <br></br>
//       <h1 className="text-3xl font-bold text-black ">Inventory</h1>
//       <br></br>
//       </div>
//         <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
            
//                   <h1 className="text-base font-semibold leading-6 text-jet">My Pantry</h1>
//                   <p className="mt-2 text-sm text-night-300">
//                     A list of all items in your pantry including their name, quantity, unit, type and expiration date.
//                   </p>
                
//                 {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  
//                 </div> */}
//               <div className="mt-8 flow-root">
//                 <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                   <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                     <table className="min-w-full divide-y divide-gray-700">
//                       <thead>
//                         <tr>
//                           <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">
//                             Name
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Quantity
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Unit
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Food Group
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Expiration Date
//                           </th>
//                           <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
//                             <span className="sr-only">Restock</span>
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-800">
//                         {pantryItems.map((item) => (
//                           <tr key={item.unit}>
//                             <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
//                             <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
//                               {item.name}
//                             </a>
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
//                             <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
//                             <a href="#" className="text-green-800 hover:text-green-600">
//                                 Add to Shopping List<span className="sr-only">, {item.name}</span>
//                               </a>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           {/* <div className="mx-auto max-w-7xl"> */}
//             <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
//                     <h1 className="text-base font-semibold leading-6 text-jet">My
//                       Refrigerator</h1>
//                     <p className="mt-2 text-sm text-night-300">
//                       A list of all items in my refrigerator including their name, quantity, unit, type and expiration date.
//                     </p>
//               <div className="mt-8 flow-root">
//                 <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                   <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                     <table className="min-w-full divide-y divide-gray-700">
//                       <thead>
//                         <tr>
//                           <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">
//                             Name
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Quantity
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Unit
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Food Type
//                           </th>
//                           <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">
//                             Expiration Date
//                           </th>
//                           <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
//                             <span className="sr-only">Restock</span>
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-800">
//                         {refrigeratorItems.map((item) => (
//                           <tr key={item.unit}>
//                             <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
//                             <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
//                               {item.name}
//                             </a>
//                             </td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
//                             <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
//                             <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
//                               <a href="#" className="text-green-800 hover:text-green-600">
//                                 Add to Shopping List<span className="sr-only">, {item.name}</span>
//                               </a>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           {/* </div> */}
        
     
//             <div className="mb-8 bg-blue-100 p-4 rounded-lg shadow">
//                     <h1 className="text-base font-semibold leading-6 text-night">My Freezer</h1>
//                     <p className="mt-2 text-sm text-night-300">
//                       A list of all items in my freezer including their name, quantity, unit, type and expiration date.
//                     </p>
//                 <div className="mt-8 flow-root">
//                   <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                     <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                       <table className="min-w-full divide-y divide-gray-700">
//                         <thead>
//                           <tr>
//                             <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-night sm:pl-0">Name</th>
//                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Quantity</th>
//                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Unit</th>
//                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Food Type</th>
//                             <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-night">Expiration Date</th>
//                             <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
//                               <span className="sr-only">Restock</span>
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-800">
//                           {freezerItems.map((item) => (
//                             <tr key={item.unit}>
//                               <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-night sm:pl-0">
//                               <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600">
//                                 {item.name}
//                               </a>
//                               </td>
//                               <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.quantity}</td>
//                               <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.unit}</td>
//                               <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{item.foodGroup}</td>
//                               <td className="whitespace-nowrap px-3 py-4 text-sm text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
//                               <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
//                                 <a href="#" className="text-green-800 hover:text-green-700">
//                                  Add to Shopping List<span className="sr-only">, {item.name}</span>
//                                 </a>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>    
//             </div>
//       </div>
//     </div>
//     )
//   }