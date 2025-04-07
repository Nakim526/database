import { supabaseDB } from "@/lib/supabase/init";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const encrypted = await bcrypt.hash(req.password, 10);
  const { error } = await supabaseDB
    .from("users")
    .insert({ email: req.email, username: req.username, password: encrypted });

  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  return NextResponse.json({ status: 200, message: "Success" });
}
