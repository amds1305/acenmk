
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Normally would navigate to search results page with query parameter
      // For demo, we'll just log and close
      console.log('Searching for:', query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ca3c66] transition-all"
          autoFocus
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 hover:bg-transparent"
          onClick={onClose}
        >
          <X className="text-gray-400 hover:text-[#ca3c66]" size={20} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
