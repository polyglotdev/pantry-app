import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { set } from 'mongoose';


const Update = ({itemId}) => {
  const [item, setItem] = useState({});
  const [alertOption, setAlertOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/item/${itemId}`);
        const parsedItem = {
          ...response.data,
          expirationDate: new Date(response.data.expirationDate).toISOString().split('T')[0],
          alertDate: response.data.alertDate ? new Date(response.data.alertDate).toISOString().split('T')[0] : ''
        };
        setItem(parsedItem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [itemId]);

  const options = [
    { label: '1 week before', value: '1' },
    { label: '2 weeks before', value: '2' },
    { label: '3 weeks before', value: '3' },
    { label: '1 month before', value: '4' },
  ];

  const calculateAlertDate = () => {
    if (!item.expirationDate || !alertOption) {
      return '';
    }

    const expirationDate = new Date(item.expirationDate);
    const parsedAlertOption = parseInt(alertOption);
    const alertDate = new Date(
      expirationDate.getTime() - parsedAlertOption * 7 * 24 * 60 * 60 * 1000
    );

    return alertDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  useEffect(() => {
    if (item.expirationDate && alertOption) {
      const calculateDate = calculateAlertDate();
      setItem((prevItem) => ({ ...prevItem, alertDate: calculateDate }));
    }
  }, [item.expirationDate, alertOption]);

  const handleUpdateItem = async () => {
  try {
    // Make the HTTP request to update the item
    const response = await axios.put(`http://localhost:3001/item/${itemId}`, item);

    // Handle the successful update
    console.log('Item updated successfully:', response.data);
    window.location.reload();
  } catch (error) {
    // Handle the error
    console.log('Error updating item:', error);
    // You can perform additional error handling here, such as displaying an error message
  }
};

  return(
    <div>
    <h1 className="text-3xl font-bold text-black ">Update: {item.name}</h1>
    <br></br>
    <div className="w-full rounded-xl bg-white p-4 shadow-2xl shadow-teal/40">
      {/* White Background  */}
      <div className="mb-5 grid grid-cols-1 gap-5">
        <div className="flex flex-col md: gap-5">
      {/* Item Information */}
        {/* <div className='md:col-span-2'>
        <div className='flex justify-end items-start'>
       <div className='w-1/2 bg-white p-4 shadow-2xl shadow-teal/40'>
    <div className='absolute inset-y-0 right-0 w-16'></div>
  
        <ItemInformation 
          item={item} 
           
          />
      </div></div></div> */}
          <label htmlFor="name" className="mb-2 font-semibold">Name</label>
          <input 
          type="text" 
          id="name" 
          required 
          minLength={3} 
          maxLength={30} 
          value= {item.name} 
          onChange={(e) => setItem({...item, name: e.target.value})}
          
          className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-00/40 active:ring active:ring-blue-500/40" />
        </div>
  
        {/* Unit input */}
        <div className="mb-5 flex flex-col">
          <label htmlFor="unit" className="mb-2 font-semibold">
            Unit
          </label>
          <div>
            <select
              id="unit"
              value={item.unit}
              onChange={(e) => setItem({ ...item, unit: e.target.value })}
              className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            >
              <option value="" disabled>
                Select a unit
              </option>
              <option value="fl_oz">Fluid Ounce (fl oz)</option>
              <option value="cups">Cup (c)</option>
              <option value="pt">Pint (pt)</option>
              <option value="qt">Quart (qt)</option>
              <option value="gal">Gallon (gal)</option>
              <option value="oz">Ounce (oz)</option>
              <option value="lb">Pound (lb)</option>
              <option value="bags">Bags</option>
              <option value="boxes">Boxes</option>
              <option value="bunches">Bunches</option>
              <option value="heads">Heads</option>
              <option value="pieces">Pieces</option>
              <option value="packs">Packs</option>
              <option value="jars">Jars</option>
              <option value="bottles">Bottles</option>
            </select>
          </div>
        </div>
  
        {/* Quanity Input */}
        <div className="mb-5 grid-cols-1 gap-1 flex flex-col">
          <label htmlFor="quantity" className="mb-2 font-semibold">Quantity</label>
          <input 
          type="number" 
          d="quantity" 
          name="quantity" 
          min= '1'  
          max= '50'
          required 
          value={item.quantity}
          onChange={(e) => setItem({...item, quantity: Number(e.target.value)})}
          className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40" />
        {/* Expiration Date Input */}
        <div className= "mb-5 grid-cols-1 gap-1 flex flex-col">
        <label htmlFor="expirationDate" className="mb-2 w-2/3 font-semibold">Expiration Date</label>
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 h-5 w-5 text-slate-400" viewBox="0 0 0 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
          <input 
          type="date" 
          id="expirationDate"
          value={item.expirationDate}
          required
          onChange={(e) => setItem({...item, expirationDate: e.target.value})}
          className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40" />
        {/* Add Radio with dropdown feature*/}
        <div className="mb-5 grid-cols-1 gap-1 flex flex-col"></div>
        <label htmlFor="location" className="mb-2 font-semibold">
      Location
    </label>
    <div>
      <select
        id="location"
        value={item.location}
        onChange={(e) => setItem({ ...item, location: e.target.value })}
        className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
      >
        <option value="" disabled>
          Select a location
        </option>
        <option value="pantry">Pantry</option>
        <option value="freezer">Freezer</option>
        <option value="refrigerator">Refrigerator</option>
      </select>
    </div>
  </div>
  
  <div className="mb-5 flex flex-col">
    <label htmlFor="foodGroup" className="mb-2 font-semibold">
      Food Group
    </label>
    <div>
      <select
        id="foodGroup"
        value={item.foodGroup}
        onChange={(e) => setItem({ ...item, foodGroup: e.target.value })}
        className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
      >
        <option value="" disabled>
          Select a food group
        </option>
        <option value="Baking Supplies">Baking Supplies</option>
        <option value="Canned Goods">Canned Goods</option>
        <option value="Condiments">Condiments</option>
        <option value="Grain">Grain</option>
        <option value="Legumes">Legumes</option>
        <option value="Snacks">Snacks</option>
        <option value="Condiments & Sauces">Condiments & Sauces</option>
        <option value="Dairy Products">Dairy Products</option>
        <option value="Eggs">Eggs</option>
        <option value="Fresh Fruits & Vegetables">Fresh Fruits & Vegetables</option>
        <option value="Meat & Poultry">Meat & Poultry</option>
        <option value="Frozen Breads">Frozen Breads</option>
        <option value="Frozen Fruits and Vegetables">Frozen Fruits and Vegetables</option>
        <option value="Prepared Meals">Prepared Meals</option>
        <option value="Seafood">Seafood</option>
      </select>
      </div>
    </div>
  
        {/* Alert Date Input */}
     <div className= "mb-5 flex flex-col">  
     <label className="text-base font-semibold text-gray-900">Alert Notification Settings
        </label>
        <p className="text-sm text-gray-500">Set alert notifications for your Lazy Susan item</p>
        <div className="mt-2">
        <label htmlFor="alertOption" className='block mb-1 font-semibold'>
          Alert Option
        </label>
        <select
        id='alertOption'
        value={alertOption}
        onChange={(e) => setAlertOption(e.target.value)}
        className='w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1
         hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring
          active:ring-blue-500/40'>
  
       
          <option value=''disabled>
            Select an alert option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
          ))}
        </select>
        {/* Display Alert Date */}
        </div>
        {item.alertDate && (<p className ='mt-2 text-gray-500'>
          Alert Date: {item.alertDate}
        </p>
        )}
        </div>  
  
     {/* Minimum Quanity Input */}
     <div className="flex flex-col">
      
          <label htmlFor="minimumQuantity" className="mb-2 font-semibold">Minimum Quantity</label>
          <input 
          type="number" 
          id="minimumQuantity" 
          name="minimumQuantity" 
          min="1"  
          max="50" 
          required 
          value={item.minimumQuantity}
          onChange={(e) => setItem({...item, minimumQuantity: Number(e.target.value)})}
          className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40" />
     
     
     
      {/* Add item button*/}
      <div className="mb-5 grid-cols-1 gap-5 flex flex-col"></div>
         <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
          onClick={handleUpdateItem}
         >
         Update Item
        </button> 
        </div>
      </div>
    </div> 
  </div>
  </div>  
 )
}

Update.propTypes = {
  itemId: PropTypes.string.isRequired,
  // Other prop types
};


export default Update;

