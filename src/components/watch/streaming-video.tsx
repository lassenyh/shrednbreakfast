"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { isHlsUrl } from "@/lib/video-source";

type StreamingVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Plays progressive MP4 or HLS (.m3u8), e.g. from Bunny Stream.
 * Chrome/Firefox need hls.js for HLS; Safari uses native HLS.
 */
export function StreamingVideo({
  src,
  poster,
  className,
}: StreamingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const setup = () => {
      if (isHlsUrl(src)) {
        const nativeHls =
          video.canPlayType("application/vnd.apple.mpegurl") ||
          video.canPlayType("application/x-mpegURL");
        /** Safari (incl. iOS): native HLS is more reliable than MSE/hls.js */
        if (nativeHls) {
          video.src = src;
        } else if (Hls.isSupported()) {
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hls.loadSource(src);
          hls.attachMedia(video);
        } else {
          video.src = src;
        }
      } else {
        video.src = src;
      }
    };

    setup();

    return () => {
      if (hls) {
        hls.destroy();
        hls = null;
      }
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      key={src}
      className={className}
      controls
      playsInline
      preload="metadata"
      poster={poster}
    >
      Your browser does not support the video tag.
    </video>
  );
}
