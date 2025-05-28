"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSupabase } from "../../../../hooks/useSupabase";
import SearchResults from "@/components/SearchResults";

const SearchPage = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();
  useEffect(() => {
    getFilteredData(query.toString());
  }, [getFilteredData, query]);
  return (
    <div className="h-[85.4vh]">
      <SearchResults filterData={filterData} />
    </div>
  );
};

export default SearchPage;
