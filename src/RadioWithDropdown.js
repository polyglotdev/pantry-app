import React, { useState } from 'react';
import PropTypes from 'prop-types'





const RadioWithDropdown = () => {
  const [selectedLocation , setSelectedLocation] = useState('');
  const[selectedFoodGroup, setSelectedFoodGroup] = useState('');

  const locations = [
    { id: 'pantry', label: 'Pantry', foodGroups: ['Baking Supplies', 'Canned Goods', 'Condiments', 'Grain','Legumes', 'Snacks'] },
    { id: 'refrigerator', label: 'Refrigerator', foodGroups: ['Condiments & Sauces', 'Dairy Products', 'Eggs', 'Fresh Fruits & Vegetables', 'Meat & Poultry'] },
    { id: 'freezer', label: 'Freezer', foodGroups: ['Frozen Breads', 'Frozen Fruits and Vegetables', 'Meat and Poultry', 'Prepared Meals', 'Seafood'] },
  ];

  const handleLocationChange = (event) => {
    const selectedLocation  = event.target.value;
    setSelectedLocation(event.target.value);
    setSelectedFoodGroup('');
  };
  const handleFoodGroupChange =(event) =>{
    const selectedFoodGroup = event.target.value;
    setSelectedFoodGroup(event.target.value);
  }

  return (
    <div>
      <label className="text-base font-semibold text-gray-900">Item Location</label>
      <p className="text-sm text-gray-500">Where would you like to store your Lazy Susan item?</p>
      <fieldset className="mt-5">
        <legend className="sr-only">location</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center">
              <input
                id={location.id}
                name="location"
                type="radio"
                value={location.id}
                checked={selectedLocation === location.id}
                onChange={handleLocationChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor={location.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {location.label}
              </label>
           </div>
          ))}
        </div>
       </fieldset>
      
       <select 
       className='w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1
       hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring
        active:ring-blue-500/40'
       value={selectedFoodGroup} 
       onChange={handleFoodGroupChange}>

         <option value='' disabled>
              Select a food group
            </option>

          {locations.find((location) => location.id === selectedLocation)?.foodGroups.map((foodGroup, index) => (
            <option key={index} value={foodGroup}>
            {foodGroup}  
            </option>
            
          ))}
        </select>
    </div>
  );
};


export default RadioWithDropdown;