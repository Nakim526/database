import { NextRequest, NextResponse } from "next/server";
import { supabaseDB } from "@/lib/supabase/init";

export async function POST(req: NextRequest) {
  const { error } = await supabaseDB.auth.signOut();

  const response = NextResponse.redirect(new URL("/login", req.url));

  response.cookies.set("sb-access-token", "", { path: "/", maxAge: 0 });
  response.cookies.set("sb-refresh-token", "", { path: "/", maxAge: 0 });

  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  return response;
}
