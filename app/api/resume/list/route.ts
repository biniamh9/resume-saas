import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
try {
const supabase = await createClient();

const {
data: { user },
error: userErr,
} = await supabase.auth.getUser();

if (userErr || !user) {
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const { data, error } = await supabase
.from("resumes")
.select("*")
.eq("user_id", user.id)
.order("updated_at", { ascending: false });

if (error) {
return NextResponse.json({ error: error.message }, { status: 400 });
}

return NextResponse.json({ resumes: data ?? [] });
} catch (e: any) {
return NextResponse.json({ error: e.message ?? "Server error" }, { status: 500 });
}
}
