import { CinematicBackdrop } from "@/components/cinematic-backdrop";
import { EpisodeGrid } from "@/components/episode-grid";
import { HeroFeature } from "@/components/hero-feature";
import { SiteHeader } from "@/components/site-header";
import { SiteLogo } from "@/components/site-logo";
import { getHeaderLoopVideoUrl } from "@/lib/bunny-catalog";
import {
  getAllEpisodesInOrderResolved,
  getFeaturedEpisodeResolved,
} from "@/lib/resolve-bunny-episodes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  /** Vises som «{title} · Shred n Breakfast» (se `layout.tsx` template). */
  title: "Archive",
  description:
    "The lost twintip travel series returns. Lasse Nyhaugen, Kim Boberg, and Lars Haakon Hafsal — all episodes in one place.",
};

export default async function Home() {
  const [featured, allEpisodes, loopVideoUrl] = await Promise.all([
    getFeaturedEpisodeResolved(),
    getAllEpisodesInOrderResolved(),
    getHeaderLoopVideoUrl(),
  ]);

  if (!featured) {
    return null;
  }

  const watchHref = `/watch/${featured.slug}`;

  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      <CinematicBackdrop />
      <div className="relative z-10">
        <SiteHeader />
        <HeroFeature
          episode={featured}
          watchHref={watchHref}
          loopVideoUrl={loopVideoUrl}
        />

        <EpisodeGrid id="series" episodes={allEpisodes} />

        <footer className="border-t border-white/10 bg-black px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl justify-center">
            <SiteLogo variant="footer" className="opacity-90" />
          </div>
        </footer>
      </div>
    </div>
  );
}
