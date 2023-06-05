import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';


const SearchDropdown = ({ dropdownOptions, selectedOption, onSelectOption, onSearchSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    
    const handleToggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelectOption = (option) => {
      onSelectOption(option);
      setIsOpen(false);
    };
    const handleToggleDropdownClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        setIsOpen(false);
        onSearchSubmit(event);
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleToggleDropdownClick);
      document.addEventListener('keypress', handleKeyPress);
  
      return () => {
        document.removeEventListener('click', handleToggleDropdownClick);
        document.removeEventListener('keypress', handleKeyPress);
      };
    }, []);
  
    return (
      <div className="relative">
        <button
        ref={searchRef}
          className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center
           text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg
            hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700
             dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
             
          onClick={handleToggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedOption.label}
          <svg
            className="w-4 h-4 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
            //  role="menu"
             >
              {dropdownOptions.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleSelectOption(option)}
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  SearchDropdown.propTypes = {
    dropdownOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    selectedOption: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    onSelectOption: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
  };
  
  export default SearchDropdown; 