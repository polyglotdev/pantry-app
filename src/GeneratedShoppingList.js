import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import {Link} from 'react-router-dom';
import axios from 'axios';

const statuses = {
  Purchased: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GeneratedShoppingList() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      const user = localStorage.getItem('user');
      try {
        const response = await axios.get(`http://localhost:3001/item/inventory/${user}`);
        const formattedProducts = response.data.filter((item) => item.restock === true || item.quantity === 0)
        setItems(formattedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handleCheckboxChange = (index) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const submitToPantry = async (itemId, quantity) => {
    try {
      const updatedItem = {
        quantity: parseInt(quantity),
        restock: false,
      };
  
      await axios.put(`http://localhost:3001/item/${itemId}`, updatedItem);
      // Remove the submitted item from the list
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAll = () => {
    items.forEach((item) => {
      if (item.checked) {
        submitToPantry(item._id, item.quantity);
      }
    });
  };


  return (
    <div className="flex-1 flex-col justify-center px-6 py-14 lg:px-8">
      <div className="py-4 text-left">
      <Link to={'/itemform'}>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add New Item
        </button>
      </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
      {items.map((item, index) => (
  <div key={item._id} className="py-5">
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-x-3">
        <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
        <p
          className={classNames(
            item.checked ? statuses.Purchased : statuses['In progress'],
            'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
          )}
        >
          {item.checked ? 'Purchased' : 'In progress'}
        </p>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitToPantry(item._id, e.target.elements.quantity.value);
          }}
          className="flex items-center gap-x-4"
        >
          <label className="text-sm font-semibold leading-6 text-gray-900">
            Quantity
            <input type="text" name="quantity" />
          </label>
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
          >
            Submit to Pantry<span className="sr-only">, {item.name}</span>
          </button>
        </form>
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Add<span className="sr-only">, {item.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Remove<span className="sr-only">, {item.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Add Expiration<span className="sr-only">, {item.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">you currently have {item.quantity} {item.unit} in stock</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="py-4 text-left">
        <button
          onClick={handleSubmitAll}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit All
        </button>
      </div>
    </div>
  );
}