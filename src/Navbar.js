import React, { useState } from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LazySusanRoundLogo from './LazySusanRoundLogo.png';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CreateItemForm from "./CreateItemForm";

const userLoggedIn = [
  { name: 'Home', href: '/', current: true },
  { name: 'Inventory', href: '/inventory', current: false },
  { name: 'Shopping List', href: '/shoppinglist', current: false },
  { name: 'Recipes', href: '/recipes', current: false },
  { name: 'Search', href: '/search', current: false },
  { name: 'About', href: '/lazysusan', current: false },
];

const userNotLoggedIn = [
  { name: 'Sign up', href: '/signup', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function NavBar() {
  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('user');

  const signOut = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };
  

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2">
                    <img
                      className="block h-12 w-auto lg:hidden"
                      src={LazySusanRoundLogo}
                      alt="Lazy Susan Logo"
                    />
                    <img
                      src={LazySusanRoundLogo}
                      className="hidden h-12 w auto lg:block"
                      alt="Lazy Susan Logo"
                    />
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {loggedIn
                      ? userLoggedIn.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))
                      : userNotLoggedIn.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              'bg-gray-900 text-white',
                              'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                  </div>
                </div>
                {loggedIn && (
                  <div className="hidden sm:ml-6 sm:block flex items-center">
                    <button
                      onClick={() => setOpenModal(true)}
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md py-2 px-3 text-sm font-medium'
                      )}
                    >
                      <span className="flex items-center">+ Add Item</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {loggedIn && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                              <a 
                              className='bg-gray-100 block px-4 py-2 text-sm text-gray-700 w-full text-left'
                              href='/expiringitems'
                              >
                                Expiring and Low Stock
                              </a>
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                    </div>
                  </Menu>
                )}

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <HiOutlineUserCircle className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div>
                            {loggedIn ? (
                              <button
                                onClick={signOut}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                )}
                              >
                                Sign out
                              </button>
                            ) : (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                )}
                              >
                                Sign in
                              </Link>
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {loggedIn
                ? userLoggedIn.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))
                : userNotLoggedIn.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
            </div>
          </Disclosure.Panel>

          {/* Modal */}
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <Dialog.Overlay className="bg-black opacity-30" />

              <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl">
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Add Item
                </Dialog.Title>

                <CreateItemForm />
              </div>
            </div>
          </Dialog>
        </>
      )}
    </Disclosure>
  );
}
