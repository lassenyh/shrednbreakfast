"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { EpisodeMeta } from "@/components/episode-meta";
import { SiteLogo } from "@/components/site-logo";
import { EpisodeSelector } from "@/components/episode-selector";
import { StreamingVideo } from "@/components/watch/streaming-video";
import type { Episode } from "@/types/episode";

type WatchExperienceProps = {
  episode: Episode;
  allEpisodes: Episode[];
  prev?: Episode;
  next?: Episode;
};

export function WatchExperience({
  episode,
  allEpisodes,
  prev,
  next,
}: WatchExperienceProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen) return;
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        router.push(`/watch/${prev.slug}`);
      }
      if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        router.push(`/watch/${next.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, next, prev, router]);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            ← Back
          </Link>
          <div className="hidden justify-center sm:flex">
            <SiteLogo
              variant="watch"
              className="max-w-[140px] object-center opacity-80"
            />
          </div>
          <span className="w-14 sm:w-20" aria-hidden />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-zinc-950 shadow-2xl shadow-black/60">
          <StreamingVideo
            key={episode.slug}
            src={episode.videoUrl}
            poster={episode.thumbnailSrc}
            className="aspect-video w-full bg-black"
          />
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <EpisodeMeta episode={episode} className="flex-1" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
            <button
              id={triggerId}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "episode-selector-panel" : undefined}
            >
              Episodes
            </button>
            <div className="flex gap-2">
              {prev ? (
                <Link
                  href={`/watch/${prev.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
                >
                  Previous
                </Link>
              ) : (
                <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-md border border-white/10 px-4 py-3 text-sm text-zinc-600 sm:flex-none">
                  Previous
                </span>
              )}
              {next ? (
                <Link
                  href={`/watch/${next.slug}`}
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
                >
                  Next
                </Link>
              ) : (
                <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-md border border-white/10 px-4 py-3 text-sm text-zinc-600 sm:flex-none">
                  Next
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      <EpisodeSelector
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        episodes={allEpisodes}
        currentSlug={episode.slug}
        triggerId={triggerId}
      />
    </div>
  );
}
