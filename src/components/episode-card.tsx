import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/types/episode";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const href = `/watch/${episode.slug}`;
  const isSpecial = Boolean(episode.tag);

  return (
    <Link
      href={href}
      className="group relative block w-[72vw] shrink-0 sm:w-64 md:w-72 lg:w-80"
    >
      <article className="relative overflow-hidden rounded-lg ring-1 ring-white/10 transition duration-300 will-change-transform group-hover:z-10 group-hover:scale-[1.03] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_20px_50px_-12px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-video bg-zinc-900">
          <Image
            src={episode.thumbnailSrc}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:brightness-110"
            sizes="(max-width: 640px) 72vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 transition group-hover:opacity-100" />
          {isSpecial ? (
            <span className="absolute right-2 top-2 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              {episode.tag}
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {episode.title}
          </p>
        </div>
      </article>
    </Link>
  );
}
