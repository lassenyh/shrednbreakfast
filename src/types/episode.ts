/**
 * Episode model for the archive. Swap thumbnailSrc / heroSrc / videoUrl for production assets.
 */
export type Episode = {
  title: string;
  slug: string;
  /** 1–13 for regular eps; null for the Special */
  episodeNumber: number | null;
  /** e.g. "Special" — shown as a badge on cards */
  tag?: string;
  description: string;
  runtime: string;
  year: number;
  thumbnailSrc: string;
  heroSrc: string;
  /**
   * Bunny Stream: use the HLS manifest URL (…/playlist.m3u8) from the video page,
   * or a direct MP4 URL if you enable that in Bunny.
   */
  videoUrl: string;
  featured: boolean;
};
