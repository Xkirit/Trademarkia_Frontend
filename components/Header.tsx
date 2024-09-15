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
    <header className="flex w-[1440px] border-b-4 border-blue-100 py-3 container h-[118px] justify-text-start text-start">
      <div className="container mx-auto flex items-center justify-start gap-10">
        <div className="w-40 h-6">
          <img
            src="/logo_trademarkia.png"
            alt="Trademarkia Logo"
            className="w-[155px] h-[22px] absolute"
          />
        </div>

        <div className="w-[591px] h-14">
          <form className="flex h-full gap-5" onSubmit={handleSearch}>
            <div className="flex-1 w-72 h-full min-w-screen relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full px-4 pl-10 border border-gray-300 rounded-2xl"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTermState(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <IoIosSearch className="size-[25px]" />
              </span>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-32 h-full bg-blue-600 text-white border border-gray-300 rounded-2xl hover:bg-blue-500"
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
