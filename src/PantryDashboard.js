import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'


export default function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [refrigeratorItems, setRefrigeratorItems] = useState([]);
  const [freezerItems, setFreezerItems] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const user = localStorage.getItem('user');

    useEffect(() => {
      const fetchInventory = async () => {
        try {
          // Make API request with the userID
          const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
          const inventoryData = response.data;

          setInventory(inventoryData);
  
          const pantryItems = inventoryData.filter((item) => item.location === 'pantry');
          setPantryItems(pantryItems);
  
          const refrigeratorItems = inventoryData.filter((item) => item.location === 'refrigerator');
          setRefrigeratorItems(refrigeratorItems);
  
          const freezerItems = inventoryData.filter((item) => item.location === 'freezer');
          setFreezerItems(freezerItems);

          const currentDate = new Date();
          const expiringItems = inventoryData.filter((item) => {
            const alertDate = new Date(item.alertDate);
            return alertDate <= currentDate;
          });

           setExpiringItems(expiringItems);

        } catch (error) {
          console.error('Error fetching inventory:', error);
        }
      };
  
      fetchInventory();
    }, []);

    useEffect(() => {
      // Store the current scroll position in the session storage
      sessionStorage.setItem('scrollPosition', scrollPosition);
    }, [scrollPosition]);


    return ( 
      <div className="flex justify-center">
        <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
    {/* <!-- Statistics Cards --> */}
    
        {/* <!-- Statistics Cards --> */}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{expiringItems.length}</p>
              <p>Expiring Soon</p>
            </div>
          </div>
          <div className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" stroke="0" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5" d="M19 1v2H5V1H3v22h2v-2h14v2h2V1h-2zm0 4v6h-6V7H7v4H5V5h14zm-2 14v-4h-6v4H5v-6h14v6h-2z"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{pantryItems.length} </p>
              <p>Pantry Quantity</p>
            </div>
          </div>
          <div className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path><path d="M5 10h14"></path><path d="M9 13v3"></path><path d="M9 13v3"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{refrigeratorItems.length}</p>
              <p>Refrigerator Quantity</p>
            </div>
          </div>
          <div className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="0" viewBox="0 0 17 15" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5" d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0M0 0h24v24H0z 1-.5.5z"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{freezerItems.length}</p>
              <p>Freezer Quantity</p>
            </div>
          </div>
        </div>



        {/* <!-- Pantry Summaries --> */}


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-4 text-black dark:text-white">
          <div className="md:col-span-2 xl:col-span-3">
            <h3 className="text-lg font-semibold">My Lazy Susan</h3>
          </div>
          <div className="md:col-span-2 xl:col-span-1">
            <div className="rounded bg-gray-200 dark:bg-gray-800 p-3">
              <div className="flex justify-between py-1 text-black dark:text-white">
                <h3 className="text-sm font-semibold">Pantry</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-black dark:text-gray-50 mt-2">
              {pantryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer"
                >
                <a href={`/updateitem/${item._id}`} className="text-blue-600">
                  {item.name}
                </a>
                  {expiringItems.includes(item) && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-red-700 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Expiring Soon
                    </span>
                  </div>
                )}
                {item.isLowStock && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-yellow-600 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Low Stock
                    </span>
                  </div>
                )}
                </div>
              ))}
              <p className="mt-3 text-gray-600 dark:text-gray-400">View</p>
            </div>
            </div>
          </div>
          <div>
            <div className="rounded bg-gray-200 dark:bg-gray-800 p-3">
              <div className="flex justify-between py-1 text-black dark:text-white">
                <h3 className="text-sm font-semibold">Refrigerator</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-black dark:text-gray-50 mt-2">
              {refrigeratorItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer"
                >
                <a href={`/updateitem/${item._id}`} className="text-blue-600">
                  {item.name}
                </a>
                  {expiringItems.includes(item) && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-red-700 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Expiring Soon
                    </span>
                  </div>
                )}
                {item.restock && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-yellow-600 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Low Stock
                    </span>
                  </div>
                )}
                </div>
              ))}
                <p className="mt-3 text-gray-600 dark:text-gray-400">View</p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded bg-gray-200 dark:bg-gray-800 p-3">
              <div className="flex justify-between py-1 text-black dark:text-white">
                <h3 className="text-sm font-semibold">Freezer</h3>
                <svg className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>
              </div>
              <div className="text-sm text-black dark:text-gray-50 mt-2">
              {freezerItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer"
                >
                <a href={`/updateitem/${item._id}`} className="text-blue-600">
                  {item.name}
                </a>
                  {expiringItems.includes(item) && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-red-700 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Expiring Soon
                    </span>
                  </div>
                )}
                {item.restock && (
                  <div className="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                    <span className="bg-yellow-600 rounded p-1 text-xs flex items-right">
                      <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                      </svg>
                      Low Stock
                    </span>
                  </div>
                )}
                </div>
              ))}
                <p className="mt-3 text-gray-600 dark:text-gray-400">View</p>
              </div>
            </div>
            </div>
          </div>
        </div>
       </div> 
      


    )
  }