"use client";
import CheckOutForm from "@/components/CheckOutForm";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaLock } from "react-icons/fa";

const CheckOutPage = () => {
  const router = useRouter();
  return (
    <div className="absolute inset-0 z-20 bg-gray-200">
      <header className="mx-auto flex w-full items-center justify-around border-b-2 bg-gradient-to-b from-transparent to-white">
        <Image
          onClick={() => router.push(`/`)}
          src={
            "https://logolook.net/wp-content/uploads/2021/03/Amazon-logo.png"
          }
          width={120}
          height={100}
          alt="logo"
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-semibold text-gray-900">Check Out</h1>
        <div className="text-3xl text-gray-300">
          <FaLock />
        </div>
      </header>
      <div className="flex">
        <CheckOutForm />
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckOutPage;
