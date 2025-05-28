import Image from "next/image";
import React, { useEffect } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import Ratings from "./Ratings";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const { getProductsofMens, mensClothing, getDataFromSupabase, products } =
    useSupabase();
  useEffect(() => {
    getProductsofMens();
    getDataFromSupabase();
  }, [getProductsofMens, getDataFromSupabase]);

  return (
    <div className="mb-5 flex w-full flex-col gap-5 ">
      <div className="grid grid-cols-1  gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1 bg-white p-5">
          <div className="pl-5 text-lg font-bold">
            Pick up where you left off
          </div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white p-5">
          <div className="pl-5 text-lg font-bold">Keep shopping for</div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white p-5">
          <div className="pl-5 text-lg font-bold">Buy Again</div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className=" col-span-1 lg:col-span-1">
          <div className="justify-betwee grid grid-rows-1 gap-6">
            <div className="row-span-1 h-fit bg-white p-2">
              <div className="p-3 mix-blend-multiply">
                <div className="flex items-center justify-center gap-x-5">
                  <Image
                    src="/01.jpg"
                    width={100}
                    height={100}
                    alt=""
                    className="cursor-pointer"
                  />
                  <p className="text-xl font-semibold">
                    Save up to 28% with GST*
                  </p>
                </div>
              </div>
            </div>
            <div className="row-span-1 h-fit bg-white">
              <div className="p-3 mix-blend-multiply">
                {mensClothing.slice(0, 1).map((items: any) => (
                  <div key={items.id}>
                    <div className=" flex gap-x-5 p-1">
                      <Image
                        onClick={() => router.push(`search/men`)}
                        src={items.image}
                        width={80}
                        height={100}
                        alt=""
                        key={items.id}
                        className="cursor-pointer"
                      />
                      <h2 className="mt-5 font-bold">{items.title}</h2>
                    </div>
                    <p className="line-clamp-2 p-1 text-xs">
                      {items.description}
                    </p>
                    <div className="p-1 text-xs">
                      <Ratings rating={items.rating} />
                    </div>

                    <p className="p-1 text-xs">{items.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className=" col-span-2 md:col-span-2 lg:col-span-2">
          <div className="relative h-full overflow-hidden">
            <h2 className="absolute top-[1%] z-20 p-5 text-lg font-bold text-white">
              Prime Video: Recommended for you
            </h2>
            <p className="absolute top-[8%] z-20 p-5 text-xs text-white">
              Inside Edge - Season 1
            </p>
            <div className="absolute z-10 h-full w-full bg-gradient-to-t  from-transparent to-black"></div>
            <Image
              width={600}
              height={200}
              alt=""
              src={`/03.jpg`}
              className="absolute -top-2 h-full w-full cursor-pointer object-cover"
            />
          </div>
        </div>

        <div className="col-span-1 bg-white p-5">
          <div className="pl-5 text-lg font-bold">Categories to explore</div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white p-5">
          <div className="pl-5 text-lg font-bold">
            Revamp your home in style
          </div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 block bg-white p-5 lg:hidden">
          <div className="pl-5 text-lg font-bold">
            Revamp your home in style
          </div>
          <div className="grid grid-cols-2 gap-5 p-5 mix-blend-multiply">
            {mensClothing.slice(0, 4).map((items: any) => (
              <Image
                onClick={() => router.push(`search/mens`)}
                src={items.image}
                width={100}
                height={100}
                alt=""
                key={items.id}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Today Deals */}
      <div className=" flex h-72 w-full items-center justify-center bg-white">
        <Carousel className="w-full px-5">
          <h1 className="mb-2 text-xl font-bold">
            Today’s Deals &nbsp;&nbsp;
            <span className="text-sm font-normal text-blue-600">
              See all deals
            </span>
          </h1>
          <CarouselContent className="">
            {products.map((product: any) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-none bg-[#f7f8f8] p-12">
                  <Image
                    onClick={() => router.push(`product/${product.id}`)}
                    src={product.image}
                    width={70}
                    height={100}
                    alt=""
                    className="h-auto w-auto cursor-pointer object-cover mix-blend-multiply"
                  />
                </div>
                <div className="mt-1 flex items-center gap-x-1">
                  <p className="bg-red-500 p-1 text-xs text-white">
                    up to 94% off
                  </p>
                  <span className="text-xs"> limited time deal</span>
                </div>
                <p className="mb-2 mt-1 text-base font-bold text-center bg-white bg-opacity-80 rounded p-1 shadow">
                  {product.name || product.title}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-[4%] right-[4%] top-[60%] flex items-center justify-center">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      {/* Today Deals - 2 */}
      <div className=" flex h-72 w-full items-center justify-center bg-white">
        <Carousel className="w-full px-5">
          <h1 className="mb-2 text-xl font-bold">You might also like</h1>
          <CarouselContent className="">
            {products.map((product: any) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-none bg-[#f7f8f8] p-12">
                  <Image
                    onClick={() => router.push(`product/${product.id}`)}
                    src={product.image}
                    width={70}
                    height={100}
                    alt=""
                    className="h-auto w-auto cursor-pointer object-cover mix-blend-multiply"
                  />
                </div>
                <div className="mt-1 flex items-center gap-x-1">
                  <p className="bg-red-500 p-1 text-xs text-white">
                    up to 94% off
                  </p>
                  <span className="text-xs"> limited time deal</span>
                </div>
                <p className="mb-2 line-clamp-1 text-xs">{product.title}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-[4%] right-[4%] top-[60%] flex items-center justify-center">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Category;
