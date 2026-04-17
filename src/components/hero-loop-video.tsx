"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { isHlsUrl } from "@/lib/video-source";

type HeroLoopVideoProps = {
  src: string;
  poster: string;
};

/**
 * Full-bleed muted looping background (Bunny HLS or MP4). No controls.
 */
export function HeroLoopVideo({ src, poster }: HeroLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* autoplay may require user gesture on some browsers */
      });
    };

    if (isHlsUrl(src)) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      } else if (
        video.canPlayType("application/vnd.apple.mpegurl") ||
        video.canPlayType("application/x-mpegURL")
      ) {
        video.src = src;
        video.addEventListener("loadeddata", tryPlay, { once: true });
      } else {
        video.src = src;
      }
    } else {
      video.src = src;
      video.addEventListener("loadeddata", tryPlay, { once: true });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    />
  );
}
