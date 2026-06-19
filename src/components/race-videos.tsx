import type { RaceVideo } from "@/data/videos";
import { YouTubeEmbed } from "@/components/youtube-embed";

type RaceVideosProps = {
  videos: RaceVideo[];
};

// Stacked list of YouTube videos for a single race, shown below the bumps chart.
// Renders nothing when there are no videos.
export function RaceVideos({ videos }: RaceVideosProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 w-full">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">
        {videos.length === 1 ? "Race video" : "Race videos"}
      </h2>
      <ul className="flex flex-col gap-6">
        {videos.map((video, i) => (
          <li key={`${video.id}-${i}`}>
            <YouTubeEmbed id={video.id} title={video.title} />
            <p className="mt-2 text-sm text-muted-foreground">{video.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
