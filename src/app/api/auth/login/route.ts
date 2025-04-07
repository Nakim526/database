import { login } from "@/lib/supabase/auth/services";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return await login(await request.json());
}
