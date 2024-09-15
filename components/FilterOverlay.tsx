"use client"

import React, { useState, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange?: (filters: FilterState) => void;  // Make this prop optional
  setDisplayMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>; // Corrected type and name
}

interface FilterState {
  status: string;
  owners: string[];
  lawFirms: string[];
  attorneys: string[];
  displayMode: 'grid' | 'list'; // Changed to specific types
}

const FilterOverlay: React.FC<FilterOverlayProps> = ({
  isOpen,
  onClose,
  onFilterChange, // Ensure this is destructured
  setDisplayMode, // Correct name
}) => {
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    owners: [],
    lawFirms: [],
    attorneys: [],
    displayMode: 'list', // Initialize with 'list'
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const statuses = [
    { name: 'All', color: null },
    { name: 'Registered', color: 'bg-green-500' },
    { name: 'Pending', color: 'bg-yellow-500' },
    { name: 'Abandoned', color: 'bg-red-500' },
    { name: 'Other', color: 'bg-blue-500' }
  ];

  const tabData = [
    { name: 'Owners', items: ['Owner 1', 'Owner 2', 'Owner 3'] },
    { name: 'Law Firms', items: ['Law Firm 1', 'Law Firm 2', 'Law Firm 3'] },
    { name: 'Attorneys', items: ['Attorney 1', 'Attorney 2', 'Attorney 3'] }
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusSelect = (statusName: string) => {
    const newFilters = { ...filters, status: statusName };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);  // Use destructured prop
    console.log(newFilters);
  };

  const handleDisplayModeChange = (mode: 'grid' | 'list') => {
    const newFilters = { ...filters, displayMode: mode };
    setFilters(newFilters);
    setDisplayMode(mode); // Update parent state
  };

  const handleCheckboxChange = (category: 'owners' | 'lawFirms' | 'attorneys', item: string) => {
    const newFilters = { ...filters };
    const index = newFilters[category].indexOf(item);
    if (index > -1) {
      newFilters[category].splice(index, 1);
    } else {
      newFilters[category].push(item);
    }
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);  // Use destructured prop
    console.log(newFilters);
  };

  return (
    <div className="absolute top-full -translate-x-1/2 mt-5 w-80 bg-white bg-opacity-95 rounded-lg z-50 p-0 container mx-auto">
      <div className="flex flex-col space-y-4">
        {/* Status Section */}
        <div className="mb-4 border border-gray-300 rounded-xl p-3 shadow-lg w-[296px] h-[161px]">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <div className="flex flex-wrap gap-2.5">
            {statuses.map((status) => (
              <button
                key={status.name}
                className={`w-max h-[37px] px-3 py-2.5 rounded-xl flex items-center text-black font-semibold text-sm border ${
                  filters.status === status.name ? 'bg-gray-100 border-blue-500' : 'bg-white border-gray-300'
                } hover:bg-gray-100 relative overflow-hidden`}
                onClick={() => handleStatusSelect(status.name)}
              >
                {status.color && (
                  <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${status.color}`} />
                )}
                <span className={status.color ? 'ml-4' : ''}>{status.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-4 border border-gray-300 rounded-xl p-4 px-5 shadow-lg h-[265px] w-[296px] ">
          <Tab.Group>
            <Tab.List className="flex border-b border-gray-200 h-[40px] gap-3">
              {tabData.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `text-sm font-medium leading-5 ${
                      selected
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {tabData.map((tab, tabIndex) => (
                <Tab.Panel key={tab.name} className="pt-4">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder={`Search ${tab.name}`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {tab.items.map((item) => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                          checked={filters[tabIndex === 0 ? 'owners' : tabIndex === 1 ? 'lawFirms' : 'attorneys'].includes(item)}
                          onChange={() => handleCheckboxChange(tabIndex === 0 ? 'owners' : tabIndex === 1 ? 'lawFirms' : 'attorneys', item)}
                          onClick={() => console.log(item)}
                        />
                        <span className="ml-2">{item}</span>
                      </label>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Display Section */}
        <div className="border border-gray-300 rounded-xl py-[20px] px-[20px] w-[296px] h-[130px] shadow-lg">
          <h2 className="text-md font-semibold mb-2">Display</h2>
          <div className="flex space-x-2 w-[255px] h-[50px] bg-gray-100 items-center justify-center px-2 rounded-lg">
            <button
              className={`w-[125px] h-[36px] px-2 py-2 rounded-lg ${
                filters.displayMode === 'grid' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              }`}
              onClick={() => handleDisplayModeChange('grid')}
            >
              Grid View
            </button>
            <button
              className={`w-[125px] h-[36px] px-2 py-2 rounded-lg flex items-center justify-center ${
                filters.displayMode === 'list' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              }`}
              onClick={() => handleDisplayModeChange('list')}
            >
              List View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;