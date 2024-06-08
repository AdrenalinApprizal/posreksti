"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const storedUserId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("userId="));
        if (storedUserId) {
          const userId = storedUserId.split("=")[1];
          setUserId(userId);
        } else {
          // Simulasikan login dan simpan userId ke dalam cookie
          document.cookie = `userId=${userId}`;
          setUserId(userId);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      }
    };

    fetchUserSession();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/product",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckout = async () => {
    try {
      if (!userId) {
        throw new Error("User is not logged in");
      }

      const res = await fetch(
        process.env.NEXT_PUBLIC_WEB_URL + "/api/v1/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, cart }),
        }
      );

      if (!res.ok) {
        throw new Error("Checkout failed");
      }

      const data = await res.json();
      console.log("Checkout successful:", data);
      setCart([]);
      toast.success("Checkout successful!");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed");
    }
  };

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

  const removeFromCart = (productId: string) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-full flex flex-col">
        <Navbar />
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
              checkout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
