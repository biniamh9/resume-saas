import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

let title = "My Resume";
let raw_input: Record<string, unknown> = {};

const contentType = req.headers.get("content-type") || "";
if (contentType.includes("application/json")) {
const body = await req.json();
title = body?.title || title;
raw_input = body?.raw_input || {};
} else {
const form = await req.formData();
title = String(form.get("title") || title);
}

const { error } = await supabase.from("resumes").insert({
user_id: user.id,
title,
raw_input,
generated_json: {},
language_out: "en",
});

if (error) return NextResponse.json({ error: error.message }, { status: 400 });

// for form submit from dashboard
if (!contentType.includes("application/json")) {
return NextResponse.redirect(new URL("/dashboard", req.url), 303);
}

return NextResponse.json({ ok: true });
}
