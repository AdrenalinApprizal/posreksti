"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "next-auth/react";

const Navbar: React.FC = ({}) => {
  // Function to handle logout
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" }); // Redirect to the home page after logout
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-4">
        <Image src="/hidden.png" alt="logo" width={50} height={50} />
        <p className="text-xl text-black font-semibold">Hidden Haus</p>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="relative">
        </div>
        <button
          className="flex items-center font-semibold py-2 px-4 bg-orange-400 rounded hover:bg-orange-100 hover:text-orange-500 cursor-pointer"
          onClick={handleLogout} // Set onClick to handleLogout
        >
          <IoLogOut className="mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
