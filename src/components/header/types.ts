
import { LucideIcon } from 'lucide-react';

// Types pour les liens de navigation
export interface NavLink {
  name: string;
  href: string;
  icon?: LucideIcon;
  isExternal?: boolean;
  requiresAuth?: boolean;
  allowedRoles?: string[];
}

// Types pour les liens sociaux
export interface SocialLink {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
  isVisible?: boolean;
  order?: number;
}
