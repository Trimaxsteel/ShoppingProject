"use client";
import SingleProduct from "@/components/SingleProduct";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSupabase } from "../../../../hooks/useSupabase";

const ProductPage = () => {
  const { id } = useParams();
  const { singleProduct, getProductsById, productLoading } = useSupabase();
  useEffect(() => {
    if (id) getProductsById(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (productLoading) {
    return <div className="flex justify-center items-center h-96 text-lg">Loading product...</div>;
  }
  if (!singleProduct || singleProduct.length === 0) {
    return <div className="flex justify-center items-center h-96 text-lg">Product not found.</div>;
  }
  return (
    <div>
      <SingleProduct singleProduct={singleProduct} />
    </div>
  );
};

export default ProductPage;
