import { supabaseDB } from "@/lib/supabase/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { data, error } = await supabaseDB
    .from("users")
    .insert({ email: req.email, name: req.name })
    .select("*");
  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  return NextResponse.json({ status: 200, message: "Success", data: data });
}
