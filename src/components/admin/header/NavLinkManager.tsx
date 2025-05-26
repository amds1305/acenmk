
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useNavLinks } from './navigation';
import { NavLinkDialog, NavLinkList, NavLinkSearch } from './navigation/components';
import { NavLink } from './types';

const NavLinkManager = () => {
  // Utilisation du hook personnalisé
  const {
    navLinks,
    editingLink,
    isDialogOpen,
    isLoading,
    setEditingLink,
    setIsDialogOpen,
    handleAddLink,
    handleEditLink,
    handleDeleteLink,
    handleSaveLink,
    toggleLinkVisibility,
    moveLink
  } = useNavLinks();

  // State for filtered links
  const [filteredLinks, setFilteredLinks] = useState<NavLink[]>(navLinks);

  // Handle search query changes
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredLinks(navLinks);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = navLinks.filter(link => 
      link.name.toLowerCase().includes(lowerCaseQuery) || 
      link.href.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredLinks(filtered);
  };

  // Update filtered links when navLinks changes
  React.useEffect(() => {
    setFilteredLinks(navLinks);
  }, [navLinks]);

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Structure du menu de navigation</h3>
          <div className="flex items-center gap-4">
            <SaveIndicator status={isLoading ? 'saving' : 'idle'} />
            <Button onClick={handleAddLink} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau lien
            </Button>
          </div>
        </div>
        
        {/* Add search component */}
        <NavLinkSearch onSearch={handleSearch} />
        
        <NavLinkList
          navLinks={filteredLinks}
          onEdit={handleEditLink}
          onDelete={handleDeleteLink}
          onMove={moveLink}
          onToggleVisibility={toggleLinkVisibility}
        />
        
        <NavLinkDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          editingLink={editingLink}
          navLinks={navLinks}
          isLoading={isLoading}
          onSave={handleSaveLink}
        />
      </div>
    </CardContent>
  );
};

export default NavLinkManager;
