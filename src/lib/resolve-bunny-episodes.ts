import { episodes as episodesBase } from "@/data/episodes";
import { getBunnyCatalog } from "@/lib/bunny-catalog";
import { bunnyHlsPlaylistUrl, type BunnyVideoItem } from "@/lib/bunny-stream-api";
import type { Episode } from "@/types/episode";
import { cache } from "react";

function matchesEpisodeNumberTitle(title: string, n: number): boolean {
  const m = title.match(/\bEpisode\s+(\d+)\b/i);
  if (!m) return false;
  return parseInt(m[1], 10) === n;
}

/** Special: title contains “Special” but not “Episode 12”-style numbered episode */
function matchesSpecialTitle(title: string): boolean {
  if (/\bEpisode\s+\d+\b/i.test(title)) return false;
  return /\bSpecial\b/i.test(title) || /\bSpesial\b/i.test(title);
}

function attachStreamUrls(
  eps: Episode[],
  bunnyItems: BunnyVideoItem[],
  cdnHostname: string,
): Episode[] {
  const pool = [...bunnyItems];

  return eps.map((ep) => {
    let hit: BunnyVideoItem | undefined;

    if (ep.episodeNumber != null) {
      const idx = pool.findIndex((v) =>
        matchesEpisodeNumberTitle(v.title, ep.episodeNumber!),
      );
      if (idx !== -1) {
        hit = pool[idx];
        pool.splice(idx, 1);
      }
    } else if (ep.slug === "special") {
      const idx = pool.findIndex((v) => matchesSpecialTitle(v.title));
      if (idx !== -1) {
        hit = pool[idx];
        pool.splice(idx, 1);
      }
    }

    if (hit) {
      return {
        ...ep,
        videoUrl: bunnyHlsPlaylistUrl(cdnHostname, hit.guid),
      };
    }
    return ep;
  });
}

/**
 * One resolved episode list per request — merges Bunny API with local metadata.
 * If env is missing or the API fails, returns static `episodes` (placeholder URLs).
 */
export const getAllEpisodesResolved = cache(async (): Promise<Episode[]> => {
  const cat = await getBunnyCatalog();
  if (!cat) {
    return [...episodesBase];
  }
  return attachStreamUrls(
    [...episodesBase],
    cat.items,
    cat.cdnHostname,
  );
});

export async function getEpisodeBySlugResolved(
  slug: string,
): Promise<Episode | undefined> {
  const all = await getAllEpisodesResolved();
  return all.find((e) => e.slug === slug);
}

export async function getFeaturedEpisodeResolved(): Promise<
  Episode | undefined
> {
  const all = await getAllEpisodesResolved();
  return all.find((e) => e.featured) ?? all[0];
}

export async function getLibraryEpisodesResolved(): Promise<Episode[]> {
  const all = await getAllEpisodesResolved();
  const featured = all.find((e) => e.featured) ?? all[0];
  if (!featured) return [];
  return all.filter((e) => e.slug !== featured.slug);
}

export async function getAllEpisodesInOrderResolved(): Promise<Episode[]> {
  const all = await getAllEpisodesResolved();
  const regular = all.filter((e) => e.episodeNumber != null);
  const special = all.find((e) => e.slug === "special");
  const sorted = [...regular].sort(
    (a, b) => (a.episodeNumber ?? 0) - (b.episodeNumber ?? 0),
  );
  return special ? [...sorted, special] : sorted;
}

export async function getAdjacentEpisodesResolved(slug: string): Promise<{
  prev?: Episode;
  next?: Episode;
}> {
  const list = await getAllEpisodesInOrderResolved();
  const idx = list.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    prev: list[idx - 1],
    next: list[idx + 1],
  };
}
