import Link from "next/link";

export default function HomePage() {
return (
<main className="min-h-screen p-8">
<h1 className="text-2xl font-bold">Resume SaaS</h1>
<p className="mt-2 text-gray-600">MVP for immigrant-focused resume flow.</p>
<div className="mt-6 flex gap-3">
<Link href="/signup" className="rounded bg-black px-4 py-2 text-white">
Sign up
</Link>
<Link href="/login" className="rounded border px-4 py-2">
Login
</Link>
</div>
</main>
);
}
