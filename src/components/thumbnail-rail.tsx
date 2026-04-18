"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Episode } from "@/types/episode";
import { EpisodeCard } from "@/components/episode-card";

/** Pixels per second — slow but visibly moving */
const AUTO_SCROLL_PX_PER_SEC = 22;

function scrollStepPx(scroller: HTMLElement): number {
  const child = scroller.firstElementChild as HTMLElement | null;
  if (!child) return 320;
  const gapRaw = getComputedStyle(scroller).gap;
  const gap = parseFloat(gapRaw.split(/\s+/)[0] || "0") || 0;
  return 2 * (child.getBoundingClientRect().width + gap);
}

export function ThumbnailRail({ episodes }: { episodes: Episode[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [canLeft, setCanLeft] = useState(false);
  /** Assume overflow until measured; effect disables if content fits. */
  const [canRight, setCanRight] = useState(true);
  const [focusInside, setFocusInside] = useState(false);
  const [touchPause, setTouchPause] = useState(false);
  const [wheelPause, setWheelPause] = useState(false);
  const wheelPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** No pointerenter pause — cursor resting over the rail on load would block autoscroll forever. */
  const pauseAuto = focusInside || touchPause || wheelPause;
  pausedRef.current = pauseAuto;

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const eps = 4;
    setCanLeft(scrollLeft > eps);
    setCanRight(scrollLeft + clientWidth < scrollWidth - eps);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [updateEdges, episodes.length]);

  useEffect(() => {
    return () => {
      if (wheelPauseTimerRef.current) clearTimeout(wheelPauseTimerRef.current);
    };
  }, []);

  /**
   * `scroll-snap-type: mandatory` fights small programmatic scroll deltas — the browser
   * snaps back to card starts, so autoscroll appears frozen. Snap is omitted on the rail;
   * optional light proximity snap could be added later if needed.
   */
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const el = scrollerRef.current;
      if (cancelled || !el) {
        if (!cancelled) {
          raf = requestAnimationFrame(tick);
        }
        return;
      }

      const dt = Math.min(now - last, 64);
      last = now;

      if (!pausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0.5) {
          const reduce =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const speed = reduce ? AUTO_SCROLL_PX_PER_SEC * 0.35 : AUTO_SCROLL_PX_PER_SEC;
          const next = el.scrollLeft + (speed * dt) / 1000;
          if (next >= maxScroll - 0.75) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft = next;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [episodes.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = scrollStepPx(el) * dir;
    const smooth =
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div
      className="flex min-w-0 w-full items-center gap-1 sm:gap-2"
      onTouchStart={() => setTouchPause(true)}
      onTouchEnd={() => setTouchPause(false)}
      onWheel={(e) => {
        if (Math.abs(e.deltaX) + Math.abs(e.deltaY) < 0.5) return;
        setWheelPause(true);
        if (wheelPauseTimerRef.current) clearTimeout(wheelPauseTimerRef.current);
        wheelPauseTimerRef.current = setTimeout(() => {
          setWheelPause(false);
          wheelPauseTimerRef.current = null;
        }, 2800);
      }}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !e.currentTarget.contains(next)) {
          setFocusInside(false);
        }
      }}
    >
      <button
        type="button"
        aria-label="Scroll thumbnails left"
        disabled={!canLeft}
        onClick={() => scrollByDir(-1)}
        className="hidden shrink-0 self-center rounded-full border border-white/15 bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-25 sm:inline-flex sm:items-center sm:justify-center sm:p-2.5"
      >
        <ChevronIcon dir="left" />
      </button>

      <div className="relative min-h-0 min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent sm:w-12" />
        <div
          ref={scrollerRef}
          className="flex min-h-0 min-w-0 w-full max-w-full gap-3 overflow-x-auto overscroll-x-contain pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {episodes.map((ep) => (
            <EpisodeCard key={ep.slug} episode={ep} />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll thumbnails right"
        disabled={!canRight}
        onClick={() => scrollByDir(1)}
        className="hidden shrink-0 self-center rounded-full border border-white/15 bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-25 sm:inline-flex sm:items-center sm:justify-center sm:p-2.5"
      >
        <ChevronIcon dir="right" />
      </button>
    </div>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={dir === "right" ? "translate-x-px" : "-translate-x-px"}
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
