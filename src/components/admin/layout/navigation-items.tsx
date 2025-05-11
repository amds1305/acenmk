
import React from 'react';
import { NavItem } from './types';
import { 
  LayoutDashboard, 
  Layout, 
  Flag, 
  Settings, 
  Info, 
  Shield, 
  Users, 
  FileQuestion,
  ExternalLink,
  Home
} from 'lucide-react';

// Navigation items for admin sidebar
const adminNavItems: (NavItem | { divider?: boolean })[] = [
  {
    path: '/admin',
    label: 'Tableau de bord',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    path: '/admin/home',
    label: 'Page d\'accueil',
    icon: <Home className="h-4 w-4" />,
  },
  {
    path: '/admin/hero',
    label: 'Hero Section',
    icon: <Flag className="h-4 w-4" />,
  },
  {
    path: '/admin/services',
    label: 'Services',
    icon: <Settings className="h-4 w-4" />,
  },
  {
    path: '/admin/about',
    label: 'À propos',
    icon: <Info className="h-4 w-4" />,
  },
  {
    path: '',
    label: '',
    icon: <></>,
    divider: true,
  },
  {
    path: '/admin/users',
    label: 'Utilisateurs',
    icon: <Users className="h-4 w-4" />,
  },
  {
    path: '/admin/roles',
    label: 'Rôles & Permissions',
    icon: <Shield className="h-4 w-4" />,
  },
  {
    path: '/admin/faq',
    label: 'FAQ',
    icon: <FileQuestion className="h-4 w-4" />,
  },
  {
    path: '/admin/external-links',
    label: 'Liens Externes',
    icon: <ExternalLink className="h-4 w-4" />,
  },
];

// Function to filter navigation items based on access - exported but not used in Sidebar now
export const filterNavItems = (items: (NavItem | { divider?: boolean })[], 
  hasAccess: (path: string) => boolean): (NavItem | { divider?: boolean })[] => {
  return items.filter(item => {
    if ('divider' in item && item.divider) {
      return true; // Keep dividers
    }
    
    if ('path' in item && item.path) {
      return hasAccess(item.path);
    }
    
    return false;
  });
};

export default adminNavItems;
