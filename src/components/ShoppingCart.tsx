"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import SubTotal from "./shared/SubTotal";

const options = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "7+" },
];

const ShoppingCart = ({
  cartItems,
  priceOfProduct,
  isChecked,
}: {
  cartItems: any;
  priceOfProduct: number;
  isChecked: boolean;
}) => {
  const [selectedValue, setSelectvalue] = useState("1");
  const dispatch = useAppDispatch();

  const handleChangeQuantity = (newQuantity: any, productId: any) => {
    const product = cartItems.find((item: any) => item.id === productId);

    if (newQuantity === "7+") {
      return <div>out of stock</div>;
    }

    if (product.quantity < newQuantity) {
      dispatch(incrementQuantity(newQuantity));
    } else {
      dispatch(decrementQuantity(newQuantity));
    }

    setSelectvalue(newQuantity);
  };

  return (
    <>
      <div className="w-[90%] bg-white p-5">
        <div className=" border-b">
          <h2 className="py-1 text-xl font-bold md:text-3xl">ShoppingCart</h2>
          <h6 className="pb-3 text-sm">Deselect all items</h6>
          <p className="text-end text-sm lg:text-lg">
            {cartItems.length > 0 ? "Price" : ""}
          </p>
        </div>
        <div className="mt-10 border-b">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product: any) => {
              return (
                <div key={product.id}>
                  <div className="flex justify-between pb-3">
                    <div>
                      <label
                        htmlFor={product.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox id={product.id} />
                        <Image
                          id={product.id}
                          src={product.image}
                          alt=""
                          width={100}
                          height={100}
                          className="w-24 object-scale-down object-center "
                        />
                      </label>
                    </div>
                    <div className="mx-auto w-[50%] space-y-1 lg:w-[60%]">
                      <h2 className=" text-xs md:text-sm lg:text-xl ">
                        {product.title}
                      </h2>
                      <p className="text-xs text-green-500">In stock</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Checkbox id={product.id} checked={isChecked} />
                        <label
                          htmlFor={product.id}
                          className=" md:text-xs lg:text-lg"
                        >
                          This will be a giftThis is a gift Learn more
                        </label>
                      </div>
                      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
                        <Select
                          defaultValue={selectedValue}
                          onValueChange={(ev) =>
                            handleChangeQuantity(ev, product.id)
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Qty:1" />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((value) => (
                              <SelectItem key={value.value} value={value.value}>
                                {value.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Link
                          href={``}
                          onClick={() => dispatch(removeFromCart(product))}
                        >
                          Delete{" "}
                        </Link>
                        <span className="h-4 border-l border-gray-400" />
                        <Link href={``}>Save for later </Link>
                        <span className="hidden h-4 border-l border-gray-400 lg:block" />
                        <Link href={``} className="hidden lg:block">
                          see more like this{" "}
                        </Link>
                        <span className="h-4 border-l border-gray-400" />
                        <Link href={``}>share </Link>
                      </div>
                    </div>
                    <h2 className="text-end text-xs font-bold md:text-sm lg:text-xl">{`₹ ${product.price}`}</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="p-5">
                <h1 className="text-2xl font-medium capitalize">
                  Your Amazon Cart is empty. 😭
                </h1>
                <p className="mt-2 text-sm">
                  Your shopping cart is waiting. Give it purpose – fill it with
                  groceries, clothing, household supplies, electronics and more.
                  Continue shopping on the Amazon.in homepage, learn about
                  today&apos;s deals, or visit your Wish List.
                </p>
              </div>
            </>
          )}
        </div>
        <div className="p-5">
          <SubTotal length={cartItems.length} price={priceOfProduct} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
