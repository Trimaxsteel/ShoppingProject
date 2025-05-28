import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "../../hooks/useRedux";
import { addToCart } from "../../redux/cartSlice";

const AddToCart = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  // Ensure product has an id for cart logic
  const handleAdd = () => {
    if (!product.id) {
      alert("This product is missing an id and cannot be added to cart.");
      return;
    }
    dispatch(addToCart(product));
  };
  return (
    <div className="h-fit w-1/2 rounded-md border p-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">{`₹${product.price}`}</h1>
        <div className="flex items-center justify-start gap-x-2">
          <Image
            src={`https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png`}
            width={40}
            height={50}
            alt=""
          />
          <p className="pb-2 text-sm font-medium text-gray-500">One-Day</p>
        </div>
        <p className="text-sm">
          FREE delivery{" "}
          <span className=" font-semibold">Tomorrow, 28 March.</span> Order
          within 11 hrs 2 mins. Details
        </p>
        <Button
          onClick={handleAdd}
          className="w-full rounded-2xl bg-yellow-400 text-gray-900 hover:bg-yellow-500"
        >
          Add To Cart
        </Button>
        <Button className="w-full rounded-2xl bg-orange-500 text-gray-900 hover:bg-orange-600">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
