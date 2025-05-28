import React from "react";
import { IoIosStar } from "react-icons/io";

const Ratings = ({ rating }: { rating: any }) => {
  if (typeof rating === "string") {
    try {
      rating = JSON.parse(rating);
    } catch {
      rating = { rate: 0, count: 0 };
    }
  } else if (!rating) {
    rating = { rate: 0, count: 0 };
  }

  return (
    <div className="gap flex items-center text-orange-400">
      {Array(4)
        .fill(1)
        .map((star, indx) => (
          <IoIosStar key={indx} />
        ))}
      <div className="pl-2 text-blue-900">{rating.count || 0} ratings</div>
    </div>
  );
};

export default Ratings;
