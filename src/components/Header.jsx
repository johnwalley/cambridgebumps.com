import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { i18n } from "../i18n";

function MobileNavigation() {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
            <span className="sr-only">Toggle Navigation</span>

            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": open,
                })}
              />
              <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": !open,
                })}
              />
            </svg>
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="ul"
                className="absolute inset-x-0 top-full mt-4 origin-top space-y-4 rounded-2xl bg-white p-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
              >
                <li>
                  <Link href="/latest" className="block w-full" onClick={() => close()}>
                    
                      Latest results
                    
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="block w-full" onClick={() => close()}>
                    
                      Historical charts
                    
                  </Link>
                </li>
                <li>
                  <Link href="/statistics" className="block w-full" onClick={() => close()}>
                    
                      Statistics
                    
                  </Link>
                </li>
                <li>
                  <Link href="/cheat-sheets" className="block w-full" onClick={() => close()}>
                    
                      Cheat sheets
                    
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block w-full" onClick={() => close()}>
                    
                      How do Bumps work?
                    
                  </Link>
                </li>
                <li>
                  <Link href="/vocabulary" className="block w-full" onClick={() => close()}>
                    
                      Vocabulary
                    
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="block w-full" onClick={() => close()}>
                    
                      Bumps mayhem
                    
                  </Link>
                </li>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export function Header() {
  return (
    <header className="py-4">
      <Container>
        <nav className="relative z-50 text-sm">
          <ul className="flex items-center">
            <li>
              <Link href="/" className="flex items-center justify-start">

                <span className="sr-only">Home</span>
                <Logo className="h-10 w-auto fill-primary" />
                <span className="pl-2 text-lg">
                  {i18n.name}
                  <span className="font-bold text-primary">Bumps</span>
                </span>

              </Link>
            </li>
            <li className="ml-12 hidden lg:block">
              <Link
                href="/latest"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Latest results
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/history"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Historical charts
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/statistics"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Statistics
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/cheat-sheets"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Cheat sheets
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/about"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  How do Bumps work?
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/vocabulary"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Vocabulary
                
              </Link>
            </li>
            <li className="ml-6 hidden lg:block">
              <Link
                href="/videos"
                className="rounded-lg py-1 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                
                  Bumps mayhem
                
              </Link>
            </li>
            <li className="ml-auto -mr-1 lg:hidden">
              <MobileNavigation />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
