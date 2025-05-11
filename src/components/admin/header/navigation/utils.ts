
import { NavLink } from '../../header/types';
import { v4 as uuidv4 } from 'uuid';

// Get default navigation links
export const getDefaultNavLinks = (): NavLink[] => [
  { id: uuidv4(), name: '', href: '/', order: 1, isVisible: true, parentId: null, icon: 'Home' },
  { id: uuidv4(), name: 'Services', href: '/#services', order: 2, isVisible: true, parentId: null },
  { id: uuidv4(), name: 'Portfolio', href: '/portfolio', order: 3, isVisible: true, parentId: null },
  { id: uuidv4(), name: 'Contact', href: '/#contact', order: 5, isVisible: true, parentId: null },
];

// Check if a link has children
export const hasChildren = (navLinks: NavLink[], linkId: string): boolean => {
  return navLinks.some(link => link.parentId === linkId);
};

// Filter links by parent to find same-level links
export const getSameLevelLinks = (navLinks: NavLink[], parentId: string | null): NavLink[] => {
  return navLinks.filter(link => link.parentId === parentId);
};
