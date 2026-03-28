import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) redirect("/login");

const { data: resumes } = await supabase
.from("resumes")
.select("id,title,created_at")
.order("created_at", { ascending: false })
.limit(10);

return (
<main className="p-8">
<h1 className="text-2xl font-bold">Dashboard</h1>
<p className="mt-1 text-gray-600">Signed in as {user.email}</p>

<form
className="mt-6 flex gap-2"
action="/api/resume/create"
method="post"
>
<input
name="title"
className="rounded border p-2"
placeholder="Resume title"
defaultValue="My Resume"
/>
<button className="rounded bg-black px-4 py-2 text-white">Create Resume</button>
</form>

<h2 className="mt-8 text-xl font-semibold">Recent resumes</h2>
<ul className="mt-3 space-y-2">
{resumes?.map((r) => (
<li key={r.id} className="rounded border p-3">
<div className="font-medium">{r.title}</div>
<div className="text-sm text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
</li>
))}
</ul>
</main>
);
}
