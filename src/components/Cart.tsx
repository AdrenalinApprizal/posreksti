import React from 'react';
import { Product } from '../app/dashboard/Dashboard';

interface CartProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  checkout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, addToCart, removeFromCart, checkout }) => {
  const subtotal = cart.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);
  const discount = 2500; // Example discount
  const total = subtotal - discount;

  return (
    <div className="m-2 p-4  bg-white shadow">
      <p className="text-black text-2xl font-semibold">Cart</p>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{product.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price * (product.quantity || 1))}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-black flex justify-between">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(subtotal)}</span>
            </p>
            <p className="text-black flex justify-between">
              <span>Discount</span>
              <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(discount)}</span>
            </p>
            <p className="text-black flex justify-between font-semibold">
              <span>Total</span>
              <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total)}</span>
            </p>
            <button
              className="mt-4 w-full py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition-all"
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
