"use client";

import FilterButton from "@/components/FilterButton";
import { SearchIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi"; // Importing FilterIcon from react-icons

export default function Navbar() {
  return (
    <div className="container mx-auto mt-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-semibold text-sm sm:text-base">Also Try searching for:</p>
          <p className="bg-orange-200 text-orange-700 px-3 py-1 rounded-xl text-xs sm:text-sm">*ike</p>
        </div>
        <div className="flex justify-end">
          <FilterButton />
        </div>
      </div>
    </div>
  );
}