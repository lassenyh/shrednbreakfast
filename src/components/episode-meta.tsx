import type { Episode } from "@/types/episode";

type EpisodeMetaProps = {
  episode: Episode;
  className?: string;
  variant?: "compact" | "full";
};

export function EpisodeMeta({
  episode,
  className = "",
  variant = "full",
}: EpisodeMetaProps) {
  if (variant === "compact") {
    return (
      <div className={`space-y-1 ${className}`}>
        <p className="font-medium text-white">{episode.title}</p>
      </div>
    );
  }

  /** Player: title only (Episode 1 … / Special), optional Special tag */
  return (
    <div className={`space-y-2 ${className}`}>
      {episode.tag ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400/90">
          {episode.tag}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {episode.title}
      </h2>
    </div>
  );
}
