import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const body = await req.json().catch(() => ({}));
const full_name = body?.full_name ?? null;
const preferred_input_language = body?.preferred_input_language ?? "en";

const { error } = await supabase.from("profiles").upsert({
user_id: user.id,
full_name,
preferred_input_language,
});

if (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}

return NextResponse.json({ ok: true });
}
