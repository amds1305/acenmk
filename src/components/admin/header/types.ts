
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
}
