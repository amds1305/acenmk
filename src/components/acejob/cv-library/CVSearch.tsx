
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CVSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenFilters: () => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

const CVSearch = ({ searchTerm, onSearchChange, onOpenFilters, viewMode, onViewModeChange }: CVSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Rechercher par nom, compétence, poste..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onOpenFilters}
      >
        <Filter className="h-4 w-4" />
        Filtres avancés
      </Button>
      <div className="flex items-center gap-2">
        <Button 
          variant={viewMode === 'grid' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewModeChange('grid')}
        >
          Grille
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewModeChange('list')}
        >
          Liste
        </Button>
      </div>
    </div>
  );
};

export default CVSearch;
