import React from "react";

const SubTotal = ({ length, price }: { length: number; price: number }) => {
  return (
    <div>
      <p className="py-2 text-right">
        {`Subtotal (${length}): ₹`}
        <span className="font-bold">{price}</span>
      </p>
    </div>
  );
};

export default SubTotal;
