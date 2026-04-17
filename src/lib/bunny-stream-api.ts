/**
 * Bunny Stream (video.bunnycdn.com) — list videos in a library.
 * @see https://docs.bunny.net/reference/video_list
 *
 * API key must only run on the server (never NEXT_PUBLIC_*).
 */

export type BunnyVideoItem = {
  guid: string;
  title: string;
};

export type BunnyListResponse = {
  totalItems: number;
  currentPage?: number;
  items: BunnyVideoItem[];
};

export function getBunnyStreamEnv(): {
  libraryId: string;
  apiKey: string;
  cdnHostname: string;
} | null {
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID?.trim();
  const apiKey = process.env.BUNNY_STREAM_API_KEY?.trim();
  const cdnHostname = process.env.BUNNY_STREAM_CDN_HOSTNAME?.trim();
  if (!libraryId || !apiKey || !cdnHostname) return null;
  return { libraryId, apiKey, cdnHostname };
}

/** HLS manifest — standard Bunny Stream shape */
export function bunnyHlsPlaylistUrl(cdnHostname: string, videoGuid: string): string {
  const host = cdnHostname.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${host}/${videoGuid}/playlist.m3u8`;
}

export async function fetchAllBunnyLibraryVideos(config: {
  libraryId: string;
  apiKey: string;
}): Promise<BunnyVideoItem[]> {
  const all: BunnyVideoItem[] = [];
  let page = 1;
  const itemsPerPage = 100;

  for (;;) {
    const url = new URL(
      `https://video.bunnycdn.com/library/${config.libraryId}/videos`,
    );
    url.searchParams.set("page", String(page));
    url.searchParams.set("itemsPerPage", String(itemsPerPage));

    const res = await fetch(url.toString(), {
      headers: { AccessKey: config.apiKey },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Bunny Stream API ${res.status}: ${text.slice(0, 200) || res.statusText}`,
      );
    }

    const data = (await res.json()) as BunnyListResponse;
    const batch = data.items ?? [];
    if (batch.length === 0) break;

    all.push(...batch);

    if (batch.length < itemsPerPage) break;
    if (all.length >= (data.totalItems ?? all.length)) break;
    page += 1;
  }

  return all;
}
