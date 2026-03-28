import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) redirect("/login");

const { data: resumes } = await supabase
.from("resumes")
.select("id,title,updated_at")
.eq("user_id", user.id)
.order("updated_at", { ascending: false });

return (
<main className="p-6">
<h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
<p className="mb-4">Signed in as: {user.email}</p>

<ul className="space-y-2">
{(resumes ?? []).map((r) => (
<li key={r.id} className="border rounded p-3">
<div className="font-medium">{r.title}</div>
<div className="text-sm opacity-70">
Updated: {new Date(r.updated_at).toLocaleString()}
</div>
</li>
))}
</ul>
</main>
);
}
