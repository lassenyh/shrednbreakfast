import {
  fetchAllBunnyLibraryVideos,
  getBunnyStreamEnv,
  bunnyHlsPlaylistUrl,
} from "@/lib/bunny-stream-api";
import { cache } from "react";

/**
 * Single Bunny library fetch per request — shared by episode URLs and header video.
 */
export const getBunnyCatalog = cache(async () => {
  const env = getBunnyStreamEnv();
  if (!env) return null;
  try {
    const items = await fetchAllBunnyLibraryVideos({
      libraryId: env.libraryId,
      apiKey: env.apiKey,
    });
    return { items, cdnHostname: env.cdnHostname };
  } catch (e) {
    console.error("[bunny] Failed to list library videos:", e);
    return null;
  }
});

/** Hero background: video titled e.g. header01.mp4 in the same Bunny library */
export const getHeaderLoopVideoUrl = cache(async (): Promise<string | null> => {
  const cat = await getBunnyCatalog();
  if (!cat) return null;
  const v = cat.items.find((item) => /header01/i.test(item.title));
  if (!v) return null;
  return bunnyHlsPlaylistUrl(cat.cdnHostname, v.guid);
});
