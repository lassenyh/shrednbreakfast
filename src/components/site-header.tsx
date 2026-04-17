import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="pointer-events-auto flex items-center text-white"
        >
          <SiteLogo variant="header" priority />
        </Link>
      </div>
    </header>
  );
}
