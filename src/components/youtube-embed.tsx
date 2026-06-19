"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  className?: string;
};

// Lightweight YouTube facade: shows a thumbnail with a play overlay and only
// loads the (privacy-enhanced, youtube-nocookie) iframe once the user clicks.
// Keeps page load fast since most visitors won't play the video.
export function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-md bg-black",
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
          <span className="absolute top-1/2 left-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-black/70 transition-colors group-hover:bg-red-600">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              aria-hidden="true"
              className="fill-white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
