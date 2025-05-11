
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { NavLinkSearchProps } from '../types';

const NavLinkSearch: React.FC<NavLinkSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
  
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Rechercher des liens..."
        value={query}
        onChange={handleSearch}
        className="pl-8"
      />
    </div>
  );
};

export default NavLinkSearch;
