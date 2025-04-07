"use client";
import { UserProps } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProps[]>([]);

  const handleLogout = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      cache: "no-cache",
    });
    if (res.status === 500) {
      const response = await res.json();
      return alert(response.message);
    }
    replace("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user", { method: "GET" });
      const response = await res.json();
      if (res.status === 500) {
        return alert(response.message);
      }
      // console.log(response);
      setUser(response.data);
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full px-32 pt-20 items-center">
        {user && (
          <div className="w-full">
            <div className="flex flex-row justify-between w-full bg-black text-white font-bold px-20 py-4 border-2 border-gray-400">
              <p>Nama</p>
              <p>Email</p>
              <p>Status</p>
            </div>
            {user.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between w-full bg-black text-white font-bold px-20 py-4 border-2 border-gray-400"
              >
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.status ? "Aktif" : "Tidak Aktif"}</p>
              </div>
            ))}
          </div>
        )}
        {loading && <p className="text-2xl font-bold">Loading...</p>}
        <div className="flex flex-row gap-4 mt-8">
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-blue-500 font-bold rounded-md w-max px-8 py-2"
          >
            New Data
          </button>
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-red-500 font-bold rounded-md w-max px-8 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
