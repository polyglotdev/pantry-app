import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const statuses = {
  Purchased: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
}
const groceries = [
  {
    id: 1,
    name: 'Bananas',
    href: '#',
    quantity: '#',
    status: 'Purchased',
    dueDate: 'March 17, 2023',
    dueDateTime: '2023-03-17T00:00Z',
  },
  {
    id: 2,
    name: 'Jasmine Rice',
    href: '#',
    quantity: '#',    
    status: 'In progress',
    dueDate: null, 
    dueDateTime: null,
  },
  {
    id: 3,
    name: 'Canned Black Beans',
    href: '#',
    quantity: '#',
    status: 'In progress',
    dueDate: null,
    dueDateTime: null,
  },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GeneratedShoppingList() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {groceries.map((groceries) => (
        <li key={groceries.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
            <input type="checkbox" />
              <p className="text-sm font-semibold leading-6 text-gray-900">{groceries.name}</p>
              <p
                className={classNames(
                  statuses[groceries.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {groceries.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Expires on <time dateTime={groceries.dueDateTime}>{groceries.dueDate}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
            
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
          <form>
            <label 
                className="text-sm font-semibold leading-6 text-gray-900">Quantity
            <input type="text" name="name" />
            </label>
</form>
            <a
              href={groceries.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              Submit to Pantry<span className="sr-only">, {groceries.name}</span>
            </a>
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
                        Add<span className="sr-only">, {groceries.name}</span>
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
                        Remove<span className="sr-only">, {groceries.name}</span>
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
                        Add Expiration<span className="sr-only">, {groceries.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  )
}
