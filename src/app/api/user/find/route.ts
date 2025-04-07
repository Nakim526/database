import { supabaseDB } from "@/lib/supabase/init";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { data, error } = await supabaseDB
    .from("users")
    .select("*")
    .eq("username", req.username)
    .single();
  if (error) {
    return NextResponse.json({ status: 500, message: "Data Tidak Ditemukan" });
  }

  const isMatch = await bcrypt.compare(req.password, data.password);
  if (!isMatch) {
    return NextResponse.json({ status: 404, message: "Password Salah" });
  }

  return NextResponse.json({
    status: 200,
    message: "Data Ditemukan",
    data: data,
  });
}
