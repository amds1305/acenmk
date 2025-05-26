
import React from 'react';
import { NavLink } from '../../../header/types';
import NavLinkItem from './NavLinkItem';

interface NavLinkListProps {
  navLinks: NavLink[];
  onEdit: (link: NavLink) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string) => void;
}

const NavLinkList = ({
  navLinks,
  onEdit,
  onDelete,
  onMove,
  onToggleVisibility
}: NavLinkListProps) => {
  // Fonction récursive pour afficher les liens et leurs sous-liens
  const renderNavLinks = (links: NavLink[], level = 0) => {
    // Trier les liens par ordre avant affichage
    const sortedLinks = [...links].sort((a, b) => a.order - b.order);
    
    return sortedLinks.map((link) => {
      // Trouver les enfants de ce lien
      const children = navLinks.filter(l => l.parentId === link.id);
      
      return (
        <NavLinkItem
          key={link.id}
          link={link}
          level={level}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          onToggleVisibility={onToggleVisibility}
        >
          {/* Afficher récursivement les enfants */}
          {children.length > 0 && renderNavLinks(children, level + 1)}
        </NavLinkItem>
      );
    });
  };

  // Liens de premier niveau (sans parent)
  const parentLinks = navLinks.filter(link => link.parentId === null);

  // Display a message when no links are found
  if (parentLinks.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Aucun lien trouvé. Ajustez votre recherche ou ajoutez de nouveaux liens.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {renderNavLinks(parentLinks)}
    </div>
  );
};

export default NavLinkList;
