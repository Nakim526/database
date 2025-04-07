"use client";
import { UserProps } from "@/lib/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DataUser() {
  const [loading, setLoading] = useState(false);
  const { back } = useRouter();
  const params = useParams();
  const uid = params.id;
  const [data, setData] = useState<UserProps>({
    id: "",
    username: "",
    email: "",
    status: false,
  });

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
    back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${uid}`, {
          method: "GET",
          cache: "no-cache",
        });
        const data = await response.json();
        console.log(data.data);
        setData(data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
            {/* row 1 */}
            <tr>
              <td>{data.id}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data && (data.status ? "Aktif" : "Tidak Aktif")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} className="btn btn-primary">
        Kembali
      </button>
    </div>
  );
}
