"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
const router = useRouter();
const supabase = createClient();

const [fullName, setFullName] = useState("");
const [language, setLanguage] = useState("en");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [msg, setMsg] = useState("");

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setMsg("");

const { error } = await supabase.auth.signUp({ email, password });

if (error) {
setMsg(error.message);
setLoading(false);
return;
}

// Try profile upsert immediately (works if session exists instantly)
await fetch("/api/profile/upsert", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
full_name: fullName,
preferred_input_language: language,
}),
});

setMsg("Signup successful. If email confirmation is enabled, verify email then login.");
setLoading(false);
router.push("/login");
};

return (
<main className="mx-auto max-w-md p-8">
<h1 className="text-2xl font-bold">Sign up</h1>
<form onSubmit={onSubmit} className="mt-6 space-y-3">
<input
className="w-full rounded border p-2"
placeholder="Full name"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
/>
<input
className="w-full rounded border p-2"
placeholder="Preferred input language (e.g. en, am, fr)"
value={language}
onChange={(e) => setLanguage(e.target.value)}
/>
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
{loading ? "Creating..." : "Create account"}
</button>
</form>
{msg && <p className="mt-3 text-sm">{msg}</p>}
</main>
);
}
