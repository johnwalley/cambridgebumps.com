import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import BumpsChart from "react-bumps-chart";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { Fragment, forwardRef } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

const longNames = {
  lents: "Lent Bumps",
  mays: "May Bumps",
  eights: "Summer Eights",
  town: "Town Bumps",
};

const longGenders = {
  men: "Men",
  women: "Women",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Latest({ data }) {
  const router = useRouter();
  const { event, gender } = router.query;

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>Latest results - Cambridge Bumps</title>
      </Head>
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="flex flex-col items-center">
            <Navigation page="latest" event={event} gender={gender} />
            {/*             <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center">
                <li>
                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                          <span className="font-medium text-gray-900">
                            Latest
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
                                  Latest
                                </MyLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MyLink
                                  href={`/history/${event}/${gender}`}
                                  active={active}
                                >
                                  Historical
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
                                  href={`/latest/lents/${gender}`}
                                  active={active}
                                >
                                  Lent Bumps
                                </MyLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MyLink
                                  href={`/latest/mays/${gender}`}
                                  active={active}
                                >
                                  May Bumps
                                </MyLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MyLink
                                  href={`/latest/eights/${gender}`}
                                  active={active}
                                >
                                  Summer Eights
                                </MyLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MyLink
                                  href={`/latest/town/${gender}`}
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
                                <MyLink
                                  href={`/latest/${event}/men`}
                                  active={active}
                                >
                                  Men
                                </MyLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <MyLink
                                  href={`/latest/${event}/women`}
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
            </nav> */}
            <span className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
              {data.startYear}
            </span>
            <div className="sm:w-[520px]">
              <BumpsChart data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { event: "mays", gender: "men" } },
      { params: { event: "mays", gender: "women" } },
      { params: { event: "town", gender: "men" } },
      { params: { event: "town", gender: "women" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { event, gender } = context.params;

  const res = await fetch(
    `https://api.cambridgebumps.com/api/latest?event=${event}&gender=${gender}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
