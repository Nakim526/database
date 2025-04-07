import { NextResponse } from "next/server";
import { LoginProps, RegisterProps } from "../../interface";
import { supabaseDB } from "../init";

export async function register(data: RegisterProps) {
  const { data: user, error } = await supabaseDB.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.fullname,
      },
    },
  });

  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  } else {
    const { error: errorDB } = await supabaseDB
      .from("users")
      .insert({ name: data.fullname, email: data.email });
    if (errorDB) {
      return NextResponse.json({ status: 500, message: errorDB.message });
    }
    return NextResponse.json({ status: 200, message: "Success", data: user });
  }
}

export async function login(data: LoginProps) {
  const { data: user, error } = await supabaseDB.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  const res = NextResponse.json({
    status: 200,
    message: "Success",
    data: user,
  });

  res.cookies.set("sb-access-token", user.session.access_token, {
    httpOnly: true,
    // secure: true,
    path: "/",
  });

  res.cookies.set("sb-refresh-token", user.session.refresh_token, {
    httpOnly: true,
    // secure: true,
    path: "/",
  });

  return res;
}
