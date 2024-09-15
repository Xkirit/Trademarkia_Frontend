// app/header.tsx

import React, { useState } from 'react';
import TableSection from '@/components/TableSection'; // Import the TableSection component
import Navbar from '@/components/Navbar';
import StaticTableHeaders from '@/components/StaticTable';
import { IoIosSearch } from "react-icons/io";

interface HeaderProps {
  onSearch: (search: string) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  
  // Remove loading and setLoading from props
}

const Header: React.FC<HeaderProps> = ({ onSearch, setError }) => {
  const [searchTerm, setSearchTermState] = useState('');
  const [loading, setLoading] = useState(false); // Manage loading state locally

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await onSearch(searchTerm);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full bg-white border-b-[6px] border-[#EAF1FF] py-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-start py-4 px-2 sm:px-4 md:px-6 lg:px-8 gap-14">
        <div className="w-40 h-6 mb-4 sm:mb-0">
          <img
            src="/logo_trademarkia.png"
            alt="Trademarkia Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className=" sm:w-2/3 md:w-1/2">
          <form className="flex h-full gap-3" onSubmit={handleSearch}>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for Trademarks"
                className="w-full h-12 px-4 pl-10 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTermState(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <IoIosSearch className="text-xl" />
              </span>
            </div>
            <button
              type="submit"
              className="w-32 h-12 bg-blue-600 text-white border border-gray-300 rounded-2xl hover:bg-blue-500 transition-colors"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;