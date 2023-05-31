import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

export default function Example() {
  const [products, setProducts] = useState([]);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/item/inventory');
        const formattedProducts = response.data
        .filter((item) => item.restock === true)
        .map((item) => ({
          id: item._id.$oid,
          name: item.name,
          href: `#`,
          expiration: formatDate(item.expirationDate),
          quantity: item.quantity,
          unit: item.unit,
          inStock: item.quantity > 0,
          isExpiringSoon: item.expirationDate < item.alertDate,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping</h1>

        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900">
                          Expiration Date: {product.expiration}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                          <input
                            type="number"
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            min="1" // Optional: Set minimum value
                            max="100" // Optional: Set maximum value
                            defaultValue={1} // Optional: Set default value
                          />
                        `<p className="ml-4 text-sm font-medium text-gray-600 sm:ml-0 sm:mt-3">
                          <span>Amount</span>
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      )}

                      {product.inStock ? (
                        <span>{`You currently have ${product.quantity} ${product.unit} in stock`}</span>
                      ) : (
                        <span>Not in your pantry</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">Total Items in Cart</dt>
                    <dd className="text-base font-medium text-gray-900">{products.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit-update-list"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Update List
              </button>

      
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Start Shopping 
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                
                <a href="/LazySusan" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Return to your LazySusan Dashboard
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
