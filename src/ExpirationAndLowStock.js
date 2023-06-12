import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {  Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import { BsFillTrashFill, BsFillCartPlusFill,BsFillPencilFill} from "react-icons/bs";
import EditItem from "./EditItem"

export default function ExpirationAndLowStock() {
  const [expiringItems, setExpiringItems] = useState([]);
  const [lowsStockItems, setLowStockItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editItemId, setEditItemId] = useState(null);

  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchInventory = async () => {
      const user = localStorage.getItem("user");

      try {
        const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
        const inventoryData = response.data;

        const currentDate = new Date();
        const expiring = inventoryData.filter((item) => {
        const alertDate = new Date(item.alertDate);
        return alertDate <= currentDate;})
        setExpiringItems(expiring)

        const lowStock = inventoryData.filter((item) => item.quantity <= item.minimumQuantity);
        setLowStockItems(lowStock);

       
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);


  const deleteRow = (itemID) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      axios.delete(`http://localhost:3001/item/${itemID}`);
  }
  window.location.reload();
  };

  const shopRow = (itemID) => {
    // Shopping logic here
  };

  const editRow = (itemID) => {
    navigate(`/updateitem/${itemID}`);
  };

  const openEditModal = (itemId) => {
    setEditItemId(itemId);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
      <h1 className="text-4xl font-extrabold mb-4">My Alerts</h1>
        {/* Pantry Card */}
        <h2 className="text-2xl font-bold mb-4">Expiring Items</h2>
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
              {expiringItems.map((item) => (
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
                        onClick={() => openEditModal(item._id)}
                      />
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item._id)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="mt-6"></div>
        <h2 className="text-2xl font-bold mt-2 mb-4">Low Stock Items</h2>
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
              {lowsStockItems.map((item) => (
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
                        onClick={() => openEditModal(item._id)}
                      />
                      <BsFillTrashFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => deleteRow(item._id)}
                      />
                      <BsFillCartPlusFill
                        className="flex flex-col justify-center items-center rounded-full p-1 m-1 text-center text-white bg-gradient-to-br from-gray-900 to-gray-700 w-6 h-6 cursor-pointer transform scale-80 hover:scale-100 hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-600 hover:ring-2 hover:ring-green-500 transition-all duration-300"
                        onClick={() => shopRow(item._id)}
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
        
          <Dialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto p-6">
            <div className="flex justify-end">
              <XMarkIcon
                className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900"
                onClick={closeEditModal}
              />
            </div>

            <EditItem itemId={editItemId} closeModal={closeEditModal} />
          </div>
        </div>
      </Dialog>
        </div>
      </div>
  );
}
