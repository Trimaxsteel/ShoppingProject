import { useState } from "react";
import { supabase } from "../lib/supabase/products";

export const useSupabase = () => {
  const [products, setProducts] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [singleProduct, setSingleProduct] = useState<any>([]);
  const [mensClothing, setMensClothing] = useState<any>([]);
  const [womenClothing, setWomenClothing] = useState<any>([]);
  const [electonicItems, setElectronicItems] = useState<any>([]);
  const [productLoading, setProductLoading] = useState(false);

  const getDataFromSupabase = async () => {
    let { data, error } = await supabase.from(`products`).select("*");

    if (data) {
      setProducts(data);
    } else {
      console.log(error);
    }
  };

  const getFilteredData = async (query: string) => {
    // If the query matches a known category, filter by category only
    const knownCategories = [
      "fresh",
      "deals",
      "minitv",
      "sell",
      "gift cards",
      "buy again",
      "browsing history",
      "kapil",
      "amazon pay",
      "coupons",
      "books",
      "gift ideas",
      "health",
      "amazonbasics",
      "home improvement",
      "customer service",
    ];
    const normalized = query.toLowerCase().replace(/-/g, " ");
    let data, error;
    if (knownCategories.includes(normalized)) {
      ({ data, error } = await supabase
        .from(`products`)
        .select("*")
        .ilike("category", `%${normalized}%`));
    } else {
      ({ data, error } = await supabase
        .from(`products`)
        .select("*")
        .or(
          `name.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`,
        ));
    }
    if (data) {
      setFilterData(data);
    } else {
      setFilterData([]);
      console.log(error);
    }
  };

  const getProductsById = async (id: number) => {
    setProductLoading(true);
    let { data, error } = await supabase
      .from(`products`)
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setSingleProduct([data]);
    } else {
      setSingleProduct([]);
      console.log(error);
    }
    setProductLoading(false);
  };

  const getProductsofMens = async () => {
    let { data, error } = await supabase
      .from(`products`)
      .select("*")
      .ilike("category", "%men's clothing%");
    if (data) {
      setMensClothing(data);
    } else {
      console.log(error);
    }
  };

  const getProductsofWomen = async () => {
    let { data, error } = await supabase
      .from(`products`)
      .select("*")
      .ilike("category", "%women's clothing%");
    if (data) {
      setWomenClothing(data);
    } else {
      console.log(error);
    }
  };

  return {
    products,
    filterData,
    getDataFromSupabase,
    getFilteredData,
    singleProduct,
    getProductsById,
    getProductsofMens,
    mensClothing,
    getProductsofWomen,
    womenClothing,
    productLoading,
  };
};
