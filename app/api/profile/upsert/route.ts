import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
try {
const supabase = await createClient();

const {
data: { user },
error: userErr,
} = await supabase.auth.getUser();

if (userErr || !user) {
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const body = await req.json().catch(() => ({}));
const full_name = body?.full_name ?? null;

const { data, error } = await supabase
.from("profiles")
.upsert(
{
user_id: user.id,
email: user.email ?? null,
full_name,
},
{ onConflict: "user_id" }
)
.select()
.single();

if (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}

return NextResponse.json({ profile: data });
} catch (e: any) {
return NextResponse.json({ error: e.message ?? "Server error" }, { status: 500 });
}
}
