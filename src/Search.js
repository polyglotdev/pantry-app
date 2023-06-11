import React from "react";
import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import {useNavigate} from "react-router-dom";
import { BsFillTrashFill, BsFillCartPlusFill,BsFillPencilFill} from "react-icons/bs";
import { FaSearch } from 'react-icons/fa'
import axios from "axios";



export default function Search() {
    const dropdownOptions = [
      { id: 'item', label: 'Item' },
      { id: 'foodGroup', label: 'Food Group' },
      { id: 'pantry', label: 'Pantry' },
      { id: 'refrigerator', label: 'Refrigerator' },
      { id: 'freezer', label: 'Freezer' },
      // { id: 'dietaryType', label: 'Dietary Type'}
    ];
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
      const user = localStorage.getItem('user');
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
          const items = response.data; // Assuming the API response contains the items
          setItems(items);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    
 
    const handleSearchSubmit = (event) => {
      event.preventDefault();

      const filtered = items.filter(item => {
        if (selectedOption.id === 'item'){
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }else if (selectedOption.id === 'foodGroup'){
          return item.foodGroup.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (selectedOption.id === 'pantry') {
          return item.location === 'pantry' && item.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (selectedOption.id === 'refrigerator') {
          return item.location === 'refrigerator' && item.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (selectedOption.id === 'freezer') {
          return item.location === 'freezer' && item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
       return false;
      })
      setFilteredItems(filtered);
      };
      

      const handleSelectOption = (option) => {
      setSelectedOption(option);
      setSearchQuery('')
      setFilteredItems([])
      
      
       };
       const deleteRow = (itemID, location) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
          axios.delete(`http://localhost:3001/item/${itemID}`);
          if (location === "pantry") {
            setPantryItems(pantryItems.filter((item) => item._id !== itemID));
          }
          if (location === "refrigerator") {
            setRefrigeratorItems(refrigeratorItems.filter((item) => item._id !== itemID));
          }
          if (location === "freezer") {
            setFreezerItems(freezerItems.filter((item) => item._id !== itemID));
          }
      }
      };
   
      const shopRow = (itemID) => {
        // Shopping logic here
      };
   
      const editRow = (itemID) => {
        navigate(`/updateitem/${itemID}`);
      };

  
    
  
    return (
      <main >
      <div className="h-full ml-8  mt-14 mb-10 md:ml-20 md:mr-4 p">
        <form onSubmit={handleSearchSubmit} className="flex ">
          <div className="m1-auto">
           <SearchDropdown
              dropdownOptions={dropdownOptions}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onSearchSubmit={handleSearchSubmit}
            />
{/*          
          <div className="relative"> */}
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              {selectedOption.label}
            </label>
               </div>
          {/* </div> */}
            {/* <div className="relative w-full"> */}
            <div className="mr-auto">
            <div className=" mt-14 ">
              <input
                type="search"
                id="search-dropdown"
                className="p-2.5 w-full max h-11 border-none bg-gradient-to-br from-blue-200 to-gray-100 text-gray text-lg px-7 py-5 rounded-lg rounded-l-none focus:outline-none"
                // className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder={selectedOption.label}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault(); 
                    handleSearchSubmit(event); 
                  }
                }}
              />
              <button
                type="submit"
                className=" mr=auto top-1/2  transform -translate-y-1/2 text-green-900">
              {/*  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-300 rounded-r-lg border border-blue-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >  */}
              

                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* <span className="sr-only">Search </span> */}
              </button>
              </div>
            </div>
            
        </form>
       
            
        
        {/* <div className="mt-8 flow-root"> */}
          {filteredItems.length === 0 && searchQuery !== '' ? (
            <p className="px-3 py-4 text-center text-sm text-gray-500">
        No items found.</p>
         ) : (
          <div className="flex justify-center">
          <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
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
           
                  {filteredItems.map((item, index) => (
                    <tr key={index} className='border-b border-gray-400'>
                        <td className="py-2 px-8 text-left">
                           
                              {item.name
                                .split(' ')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                                }
                              {/* </a> */}
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
                            <BsFillPencilFill
                                className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                                onClick={() => editRow(item._id)}
                              />
                              <BsFillTrashFill
                                className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                                onClick={() => deleteRow(item._id, item.location)}
                              />
                              <BsFillCartPlusFill
                                className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                                onClick={() => shopRow(item._id)}
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
      )}
</div>

</main>
    );
  }

  
