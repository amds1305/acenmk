
import { NavLink } from '../../header/types';

export interface NavLinkItemProps {
  navLink: NavLink;
  children?: React.ReactNode;
  level?: number;
  onEdit: (link: NavLink) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

export interface NavLinkFormProps {
  navLink: NavLink;
  updateNavLink: (key: keyof NavLink, value: any) => void;
  existingLinks: NavLink[];
  onSave: () => void;
  onCancel: () => void;
}

export interface NavLinkDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingLink: NavLink | null;
  navLinks: NavLink[];
  isLoading: boolean;
  onSave: (link: NavLink) => void;
}

export interface NavLinkListProps {
  navLinks: NavLink[];
  onEdit: (link: NavLink) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string) => void;
}

export interface NavLinkSearchProps {
  onSearch: (query: string) => void;
}

export interface UseNavLinksReturn {
  navLinks: NavLink[];
  editingLink: NavLink | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  setEditingLink: (link: NavLink | null) => void;
  setIsDialogOpen: (open: boolean) => void;
  handleAddLink: () => void;
  handleEditLink: (link: NavLink) => void;
  handleDeleteLink: (linkId: string) => void;
  handleSaveLink: (data: NavLink) => void;
  toggleLinkVisibility: (linkId: string) => void;
  moveLink: (linkId: string, direction: 'up' | 'down') => void;
}
