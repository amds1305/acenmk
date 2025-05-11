
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from '../../../header/types';
import { ChevronUp, ChevronDown, GripVertical, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NavLinkItemProps } from '../types';

export const NavLinkItem: React.FC<NavLinkItemProps> = ({
  navLink,
  children,
  level = 0,
  onEdit,
  onDelete,
  onToggleVisibility,
  onMove
}) => {
  // Use icon names as string instead of React components
  const getIconDescription = (iconName: string | null) => {
    return iconName ? `Icône: ${iconName}` : 'Sans icône';
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 p-2 hover:bg-muted/50 rounded-md">
        <div className="flex-1 flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="cursor-move opacity-50">
            <GripVertical className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <div className="font-medium">{navLink.name}</div>
            <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
              <span>{navLink.href}</span>
              <span>{getIconDescription(navLink.icon)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {navLink.requires_auth && <Badge variant="secondary">Auth</Badge>}
            {navLink.is_external && <Badge variant="outline">Externe</Badge>}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleVisibility(navLink.id)}
            >
              {navLink.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => onEdit(navLink)}>
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => onDelete(navLink.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => onMove(navLink.id, 'up')}>
              <ChevronUp className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => onMove(navLink.id, 'down')}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {children && (
        <div className="pl-8 border-l-2 border-dotted ml-6 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavLinkItem;
