import React, { useState } from 'react';
import RadioWithDropdown from './RadioWithDropdown.js';


const [item, setItem] = useState(
  {name: '', 
  quantity: 0, 
  expirationDate: '',
  location: '',
  foodGroup: '',
});

const [items, setItems]=useState([]);

const handleAddItem = () => {
  // setItems(items.concat(item))
  setItems([...items, item]),
  setItem({
    name:'',
    quantity:'',
    expirationDate: new Date(),
    location:'',
    foodGroup: '',
  })
}

export default function CreateItem(){
  return(
  <main className="flex min-h-screen flex-col justify-center bg-green-900 p-12">
     
  {/* Insert logo here */}
      
  <h1 className="text-3xl font-bold text-white ">Lazy Susan Inventory</h1>
  <p className="mb-8 font-semibold text-gray-100">Add Items to your Lazy Susan</p>
  <div className="w-full rounded-xl bg-white p-4 shadow-2xl shadow-white/40">
    <div className="mb-4 grid grid-cols-1 gap-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-semibold">Name</label>
        <input 
        type="text" 
        id="name" 
        required 
        minLength={3} 
        maxLength={30} 
        value= {item.name} 
        onChange={(e) => setItem(Object.assign({}, item, {name: e.target.value}))}
        className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-00/40 active:ring active:ring-blue-500/40" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="quantity" className="mb-2 font-semibold">Quantity</label>
        <input type="number" id="quantity" 
        name="quantity" 
        min="1" 
        max="50" 
        required 
        value={item.quantity}
        onChange={(e) => setItem(Object.assign({}, item, {quantity: e.target.value}))}
        className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-gray-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40" />
      </div>
        <div className="mb-4 flex flex-col">
      <label htmlFor="expirationDate" className="mb-2 w-2/3 font-semibold">Expiration Date</label>
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 h-5 w-5 text-slate-400" viewBox="0 0 0 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
        </svg>
        <input 
        type="date" 
        id="expirationDate"
        value={item.expirationDate}
        onChange={(e) => setItem(Object.assign({}, item, {expirationDate: e.target.value}))}
        className="w-full rounded-lg border border-slate-200 px-2 py-1 pl-8 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40" />
      </div>
      {/* Add Radio with dropdown feature*/}
      <RadioWithDropdown
      items={items}
      selectedLocation={item.location}
      setSelectedLocation={(location) => setItem(Object.assign({}, item, { location }))}
      />
      
   
    {/* Add item button*/}
    <div className="mb-4 flex flex-col" >
       <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
        onClick={handleAddItem}
       >
       Add Item
      </button>
      </div>
    </div>
  </div>  
</main>
)
}