import React from "react";
import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import {useNavigate} from "react-router-dom";
import {  Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { BsFillTrashFill, BsFillCartPlusFill,BsFillPencilFill} from "react-icons/bs";
import { FaSearch } from 'react-icons/fa'
import EditItem from "./EditItem"
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editItemId, setEditItemId] = useState(null);

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

    const openEditModal = (itemId) => {
      setEditItemId(itemId);
      setIsEditModalOpen(true);
    };
   
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
  
 
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
       const deleteRow = (itemID) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
       
          axios.delete(`http://localhost:3001/item/${itemID}`);
         window.location.reload()
      }
      
   
      const shopRow = (itemID) => {
        // Shopping logic here
      };
   
      const editRow = (itemID) => {
        navigate(`/updateitem/${itemID}`);
      };

      return (
        <main className="min-h-full flex-1 flex-col px-6 py-12">
         
          <div className="mt-14 mb-10 md:ml-20 md:mr-20">
             {/* <h1 className="text-2xl font-extrabold mb-4">Search</h1> */}
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <label htmlFor="search-dropdown" className="sr-only">
                {selectedOption.label}
              </label>
              <SearchDropdown
                dropdownOptions={dropdownOptions}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                onSearchSubmit={handleSearchSubmit}
              />
              <div className="relative flex-grow">
                <input
                  type="search"
                  id="search-dropdown"
                  className="w-10/12 py-2.5 pl-9 pr-12 text-sm text-gray-900 bg-gradient-to-bl from-gray-100 to-blue-200  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700
                  dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
                  className="absolute top-0  px-9 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-gray-100 to-blue-200  rounded-r-lg  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700
                  dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <FaSearch style={{ color: 'green' }} className="w-5 h-5 " />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
    
          {filteredItems.length === 0 && searchQuery !== '' ? (
            <p className="px-3 py-4 text-center text-sm text-gray-500">
              No items found.
            </p>
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
                              onClick={() => openEditModal(item._id)}
                             />

                              <BsFillTrashFill
                                className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                                onClick={() => deleteRow(item._id)}
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
    <Dialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto p-6">
            <div className="flex justify-end">
              <XMarkIcon
                className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900"
                onClick={closeEditModal}
              />
            </div>


            <EditItem itemId={editItemId} closeModal={closeEditModal} />
          </div>
        </div>
      </Dialog>

  </div>
  </div>
      )}


      </main>
    );
  }

  
