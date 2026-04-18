import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { HeroLoopVideo } from "@/components/hero-loop-video";
import type { Episode } from "@/types/episode";

type HeroFeatureProps = {
  episode: Episode;
  watchHref: string;
  /** Bunny library video whose title matches header01 (e.g. header01.mp4) — HLS loop background */
  loopVideoUrl?: string | null;
};

export function HeroFeature({
  episode,
  watchHref,
  loopVideoUrl,
}: HeroFeatureProps) {
  return (
    <section className="relative z-0 min-h-[78vh] w-full overflow-hidden">
      {loopVideoUrl ? (
        <HeroLoopVideo src={loopVideoUrl} poster={episode.heroSrc} />
      ) : (
        <Image
          src={episode.heroSrc}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {/* Layered cinematic grade — light enough that background video stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.28)_100%)]" />
      {/* Extra fade at bottom so episode rail overlap feels intentional (Netflix-style) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black via-black/50 to-transparent sm:h-48"
        aria-hidden
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-28 pt-32 sm:px-6 sm:pb-32 lg:px-8 lg:pb-36">
        <h1 className="sr-only">Shred' n Breakfast</h1>
        <p className="max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
          In 2009, three friends traveled the world chasing snow, skiing, and
          whatever trouble came with it.{" "}
          <span className="text-white">Shred' n Breakfast</span> was the result.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={watchHref}
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black shadow-xl shadow-black/40 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <PlayIcon className="h-5 w-5" aria-hidden />
            Play episode 1
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}
