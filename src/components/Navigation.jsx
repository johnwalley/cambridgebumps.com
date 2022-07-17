import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, forwardRef } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

import { longGenders, longNames, longPages } from "../constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MyLink = forwardRef((props, ref) => {
  let { href, active, children, ...rest } = props;
  return (
    <Link href={href}>
      <a
        ref={ref}
        {...rest}
        className={classNames(
          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
          "block px-4 py-2 text-sm"
        )}
      >
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = "MyLink";

export function Navigation({ page, event, gender }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center">
        <li>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-900">
                    {longPages[page]}
                  </span>
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/latest/${event}/${gender}`}
                          active={active}
                        >
                          {longPages["latest"]}
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/history/${event}/${gender}`}
                          active={active}
                        >
                          {longPages["history"]}
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-900">
                    {longNames[event]}
                  </span>
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/lents/${gender}`}
                          active={active}
                        >
                          Lent Bumps
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/mays/${gender}`}
                          active={active}
                        >
                          May Bumps
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/eights/${gender}`}
                          active={active}
                        >
                          Summer Eights
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/torpids/${gender}`}
                          active={active}
                        >
                          Torpids
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/town/${gender}`}
                          active={active}
                        >
                          Town Bumps
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-900">
                    {longGenders[gender]}
                  </span>
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink href={`/${page}/${event}/men`} active={active}>
                          Men
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href={`/${page}/${event}/women`}
                          active={active}
                        >
                          Women
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      </ol>
    </nav>
  );
}
