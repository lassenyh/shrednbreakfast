import type { Episode } from "@/types/episode";

/**
 * Video-URLer settes automatisk via Bunny Stream API når disse er satt i .env.local:
 * BUNNY_STREAM_LIBRARY_ID, BUNNY_STREAM_API_KEY, BUNNY_STREAM_CDN_HOSTNAME
 * (se .env.example)
 *
 * Matcher videoer etter filnavn/tittel i biblioteket:
 * - Ep. 1–13: må inneholde "Episode 1" … "Episode 13" (som i "Episode 1.mp4")
 * - Special: Bunny-fil `SNB - Megapark_1.mp4` (matcher `SNB - Megapark_1` i tittel)
 * - Hero-loop: tittel som matcher "header01" (f.eks. header01.mp4) — egen bakgrunnsvideo
 *
 * Uten env / ved API-feil brukes videoUrl nedenfor (placeholder).
 *
 * Thumbnails / hero-bilder: PNG i /public/thumbnails/
 * - Episode_1.png … Episode_13.png → episode 1–13
 * - SNB Special - Megapark.png → Special (eller bytt til Episode_14.png under specialThumb)
 */
export const PLACEHOLDER_VIDEO_URL =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

function episodeThumb(n: number) {
  return `/thumbnails/Episode_${n}.png`;
}

const specialThumb =
  "/thumbnails/" + encodeURIComponent("SNB Special - Megapark.png");

export const episodes: Episode[] = [
  {
    title: "Episode 1",
    slug: "episode-1",
    episodeNumber: 1,
    description: "",
    runtime: "18 min",
    year: 2009,
    thumbnailSrc: episodeThumb(1),
    heroSrc: episodeThumb(1),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: true,
  },
  {
    title: "Episode 2",
    slug: "episode-2",
    episodeNumber: 2,
    description: "",
    runtime: "16 min",
    year: 2009,
    thumbnailSrc: episodeThumb(2),
    heroSrc: episodeThumb(2),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 3",
    slug: "episode-3",
    episodeNumber: 3,
    description: "",
    runtime: "19 min",
    year: 2009,
    thumbnailSrc: episodeThumb(3),
    heroSrc: episodeThumb(3),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 4",
    slug: "episode-4",
    episodeNumber: 4,
    description: "",
    runtime: "17 min",
    year: 2009,
    thumbnailSrc: episodeThumb(4),
    heroSrc: episodeThumb(4),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 5",
    slug: "episode-5",
    episodeNumber: 5,
    description: "",
    runtime: "15 min",
    year: 2009,
    thumbnailSrc: episodeThumb(5),
    heroSrc: episodeThumb(5),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 6",
    slug: "episode-6",
    episodeNumber: 6,
    description: "",
    runtime: "20 min",
    year: 2009,
    thumbnailSrc: episodeThumb(6),
    heroSrc: episodeThumb(6),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 7",
    slug: "episode-7",
    episodeNumber: 7,
    description: "",
    runtime: "14 min",
    year: 2009,
    thumbnailSrc: episodeThumb(7),
    heroSrc: episodeThumb(7),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 8",
    slug: "episode-8",
    episodeNumber: 8,
    description: "",
    runtime: "18 min",
    year: 2009,
    thumbnailSrc: episodeThumb(8),
    heroSrc: episodeThumb(8),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 9",
    slug: "episode-9",
    episodeNumber: 9,
    description: "",
    runtime: "16 min",
    year: 2009,
    thumbnailSrc: episodeThumb(9),
    heroSrc: episodeThumb(9),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 10",
    slug: "episode-10",
    episodeNumber: 10,
    description: "",
    runtime: "21 min",
    year: 2009,
    thumbnailSrc: episodeThumb(10),
    heroSrc: episodeThumb(10),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 11",
    slug: "episode-11",
    episodeNumber: 11,
    description: "",
    runtime: "17 min",
    year: 2009,
    thumbnailSrc: episodeThumb(11),
    heroSrc: episodeThumb(11),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 12",
    slug: "episode-12",
    episodeNumber: 12,
    description: "",
    runtime: "19 min",
    year: 2009,
    thumbnailSrc: episodeThumb(12),
    heroSrc: episodeThumb(12),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "Episode 13",
    slug: "episode-13",
    episodeNumber: 13,
    description: "",
    runtime: "22 min",
    year: 2009,
    thumbnailSrc: episodeThumb(13),
    heroSrc: episodeThumb(13),
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
  {
    title: "SNB - Megapark",
    slug: "special",
    episodeNumber: null,
    tag: "Special",
    description: "",
    runtime: "34 min",
    year: 2011,
    thumbnailSrc: specialThumb,
    heroSrc: specialThumb,
    videoUrl: PLACEHOLDER_VIDEO_URL,
    featured: false,
  },
];
