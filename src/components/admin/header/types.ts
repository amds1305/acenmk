
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  id: string;
  name: string;
  href: string;
  icon?: string | LucideIcon;
  isVisible: boolean;
  requiresAuth: boolean;
  isExternal: boolean;
  children?: NavLink[];
  order: number;
}

export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: 'left' | 'center' | 'right';
}

export interface SocialLink {
  id: string;
  icon: string | LucideIcon;
  href: string;
  ariaLabel: string;
  isVisible: boolean;
}

export interface SearchBarSettings {
  isEnabled: boolean;
  placeholder: string;
  position: 'left' | 'center' | 'right';
  expandOnFocus: boolean;
}

export interface UserMenuSettings {
  showLoginButton: boolean;
  showRegisterButton: boolean;
  showProfileIcon: boolean;
  loginButtonLabel: string;
  registerButtonLabel: string;
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
  
  // Styles for menu elements
  menuHoverBgColor: string;
  menuActiveBgColor: string;
  menuTransition: string;
  menuBorderRadius: string;
  
  // Styles for social icons
  socialIconColor: string;
  socialIconHoverColor: string;
  socialIconBgColor: string;
  socialIconBorderColor: string;
  socialIconSize: string;
  socialIconSpacing: string;
  
  // Styles for utility icons
  utilityIconColor: string;
  utilityIconHoverColor: string;
  utilityIconBgColor: string;
  utilityIconBorderColor: string;
  utilityIconSize: string;
  
  // Header states
  scrolledBgColor: string;
  scrolledTextColor: string;
  scrolledBorderColor: string;
  scrolledShadow: string;
  
  // Animation states
  transitionDuration: string;
  transitionTiming: string;
  
  // Typography
  fontWeight: string;
  letterSpacing: string;
  textTransform: string;
}
