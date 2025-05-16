
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  isOpen?: boolean;
  toggleSearch: () => void;
  placeholder?: string;
  expandOnFocus?: boolean;
  position?: string;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isOpen = false,
  toggleSearch,
  placeholder = "Rechercher...",
  expandOnFocus = true,
  position = "right",
  onClose,
}) => {
  return (
    <div className="relative">
      <button
        onClick={toggleSearch}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md p-4 w-64">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
