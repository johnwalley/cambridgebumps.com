import image1 from "@/images/bump.jpg";
import image2 from "@/images/motorway-bridge.jpg";
import image4 from "@/images/willow.jpg";
import image3 from "@/images/bump-2.jpg";
import image5 from "@/images/cannon.jpg";

import clsx from "clsx";

import Image from "next/image";

export function Photos() {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8 sm:-ml-8 sm:-mr-8 sm:w-[calc(100%+4rem)] -ml-4 -mr-4 w-[calc(100%+2rem)] ">
      {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
        <div
          key={image.src}
          className={clsx(
            "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
            rotations[imageIndex % rotations.length]
          )}
        >
          <Image
            src={image}
            alt=""
            sizes="(min-width: 640px) 18rem, 11rem"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
