import React from "react";
import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
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
  
    
  
    return (
      <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form onSubmit={handleSearchSubmit}>
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              {selectedOption.label}
            </label>
            <SearchDropdown
              dropdownOptions={dropdownOptions}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onSearchSubmit={handleSearchSubmit}
            />
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
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
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-300 rounded-r-lg border border-blue-300 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
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
                <span className="sr-only">Search </span>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8 flow-root">
          {filteredItems.length === 0 && searchQuery !== '' ? (
            <p className="px-3 py-4 text-center text-sm text-gray-500">
        No items found.</p>
         ) : (
  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-night sm:pl-0">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-night">
              Quantity
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-night">
              Unit
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-night">
              Food Group
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-night">
              Expiration Date
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-night">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-blue-100 rounded-s pl-4 pr-4 py-2 shadow-s">
          {filteredItems.map((item, index) => (
            <tr key={index}> 
              <td className="whitespace-nowrap py-3 pr-3 text-sm text-center font-medium text-night sm:pl-0">{item.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-night-300">{item.quantity}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-night-300">{item.unit}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-night-300">{item.foodGroup}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-night-300">{new Date(item.expirationDate).toLocaleDateString('en-US')}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-night-300">{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
      )}
</div>
      </main>
    );
  }

  
