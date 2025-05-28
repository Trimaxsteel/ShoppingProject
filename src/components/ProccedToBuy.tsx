import React from "react";
import SubTotal from "./shared/SubTotal";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ProccedToBuy = ({
  length,
  priceOfProduct,
  onCheckboxChange,
}: {
  length: number;
  priceOfProduct: number;
  onCheckboxChange: any;
}) => {
  const router = useRouter();
  return (
    <div className="mt-10 h-fit w-[90%] bg-white lg:mt-0 lg:w-[40%]">
      <div className="flex flex-col items-center justify-center p-5">
        <SubTotal length={length} price={priceOfProduct} />
        <div className="flex items-center gap-x-2">
          <Checkbox onCheckedChange={onCheckboxChange} />
          <p className="text-xs lg:text-sm">This order contains a gift</p>
        </div>
        <Button
          onClick={() => router.push(`/checkout`)}
          className="mt-5 w-1/2 rounded-2xl bg-yellow-400 text-gray-900 hover:bg-yellow-500"
        >
          Proceed to Buy
        </Button>
      </div>
    </div>
  );
};

export default ProccedToBuy;
