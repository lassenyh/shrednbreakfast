import Link from "next/link";

export default function WatchNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-zinc-300">
      <h1 className="font-display text-3xl text-white">Episode not found</h1>
      <p className="mt-3 max-w-md text-sm text-zinc-500">
        That slug is not in the archive yet. Head back and pick an episode
        from the library.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100"
      >
        Back to series
      </Link>
    </div>
  );
}
