
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type SearchResult = {
  id: string;
  title: string;
  excerpt: string;
  category: 'blog' | 'services' | 'portfolio' | 'faq';
  url: string;
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  // Simulated search results - in a real app, this would be an API call
  useEffect(() => {
    if (query.trim().length > 2) {
      setLoading(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        // Mock search results based on query
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: `Article sur ${query}`,
            excerpt: `Découvrez notre expertise en ${query} et comment nous pouvons vous aider.`,
            category: 'blog',
            url: `/blog/example-post`
          },
          {
            id: '2',
            title: `Service de ${query}`,
            excerpt: `Notre service de ${query} est conçu pour répondre à vos besoins.`,
            category: 'services',
            url: `/#services`
          },
          {
            id: '3',
            title: `Projet sur ${query}`,
            excerpt: `Étude de cas sur notre réalisation en ${query}.`,
            category: 'portfolio',
            url: `/portfolio/1`
          },
          {
            id: '4',
            title: `FAQ sur ${query}`,
            excerpt: `Questions fréquentes sur ${query}.`,
            category: 'faq',
            url: `/faq`
          }
        ];
        
        setResults(mockResults);
        setLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'blog': return 'Articles';
      case 'services': return 'Services';
      case 'portfolio': return 'Portfolio';
      case 'faq': return 'FAQ';
      default: return category;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-64 justify-between" onClick={() => setOpen(true)}>
          <span className="text-muted-foreground">Rechercher...</span>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Rechercher..." 
            value={query}
            onValueChange={setQuery}
            className="h-9"
          />
          <CommandList>
            {loading && (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}
            
            {!loading && query.trim().length > 2 && results.length === 0 && (
              <CommandEmpty>Aucun résultat trouvé pour "{query}"</CommandEmpty>
            )}
            
            {!loading && results.length > 0 && (
              <CommandGroup>
                {results.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => handleSelect(result)}
                    className="p-2"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{result.title}</p>
                        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {getCategoryLabel(result.category)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {result.excerpt}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Search;
