import React from "react";
import { Product } from "../app/Dashboard";

interface CartProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  addToCart,
  removeFromCart,
  checkout,
}) => {
  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),
    0
  );

  return (
    <div className="m-2 p-4 bg-white shadow">
      <p className="text-black text-2xl font-semibold">Cart</p>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{product.name}</span>
                <span>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  >
                    -
                  </button>
                  <span className="px-2">{product.quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-black flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(subtotal)}
              </span>
            </p>
            <button
              className="mt-4 w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
