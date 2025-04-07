import { supabaseDB } from "@/lib/supabase/init";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseDB
    .from("users")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  return NextResponse.json({ status: 200, message: "Success", data: data });
}
