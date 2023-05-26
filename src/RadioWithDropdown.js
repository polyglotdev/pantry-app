import React, { useState } from 'react';



const RadioWithDropdown = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const locations = [
    { id: 'pantry', label: 'Pantry', foodGroups: ['Baking Supplies', 'Canned Goods', 'Condiments', 'Grain','Legumes', 'Snacks'] },
    { id: 'refrigerator', label: 'Refrigerator', foodGroups: ['Condiments & Sauces', 'Dairy Products', 'Eggs', 'Fresh Fruits & Vegetables', 'Meat & Poultry'] },
    { id: 'freezer', label: 'Freezer', foodGroups: ['Frozen Breads', 'Frozen Fruits and Vegetables', 'Meat and Poultry', 'Prepared Meals', 'Seafood'] },
  ];

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div>
      <label className="text-base font-semibold text-gray-900">Item Location</label>
      <p className="text-sm text-gray-500">Where would you like to store your Lazy Susan Item?</p>
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
     
      {selectedLocation && (
        <select className="inline-flex w-2/3 justify-center gap-x-1. rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {locations.find((location) => location.id === selectedLocation)?.foodGroups.map((foodGroup, index) => (
            <option key={index}>{foodGroup}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RadioWithDropdown;