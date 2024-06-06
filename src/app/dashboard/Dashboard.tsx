"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity?: number; // Tambahkan kuantitas sebagai opsional
}

const products: Product[] = [
  {
    id: 1,
    name: "Americano Passion Coffee",
    price: 20000,
    category: "Coffee",
    image: "/path/to/image1.jpg",
  },
  {
    id: 2,
    name: "Macchiato Peper Chocochip",
    price: 30000,
    category: "Coffee",
    image: "/path/to/image2.jpg",
  },
  {
    id: 3,
    name: "Matcha Latte",
    price: 25000,
    category: "Non-Coffee",
    image: "/path/to/image3.jpg",
  },
];

const Dashboard = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [notification, setNotification] = useState<string>("");

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  const checkout = () => {
    setNotification("Checkout successful!");
    setCart([]);
    setTimeout(() => setNotification(""), 3000); // Hapus notifikasi setelah 3 detik
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-full flex flex-col">
        <Navbar notification={notification} />
        <div className="text-black flex flex-grow">
          <div className="w-3/4 p-4">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setFilter("All")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "All"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                All menu
              </button>
              <button
                onClick={() => setFilter("Coffee")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "Coffee"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                Coffee
              </button>
              <button
                onClick={() => setFilter("Non-Coffee")}
                className={`w-full font-semibold py-2 px-4 rounded ${
                  filter === "Non-Coffee"
                    ? "bg-orange-400 text-white"
                    : "bg-white text-black hover:bg-orange-100 hover:text-orange-500"
                } cursor-pointer`}
              >
                Non-Coffee
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  isInCart={cart.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4 p-4">
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              checkout={checkout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
