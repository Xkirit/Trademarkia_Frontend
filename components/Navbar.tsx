"use client";

import FilterButton from "@/components/FilterButton";
import { SearchIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi"; // Importing FilterIcon from react-icons

export default function Navbar() {
  return (
    <div className="grid grid-cols-2  max-w-[1240px] gap-[100px]">
      <div className="flex flex-row gap-2 w-full h-[52px] mt-10 px-5 items-center g-">
        <p className="font-semibold">Also Try searching for:</p>
        <p className="border border-orange-400 bg-orange-200 text-orange-700 px-4 py-1 rounded-xl">*ike</p>
      </div>
      <div className="flex items-end">
        <FilterButton />
      </div>
    </div>
  );
}

