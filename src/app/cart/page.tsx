"use client";
import ProccedToBuy from "@/components/ProccedToBuy";
import ShoppingCart from "@/components/ShoppingCart";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { getCart } from "../../../redux/cartSlice";

const CartPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e: boolean) => {
    setIsChecked(e);
  };

  const cartItems = useAppSelector(getCart);
  let priceOfProduct = 0;

  cartItems.forEach((items: any) => {
    if (items.price) {
      priceOfProduct += items.price * items.quantity;
    }
  });

  return (
    <section
      className=" md: mx-auto mt-10 flex w-[98%] flex-col items-center
    justify-between gap-x-5 lg:w-[90%] lg:flex-row lg:items-start"
    >
      <ShoppingCart
        isChecked={isChecked}
        cartItems={cartItems}
        priceOfProduct={priceOfProduct}
      />
      <ProccedToBuy
        onCheckboxChange={handleCheckboxChange}
        length={cartItems.length}
        priceOfProduct={priceOfProduct}
      />
    </section>
  );
};

export default CartPage;
