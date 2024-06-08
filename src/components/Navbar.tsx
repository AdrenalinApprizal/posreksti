import React, { useState } from "react";
import Image from "next/image";
import { IoIosHome } from "react-icons/io";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { Product } from "../app/Dashboard";

interface NavbarProps {
  notifications: Product[];
}

const Navbar: React.FC<NavbarProps> = ({ notifications }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-4">
        <Image src="/hidden.png" alt="logo" width={50} height={50} />
        <p className="text-xl text-black font-semibold">Hidden Haus</p>
      </div>
      <div className="flex space-x-4 items-center">
        <button className="flex items-center font-semibold py-2 px-4 bg-orange-400 rounded hover:bg-orange-100 hover:text-orange-500 cursor-pointer">
          <IoIosHome className="mr-2" />
          Home
        </button>
        <div className="relative">
          <button
            className="flex items-center font-semibold py-2 px-4 bg-orange-400 rounded hover:bg-orange-100 hover:text-orange-500 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <IoNotificationsOutline className="mr-2" />
            Notifications
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg">
              <div className="p-4">
                {notifications.length > 0 ? (
                  notifications.map((product, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-black font-semibold">{product.name}</p>
                      <p className="text-gray-700">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(product.price)}{" "}
                        x {product.quantity}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        <button className="flex items-center font-semibold py-2 px-4 bg-orange-400 rounded hover:bg-orange-100 hover:text-orange-500 cursor-pointer">
          <IoLogOut className="mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
