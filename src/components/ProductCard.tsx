import React from "react";
import Image from "next/image";
import { Product } from "../app/dashboard/Dashboard";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  isInCart,
}) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <Image
        className="mx-auto"
        src="/KopiSusu.png"
        alt="logo"
        width={164}
        height={164}
      />
      <p className="text-xl font-semibold">{product.name}</p>
      <p className="text-lg text-gray-700">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(product.price)}
      </p>
      <button
        className={`mt-2 w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all ${
          isInCart ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => addToCart(product)}
        disabled={isInCart}
      >
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
