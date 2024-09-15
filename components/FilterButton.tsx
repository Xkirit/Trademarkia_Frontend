import React, { useState, useRef, useEffect } from 'react';
import FilterOverlay from './FilterOverlay';
import { FunnelIcon } from '@heroicons/react/24/outline'; // Changed to outline version

const FilterButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('list');
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  // Close the overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeOverlay();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        closeOverlay();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative ml-auto mt-12" ref={buttonRef}>
      <button
        className="w-24 h-10 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center"
        onClick={toggleOverlay}
        aria-label="Filter Options"
      >
        <FunnelIcon className="h-5 w-5 mr-2 text-gray-600" /> {/* Added text color */}
        <span>Filter</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 z-10">
          <FilterOverlay
            isOpen={isOpen}
            onClose={closeOverlay}
            setDisplayMode={setDisplayMode} // Pass setDisplayMode as a prop
          />
        </div>
      )}
    </div>
  );
};

export default FilterButton;