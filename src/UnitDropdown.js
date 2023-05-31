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
        <div className="inline-flex w-2/3 justify-center gap-x-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
    </div>
  );
};

export default UnitDropdown;
