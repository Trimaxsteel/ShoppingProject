"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { getCart, removeFromCart } from "../../redux/cartSlice";
import Image from "next/image";
import { Button } from "./ui/button";
import axios from "axios";
import { supabase } from "../../lib/supabase/products";

const stripeKey = process.env.NEXT_PUBLIC_STRIP_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const OrderSummary = () => {
  const cart = useAppSelector(getCart);
  const [stripeError, setStripeError] = React.useState("");
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const dispatch = useAppDispatch();

  const createStripeSession = async () => {
    if (!stripePromise) {
      // Demo mode: fake order success
      setOrderSuccess(true);
      cart.forEach((item: any) => dispatch(removeFromCart(item)));
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const stripe = await stripePromise;

    const checkouSession = await axios.post("/api/checkout-sessions", {
      items: cart,
      email: user?.email,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkouSession.data.id,
    });

    if (result?.error) {
      setStripeError(result.error.message || "Stripe checkout error.");
    }
  };

  if (orderSuccess) {
    return (
      <div className="m-10 mx-auto h-fit w-[30%] rounded-xl border border-green-400 bg-green-50 p-5 text-center text-green-700 text-xl font-semibold">
        Order placed successfully! (Demo mode)
        <br />
        Thank you for your purchase.
      </div>
    );
  }

  return (
    <div className="m-10 mx-auto h-fit w-[30%] rounded-xl border  border-white p-5 ">
      <h1 className="text-xl font-semibold">Order Summary </h1>
      <div className="mt-5 rounded-lg bg-white p-5">
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.id} className="pt-22 space-y-2 divide-y">
              <Image
                src={cartItem.image}
                width={100}
                height={100}
                alt=""
                className="object-contain pt-2 mix-blend-multiply"
              />
              <p className="pt-2 text-sm font-medium">
                Product Quantity: {cartItem.quantity}
              </p>
              <p className="pt-2 font-bold">{`₹ ${cartItem.price}`}</p>
            </div>
          );
        })}
        {stripeError && (
          <div className="text-red-600 text-sm mt-2">{stripeError}</div>
        )}
        <Button
          onClick={createStripeSession}
          className="mt-2 w-full bg-yellow-400 text-black hover:bg-yellow-500"
          disabled={cart.length === 0}
        >
          Place Your Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
