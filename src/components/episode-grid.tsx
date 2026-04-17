import type { Episode } from "@/types/episode";
import { ThumbnailRail } from "@/components/thumbnail-rail";

type EpisodeGridProps = {
  id?: string;
  episodes: Episode[];
  title?: string;
  subtitle?: string;
};

/** Horizontal rail (streaming-style); scrollable on all breakpoints */
export function EpisodeGrid({
  id,
  episodes,
  title,
  subtitle,
}: EpisodeGridProps) {
  const list = episodes;
  const showHeading = Boolean(title || subtitle);
  return (
    <section
      id={id}
      className="relative z-20 -mt-16 border-t-0 bg-black pb-12 pt-2 sm:-mt-20 sm:pb-16 md:-mt-24 lg:-mt-28"
    >
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading ? (
          <div className="mb-6 flex flex-col gap-1 sm:mb-8">
            {title ? (
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="max-w-2xl text-sm text-zinc-500">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        <ThumbnailRail episodes={list} />
      </div>
    </section>
  );
}
