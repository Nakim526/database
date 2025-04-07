import { supabaseDB } from "@/lib/supabase/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { data, error } = await supabaseDB
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  return NextResponse.json({ status: 200, message: "Success", data: data });
}
