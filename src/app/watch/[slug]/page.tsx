import { notFound } from "next/navigation";
import { WatchExperience } from "@/components/watch/watch-experience";
import { OPENGRAPH_IMAGE } from "@/lib/opengraph-defaults";
import {
  getAdjacentEpisodesResolved,
  getAllEpisodesInOrderResolved,
  getEpisodeBySlugResolved,
} from "@/lib/resolve-bunny-episodes";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlugResolved(slug);
  if (!episode) return { title: "Not found" };
  const description =
    episode.description.trim() ||
    `${episode.title} · Shred' n Breakfast — 2009 ski web series`;
  return {
    title: episode.title,
    description,
    openGraph: {
      title: `${episode.title} · Shred' n Breakfast`,
      description,
      images: [OPENGRAPH_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${episode.title} · Shred' n Breakfast`,
      description,
      images: [OPENGRAPH_IMAGE.url],
    },
  };
}

export default async function WatchPage({ params }: Props) {
  const { slug } = await params;
  const episode = await getEpisodeBySlugResolved(slug);
  if (!episode) notFound();

  const allEpisodes = await getAllEpisodesInOrderResolved();
  const { prev, next } = await getAdjacentEpisodesResolved(slug);

  return (
    <WatchExperience
      episode={episode}
      allEpisodes={allEpisodes}
      prev={prev}
      next={next}
    />
  );
}
