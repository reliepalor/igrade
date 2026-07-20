import Link from "next/link";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
});

export default function Home() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} relative flex min-h-screen flex-col items-center justify-center bg-[#FAFAF8] px-6`}
    >
      {/* Signature element: quiet gradebook grid, top-right */}
      <div className="absolute right-8 top-8 grid grid-cols-4 gap-1 opacity-[0.15] sm:right-12 sm:top-12">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-[1px]"
            style={{
              backgroundColor: [3, 6, 9, 12].includes(i) ? "#2B3A67" : "#1C2321",
            }}
          />
        ))}
      </div>

      <main className="flex w-full max-w-md flex-col items-center text-center">
        <p className="mb-4 font-[family-name:var(--font-plex-mono)] text-xs uppercase tracking-[0.2em] text-[#2B3A67]">
          Admin · Teacher · Student
        </p>

        <h1 className="font-[family-name:var(--font-fraunces)] text-5xl font-medium tracking-tight text-[#1C2321]">
          IGrade
        </h1>

        <p className="mt-4 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1C2321]/60">
          A quiet place to record, review, and release grades —
          built for the people who run a classroom.
        </p>

        <Link
          href="/login"
          className="mt-10 font-[family-name:var(--font-inter)] rounded-full bg-[#1C2321] px-7 py-3 text-sm font-medium text-[#FAFAF8] transition-colors hover:bg-[#2B3A67]"
        >
          Sign in
        </Link>
      </main>

      <footer className="absolute bottom-8 font-[family-name:var(--font-plex-mono)] text-[11px] text-[#1C2321]/30">
        IGrade
      </footer>
    </div>
  );
}