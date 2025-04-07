import { register } from "@/lib/supabase/auth/services";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return await register(await request.json());
}
