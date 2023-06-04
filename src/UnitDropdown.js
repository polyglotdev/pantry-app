import React, { useState } from 'react';


const UnitDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const units = [
    { value: 'fl_oz', label: 'Fluid Ounce (fl oz)' },
    { value: 'c', label: 'Cup (c)' },
    { value: 'pt', label: 'Pint (pt)' },
    { value: 'qt', label: 'Quart (qt)' },
    { value: 'gal', label: 'Gallon (gal)' },
    { value: 'oz', label: 'Ounce (oz)' },
    { value: 'lb', label: 'Pound (lb)' },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="unit" className="mb-2 font-semibold">
        Unit
      </label>
      <div className="w-64">
        <div className='w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1
       hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring
        active:ring-blue-500/40'>
          <select
            id="unit"
            value={selectedOption}
            onChange={handleChange}
            className="w-full focus:outline-none"
          >
            <option value="" disabled>
              Select a unit
            </option>
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedOption &&(
        <div className='mt-4'>
        <p>Selected Unit: {unit.value}</p>
        </div>
      )}
    </div>
  );
};

export default UnitDropdown;
