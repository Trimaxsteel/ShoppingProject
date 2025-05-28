import Image from "next/image";
import React from "react";
import Ratings from "./Ratings";
import AddToCart from "./AddToCart";

const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {
  return (
    <section className="mx-auto mt-10 w-[80%] bg-white">
      <div className="p-5">
        {singleProduct.map((product: any) => {
          return (
            <div className="flex gap-x-5" key={product.id}>
              <Image
                src={product.image}
                alt={product.category}
                width={250}
                height={150}
                className="object-scale-down object-center"
              />
              <div className="mx-4-2 flex w-[60%] flex-col gap-y-3">
                <h1 className="text-lg font-bold">{product.title}</h1>
                <Ratings rating={product.rating} />
                <p className="pr-3 text-justify text-sm leading-relaxed tracking-normal">
                  {product.description}
                </p>
                <h1 className="text-2xl font-bold">{`₹ ${product.price}`}</h1>
              </div>
              <AddToCart product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SingleProduct;
