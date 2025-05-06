
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Search from '@/components/Search';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Recherche</h1>
          
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Que recherchez-vous ?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Rechercher</Button>
            </div>
          </form>
          
          <Search />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
