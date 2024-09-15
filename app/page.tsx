"use client"

import React, { useState } from 'react';
import TableSection from '@/components/TableSection';
import StaticTableHeaders from '@/components/StaticTable';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import FilterOverlay from '@/components/FilterOverlay'; // Import FilterOverlay

const HomePage = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'list' | 'grid'>('list'); // Manage displayMode state
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Manage filter overlay visibility

  const handleSearch = async (search: string) => {
    setLoading(true);
    setError(null);
    setTableData([]); // Reset table data before fetching new data

    try {
      const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          input_query: search,
          input_query_type: "",
          sort_by: "default",
          status: [],
          exact_match: false,
          date_query: false,
          owners: [],
          attorneys: [],
          law_firms: [],
          mark_description_description: [],
          classes: [],
          page: 1,
          rows: 10,
          sort_order: "desc",
          states: [],
          counties: []
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(displayMode);

      const hits = data.body.hits.hits.map((hit: any) => ({
        id: hit._id,
        mark: hit._source.mark_identification,
        current_owner: hit._source.current_owner,
        current_owner_cleaned: hit._source.current_owner_cleaned,
        registration_date: hit._source.registration_date,
        status_type: hit._source.status_type,
        status_date: hit._source.status_date,
        renewal_date: hit._source.renewal_date,
        mark_description_description: hit._source.mark_description_description[0],
        mark_identification: hit._source.mark_identification,
        filing_date: hit._source.filing_date,
        first_use_anywhere_date: hit._source.first_use_anywhere_date, // Ensure this field is included
      }));

      setTableData(hits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mt-10 px-2 sm:px-4 md:px-6 lg:px-8">
      <Header 
        onSearch={handleSearch} 
        setError={setError}
      />
      <Navbar onFilterClick={toggleFilter} className="sticky top-0 z-50" /> {/* Make Navbar sticky */}
      {isFilterOpen && (
        
        <FilterOverlay 
          isOpen={isFilterOpen} 
          onClose={toggleFilter} 
          setDisplayMode={setDisplayMode} // Pass setDisplayMode to FilterOverlay
        />
    
        
      )}

      {/* <div className='flex justify-end'>
        <button className='bg-orange-200 text-orange-700 px-3 py-1 rounded-xl text-xs sm:text-sm'>Clear All</button>
      </div> */}


      <div className="container mx-auto mt-6 px-2 sm:px-4 md:px-6 lg:px-8">
        <table className="w-full">
          {!tableData.length && <StaticTableHeaders />}
          <tbody>
            {error && <tr><td colSpan={6} className="text-red-500 text-center">{error}</td></tr>}
            {tableData.length > 0 && <TableSection data={tableData} displayMode={displayMode} />}
            {loading && <tr><td colSpan={6} className="text-center">Loading...</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;