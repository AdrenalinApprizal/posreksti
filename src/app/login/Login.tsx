"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
        callbackUrl: "/",
      });

      if (res?.error) {
        toast.error(res.error);
        throw new Error(res.error);
      } else {
        toast.success("Login Success");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E06F2B] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Image
          className="mx-auto"
          src="/hidden.png"
          alt="logo"
          width={164}
          height={164}
        />
        <h1 className="text-2xl font-bold text-center">
          Login to your account
        </h1>
        <form>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full text-black p-2 border border-[#044D3A] rounded focus:outline-none focus:border-green-500"
              placeholder="Username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full text-black p-2 border border-[#044D3A] rounded focus:outline-none focus:border-green-500"
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="mt-8">
            <button
              className="w-full p-2 text-lg bg-[#007DFA] text-white rounded-lg focus:outline-none hover:bg-blue-700"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}