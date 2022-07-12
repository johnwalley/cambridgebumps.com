import Head from "next/head";
import Image from "next/image";

import { AuthLayout } from "@/components/AuthLayout";
import { Header } from "@/components/Header";
import townBumpsCheatSheetImage from "@/images/town-bumps-2022-cheat-sheet.png";

const products = [
  {
    id: 1,
    name: "Town Bumps 2022",
    href: "/town-bumps-2022-cheat-sheet.pdf",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export default function CheatSheets() {
  return (
    <>
      <Head>
        <title>How do bumps work? - Cambridge Bumps</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Guides to the crews taking part.
            </h2>
            <p>Identify crew colours, statistics and more.</p>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="min-h-80 aspect-w-210 aspect-h-297 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                    <Image
                      src={townBumpsCheatSheetImage}
                      alt=""
                      //width={1558}
                      //height={946}
                      //layout="fixed"
                      unoptimized
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <a href={product.href} download>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-cambridge px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cambridge focus:outline-none focus:ring-2 focus:ring-cambridge focus:ring-offset-2"
                        >
                          Download
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
