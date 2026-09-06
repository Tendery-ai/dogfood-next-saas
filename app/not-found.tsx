import { Metadata } from 'next';
import Link from 'next/link';

const title = "This page isn't here";

export const metadata: Metadata = {
  title
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold text-zinc-400">404</p>
      <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-md text-zinc-400">
        We could not find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-900"
      >
        Go back home
      </Link>
    </div>
  );
}
