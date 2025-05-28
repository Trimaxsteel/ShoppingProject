import Image from "next/image";
import React from "react";
import Ratings from "./Ratings";
import { useRouter } from "next/navigation";

const ProductCards = ({ product }: { product: any }) => {
  const router = useRouter();
  // Use a fallback image if product.image is missing or empty
  const imageUrl =
    product.image && product.image !== "" ? product.image : "/logo.png";
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-100">
      <div
        className="flex flex-col gap-y-3 p-4 h-full"
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
      >
        <div className="flex h-48 w-full justify-center items-center overflow-hidden mb-2">
          <Image
            priority
            className="h-auto w-auto max-h-44 max-w-full object-contain"
            src={imageUrl}
            alt={product.title || product.name}
            width={180}
            height={180}
          />
        </div>
        <h1 className="text-base font-semibold hover:text-orange-400 line-clamp-2 min-h-[2.5em]">
          {product.title || product.name}
        </h1>
        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2em]">
          {product.description
            ? product.description.substring(0, 60) +
              (product.description.length > 60 ? "..." : "")
            : ""}
        </p>
        <Ratings rating={product.rating} />
        <p className="text-lg font-bold text-green-700">₹ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCards;
