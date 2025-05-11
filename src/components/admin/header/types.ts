
import { LucideIcon } from 'lucide-react';

export interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  position?: 'left' | 'center';
}

export interface NavLink {
  id?: string;
  name: string;
  href: string;
  icon?: string | React.FC; 
  isExternal?: boolean;
  requiresAuth?: boolean;
  requiredRole?: string;
  order?: number;
  isVisible?: boolean;
  parentId?: string | null;
}

export interface SocialLink {
  icon: LucideIcon | string;
  href: string;
  ariaLabel: string;
  isVisible?: boolean;
  order?: number;
}

export interface SearchBarSettings {
  isEnabled: boolean;
  placeholder: string;
  position: 'right' | 'center' | 'left';
  expandOnFocus: boolean;
}

export interface ActionButton {
  id?: string;
  label: string;
  href: string;
  icon?: string | React.FC;
  variant?: string;
  isVisible?: boolean;
  requiresAuth?: boolean;
  requiredRole?: string;
  order?: number;
}

export interface UserMenuSettings {
  showLoginButton: boolean;
  showRegisterButton: boolean;
  showProfileIcon: boolean;
  loginButtonLabel?: string;
  registerButtonLabel?: string;
}

export interface HeaderStyle {
  backgroundColor: string;
  textColor: string;
  hoverColor: string;
  activeColor: string;
  fontFamily: string;
  fontSize: string;
  padding: string;
  sticky: boolean;
  transparent: boolean;
  glassmorphism: boolean;
  borderBottom: boolean;
  borderColor: string;
  dropShadow: boolean;
  showThemeSelector: boolean;
  
  // Styles pour les éléments de menu
  menuHoverBgColor: string;
  menuActiveBgColor: string;
  menuTransition?: string;
  menuBorderRadius?: string;
  
  // Styles pour les icônes sociales
  socialIconColor: string;
  socialIconHoverColor: string;
  socialIconBgColor: string;
  socialIconBorderColor: string;
  socialIconSize?: string;
  socialIconSpacing?: string;
  
  // Styles pour les icônes d'utilité
  utilityIconColor: string;
  utilityIconHoverColor: string;
  utilityIconBgColor: string;
  utilityIconBorderColor: string;
  utilityIconSize?: string;
  
  // Styles pour les états de header
  scrolledBgColor?: string;
  scrolledTextColor?: string;
  scrolledBorderColor?: string;
  scrolledShadow?: string;
  
  // États d'animation
  transitionDuration?: string;
  transitionTiming?: string;
  
  // Typographie avancée
  fontWeight?: string;
  letterSpacing?: string;
  textTransform?: string;
}
