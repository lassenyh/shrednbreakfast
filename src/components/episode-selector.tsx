"use client";

import Link from "next/link";
import { useEffect, useRef, type SVGProps } from "react";
import type { Episode } from "@/types/episode";

type EpisodeSelectorProps = {
  open: boolean;
  onClose: () => void;
  episodes: Episode[];
  currentSlug: string;
  triggerId?: string;
};

export function EpisodeSelector({
  open,
  onClose,
  episodes,
  currentSlug,
  triggerId = "episodes-trigger",
}: EpisodeSelectorProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="episode-selector-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${triggerId}-label`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-zinc-950/95 shadow-2xl shadow-black"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <h2
            id={`${triggerId}-label`}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400"
          >
            Episodes
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close episode list"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {episodes.map((ep) => {
              const active = ep.slug === currentSlug;
              return (
                <li key={ep.slug}>
                  <Link
                    href={`/watch/${ep.slug}`}
                    onClick={onClose}
                    className={`flex gap-3 rounded-lg px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      active
                        ? "bg-white/10 ring-1 ring-white/15"
                        : "hover:bg-white/5"
                    }`}
                    aria-current={active ? "true" : undefined}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {ep.title}
                      </p>
                    </div>
                    {active ? (
                      <span className="shrink-0 self-center text-[10px] font-bold uppercase tracking-wider text-red-400">
                        Now
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
