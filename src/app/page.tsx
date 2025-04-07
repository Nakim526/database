"use client";
import { UserProps } from "@/lib/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Home() {
  const { push, replace } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    withReactContent(Swal).fire({
      icon: "info",
      title: "Please Wait",
      text: "We are processing your request",
      showConfirmButton: false,
    });
    fetch("/api/user/find", {
      method: "POST",
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("Data: ", data);
        Swal.close();
        if (data.status === 200) {
          withReactContent(Swal).fire({
            icon: "success",
            title: "Success",
            text: data.message,
            showConfirmButton: true,
          });
          const uid = data.data.id;
          setLoading(false);
          push(`/user/${uid}`);
        } else {
          withReactContent(Swal).fire({
            icon: "error",
            title: "Error",
            text: data.message,
            showConfirmButton: true,
          });
          setLoading(false);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col w-[80%] pt-20 items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 m-auto md:min-w-[40%] lg:py-0">
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl! font-bold leading-tight tracking-tight text-white md:text-2xl!">
                Find your data
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className=" border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full! text-white hover:text-white! bg-blue-600! hover:bg-blue-700! focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5! mt-2 text-center"
                >
                  {loading ? (
                    <div className="flex flex-row gap-2 justify-center">
                      <span className="loading loading-spinner"></span>
                      Loading
                    </div>
                  ) : (
                    "Cari"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <button
            onClick={() => push("/user/add")}
            className="cursor-pointer bg-blue-600 text-white font-bold rounded-md w-max px-8 py-2"
          >
            New Data
          </button>
        </div>
      </div>
    </>
  );
}
