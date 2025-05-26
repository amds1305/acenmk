
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pen, Trash2, ChevronDown, ChevronUp, ChevronRight, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { NavLink } from '../../../header/types';
import { iconsMap } from '../../iconsMap';

interface NavLinkItemProps {
  link: NavLink;
  level?: number;
  children?: React.ReactNode;
  onEdit: (link: NavLink) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string) => void;
}

const NavLinkItem = ({
  link,
  level = 0,
  children,
  onEdit,
  onDelete,
  onMove,
  onToggleVisibility
}: NavLinkItemProps) => {
  // Récupérer l'icône si elle existe
  const IconComponent = link.icon ? iconsMap[link.icon] : null;
  
  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md ${level > 0 ? 'ml-6 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}>
        <div className="flex items-center space-x-2">
          {level > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          <div>
            <div className="flex items-center">
              {IconComponent && (
                <div className="mr-2">
                  <IconComponent className="h-4 w-4" />
                </div>
              )}
              <p className={`font-medium ${!link.isVisible ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                {link.name || <em className="text-gray-400">(Icône sans texte)</em>}
              </p>
              {link.isExternal && <ExternalLink className="ml-1 h-3 w-3 text-gray-400" />}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button size="sm" variant="ghost" onClick={() => onMove(link.id, 'up')}>
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onMove(link.id, 'down')}>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onToggleVisibility(link.id)}
          >
            {link.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onEdit(link)}>
            <Pen className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(link.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      
      {/* Afficher les enfants si présents */}
      {children && (
        <div className="ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavLinkItem;
