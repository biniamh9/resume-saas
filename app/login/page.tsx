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

async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
setLoading(true);
setMsg("");

const { data, error } = await supabase.auth.signInWithPassword({
email,
password,
});

console.log("LOGIN data:", data);
console.log("LOGIN error:", error);

if (error) {
setMsg(error.message);
setLoading(false);
return;
}

router.push("/dashboard");
router.refresh();
}

return (
<main className="p-6 max-w-md mx-auto">
<h1 className="text-2xl font-semibold mb-4">Login</h1>

<form onSubmit={handleLogin} className="space-y-3">
<input
className="w-full border rounded p-2"
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
className="w-full border rounded p-2"
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button
className="w-full border rounded p-2"
type="submit"
disabled={loading}
>
{loading ? "Logging in..." : "Login"}
</button>
</form>

{msg ? <p className="mt-3 text-sm text-red-600">{msg}</p> : null}
</main>
);
}
