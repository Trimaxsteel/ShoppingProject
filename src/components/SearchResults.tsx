import React from "react";
import ProductCards from "./ProductCards";

function SearchResults({ filterData }: { filterData: any }) {
  const hasResults = filterData && filterData.length > 0;
  return (
    <section className="w-screen">
      <div className="mx-auto w-[90%]">
        <div className="mt-10 ">
          <h1 className="font-bold text-xl mb-2">Results {filterData.length}</h1>
          <p>
            {hasResults
              ? "Check each product page for other buying options. Price and other details may vary based on product size and colour."
              : "No products found in this category. Try another category or check back later!"}
          </p>
        </div>
        {hasResults ? (
          <div
            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
          >
            {filterData?.map((products: any) => (
              <ProductCards key={products.id} product={products} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center text-gray-500">
            <img src="/logo.png" alt="No results" className="w-32 h-32 opacity-30 mb-4" />
            <span className="text-lg font-semibold">Nothing to show here!</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
