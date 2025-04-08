"use client";
import { UserProps } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DataUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserProps | null>(null);
  const { back } = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { id: uid } = await params;
      try {
        const response = await fetch(`/api/user/${uid}`, {
          method: "GET",
          cache: "no-cache",
        });
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        return null;
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    back();
  };

  return (
    <div className="flex flex-col items-center w-full mt-20 gap-8">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && data ? (
              <tr>
                <td>{data.id}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data && (data.status ? "Aktif" : "Tidak Aktif")}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} className="btn btn-primary">
        Kembali
      </button>
    </div>
  );
}
