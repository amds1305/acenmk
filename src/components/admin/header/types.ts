import { LucideIcon } from 'lucide-react';

// Types pour le gestionnaire de logo
export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: 'left' | 'center' | 'right';
}

// Types pour les liens de navigation
export interface NavLink {
  name: string;
  href: string;
  icon?: LucideIcon;
  isExternal?: boolean;
  requiresAuth?: boolean;
  requiredRole?: string;
  order: number;
  isVisible: boolean;
  parentId?: string | null;
  id: string;
}

// Types pour les liens sociaux
export interface SocialLink {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
  isVisible: boolean;
  order: number;
}

// Types pour la barre de recherche
export interface SearchBarSettings {
  isEnabled: boolean;
  placeholder: string;
  position: 'left' | 'center' | 'right';
  expandOnFocus: boolean;
}

// Types pour les boutons d'action
export interface ActionButton {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isVisible: boolean;
  requiresAuth?: boolean;
  requiredRole?: string;
  order: number;
}

// Types pour l'espace membre
export interface UserMenuSettings {
  showLoginButton: boolean;
  showRegisterButton: boolean;
  showProfileIcon: boolean;
  loginButtonLabel: string;
  registerButtonLabel: string;
}

// Types pour le style visuel du header
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
  
  // Nouvelles propriétés pour une personnalisation plus fine
  menuHoverBgColor: string;  // Couleur de fond au survol des éléments du menu
  menuActiveBgColor: string; // Couleur de fond des éléments actifs du menu
  
  // Personnalisation des icônes
  socialIconColor: string;       // Couleur des icônes de réseaux sociaux
  socialIconHoverColor: string;  // Couleur des icônes de réseaux sociaux au survol
  socialIconBgColor: string;     // Couleur de fond des icônes de réseaux sociaux
  socialIconBorderColor: string; // Couleur de bordure des icônes de réseaux sociaux
  
  // Personnalisation de l'icône de recherche et thème
  utilityIconColor: string;       // Couleur des icônes utilitaires (recherche, thème)
  utilityIconHoverColor: string;  // Couleur des icônes utilitaires au survol
  utilityIconBgColor: string;     // Couleur de fond des icônes utilitaires
  utilityIconBorderColor: string; // Couleur de bordure des icônes utilitaires
}
