"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
const router = useRouter();
const supabase = createClient();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [msg, setMsg] = useState("");
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
console.log("LOGIN data:", data);
console.log("LOGIN error:", error);

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setMsg("");

const { error } = await supabase.auth.signInWithPassword({ email, password });

if (error) {
setMsg(error.message);
setLoading(false);
return;
}

router.push("/dashboard");
};

return (
<main className="mx-auto max-w-md p-8">
<h1 className="text-2xl font-bold">Login</h1>
<form onSubmit={onSubmit} className="mt-6 space-y-3">
<input
className="w-full rounded border p-2"
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
className="w-full rounded border p-2"
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button
className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
disabled={loading}
>
{loading ? "Signing in..." : "Sign in"}
</button>
</form>
{msg && <p className="mt-3 text-sm">{msg}</p>}
</main>
);
}
