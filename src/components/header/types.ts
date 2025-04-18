
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  id: string;
  name: string;
  href: string;
  order: number;
  isVisible: boolean;
  parentId: string | null;
  isExternal?: boolean;
  requiresAuth?: boolean;
}

export interface SocialLink {
  id?: string;
  name: string;
  href: string;
  icon: LucideIcon;
  ariaLabel: string;
}
