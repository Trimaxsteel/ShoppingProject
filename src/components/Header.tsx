"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../hooks/useRedux";
import { getCart } from "../../redux/cartSlice";
import { supabase } from "../../lib/supabase/products";

const subHeaderItems = [
  "All",
  "Fresh",
  "Today's Deals",
  "Amazon miniTV",
  "Sell",
  "Gift Cards",
  "Buy Again",
  "Browsing History",
  "kapil's Amazon.in",
  "Amazon Pay",
  "Coupons",
  "Books",
  "Gift Ideas",
  "Health, Household & Personal Care",
  "AmazonBasics",
  "Home Improvement",
  "Customer Service",
];

const categoryMap: Record<string, string> = {
  Fresh: "fresh",
  "Today's Deals": "deals",
  "Amazon miniTV": "minitv",
  Sell: "sell",
  "Gift Cards": "gift cards",
  "Buy Again": "buy again",
  "Browsing History": "browsing history",
  "kapil's Amazon.in": "kapil",
  "Amazon Pay": "amazon pay",
  Coupons: "coupons",
  Books: "books",
  "Gift Ideas": "gift ideas",
  "Health, Household & Personal Care": "health",
  AmazonBasics: "amazonbasics",
  "Home Improvement": "home improvement",
  "Customer Service": "customer service",
};

const Header = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const searchHandler = () => {
    router.push(`/search/${query}`);
  };
  const cart = useAppSelector(getCart);

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  console.log(user);

  return (
    <header>
      <div className="h-[7vh]  bg-gray-900">
        <div className="flex items-center justify-around py-2 text-white">
          <div onClick={() => router.push(`/`)}>
            <Image
              src={logo}
              alt="logo"
              width={80}
              height={200}
              className=" cursor-pointer"
            />
          </div>
          <div className="flex h-[4vh] w-[30%] md:w-[40%] lg:w-[60%]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 text-gray-800 outline-none"
              placeholder="Search Amazon.in"
            />
            <button
              onClick={searchHandler}
              className="flex w-[15%] items-center justify-center rounded-r-md bg-orange-400 p-2 text-2xl lg:w-[10%]"
            >
              <IoSearch />
            </button>
          </div>
          <div>
            <NavigationMenu className="">
              <NavigationMenuList>
                <NavigationMenuItem
                  onClick={() => router.push(`/signin`)}
                  className="flex cursor-pointer flex-col px-2 pt-2 text-sm leading-[5px] underline"
                >
                  {!user ? "SignIn" : user.identities[0].identity_data.name}
                  <NavigationMenuTrigger className="bg-transparent font-semibold">
                    Account & Lists
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="cursor-pointer p-5 ">
                    <NavigationMenuLink
                      onClick={async () => {
                        const { error } = await supabase.auth.signOut();
                        router.push(`/signin`);
                        console.log(error);
                      }}
                    >
                      SignOut
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <button onClick={() => router.push("/orders")}>
            <p className="flex flex-col items-start text-xs leading-[8px]">
              Returns <br />
              <span className="text-lg font-semibold">& orders</span>
            </p>
          </button>
          <div className=" h-13 flex cursor-pointer items-end justify-end gap-x-2 text-2xl">
            <div className="flex flex-col items-center justify-center">
              <p
                className={`flex items-center justify-center text-xs ${
                  cart.length === 0
                    ? "hidden"
                    : "block h-5 w-5 rounded-full bg-red-600"
                }`}
              >
                {cart.length}
              </p>
              <FaShoppingCart onClick={() => router.push(`/cart`)} />
            </div>
            <p className="text-lg font-semibold">cart</p>
          </div>
        </div>
      </div>
      <div className="line-clamp-1 flex flex-grow flex-wrap gap-y-1 bg-slate-800 py-2 pl-4 text-xs text-white">
        {subHeaderItems.slice(0, 15).map((item, index) => (
          <button
            key={index}
            className="mx-2 cursor-pointer hover:underline bg-transparent border-none outline-none"
            onClick={() => {
              if (item === "All") router.push("/");
              else if (categoryMap[item])
                router.push(`/search/${encodeURIComponent(categoryMap[item])}`);
              else
                router.push(
                  `/search/${encodeURIComponent(
                    item.toLowerCase().replace(/\s+/g, "-")
                  )}`
                );
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
