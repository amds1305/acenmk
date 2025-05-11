
import { NavLink } from '../../header/types';

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
