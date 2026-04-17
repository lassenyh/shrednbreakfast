import type { Episode } from "@/types/episode";
import { EpisodeCard } from "@/components/episode-card";

type EpisodeGridProps = {
  id?: string;
  episodes: Episode[];
  title?: string;
  subtitle?: string;
};

/** Horizontal rail (streaming-style) with snap; scrollable on all breakpoints */
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent sm:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent sm:w-12" />
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] sm:gap-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
            {list.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
