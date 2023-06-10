import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { BsFillTrashFill, BsFillCartPlusFill,BsFillPencilFill} from "react-icons/bs";

export default function Example() {
  const [pantryItems, setPantryItems] = useState([]);
  const [refrigeratorItems, setRefrigeratorItems] = useState([]);
  const [freezerItems, setFreezerItems] = useState([]);

  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchInventory = async () => {
      const user = localStorage.getItem("user");

      try {
        const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
        const inventoryData = response.data;

        const pantryItems = inventoryData.filter((item) => item.location === "pantry");
        setPantryItems(pantryItems);

        const refrigeratorItems = inventoryData.filter((item) => item.location === "refrigerator");
        setRefrigeratorItems(refrigeratorItems);

        const freezerItems = inventoryData.filter((item) => item.location === "freezer");
        setFreezerItems(freezerItems);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);



  const deleteRow = (itemID, location) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      axios.delete(`http://localhost:3001/item/${itemID}`);
      if (location === "pantry") {
        setPantryItems(pantryItems.filter((item) => item._id !== itemID));
      }
      if (location === "refrigerator") {
        setRefrigeratorItems(refrigeratorItems.filter((item) => item._id !== itemID));
      }
      if (location === "freezer") {
        setFreezerItems(freezerItems.filter((item) => item._id !== itemID));
      }
  }
  };

  const shopRow = async (itemId, restock) => { 
      const addNow = window.confirm("Are you sure you want to add this to your shopping list?")
        // Make the HTTP request to update the item
        if (addNow) {
          try{
           const response = await axios.put(`http://localhost:3001/item/${itemId}`, {restock: true});
          console.log("Shopping list updated!")
          console.log(response.data)
        } catch (error) {
          console.error("Something went wrong")

        };
      };
    }


  const editRow = (itemID) => {
    navigate(`/updateitem/${itemID}`);
  };


  return (
    <div className="flex justify-center">
      <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
      <h1 className="text-2xl font-extrabold mb-4">My Lazy Susan Inventory</h1>
        {/* Pantry Card */}
        <h2 className="text-2xl font-bold mb-4">Pantry</h2>
        <div className="table-wrapper overflow-x-auto">
          <div className="container flex bg-gray-200 rounded-lg p-2">
            <table className="table flex-auto bg-blue-100 shadow-lg rounded-lg min-w-max-screen">
            {/* sets the width of each column/ so they will have the same width */}
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
              {pantryItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      {/* <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600"> */}
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
                        onClick={() => editRow(item._id)}
                      />
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item._id, item.location)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item._id, item.restock)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refrigerator Card */}
        <div className="mt-6"></div>
        <h2 className="text-2xl font-bold mt-2 mb-4">Refrigerator</h2>
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
              {refrigeratorItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      {/* <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600"> */}
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
                        onClick={() => editRow(item._id)}
                      />
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item._id, item.location)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item._id, item.restock)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Freezer Card */}
        
        <div className="mt-6"></div>
        <h2 className="text-2xl font-bold mt-2 mb-4">Freezer</h2>
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
              {freezerItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-400">
                    <td className="py-2 px-8 text-left">
                      {/* <a href={`/updateitem/${item._id}`} className="text-green-800 hover:text-green-600"> */}
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
                        //this should navigate you to the edit item page with the item id
                        onClick={() => editRow(item._id)}
                      />
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item._id, item.location)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item._id, item.restock)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
  );
}
