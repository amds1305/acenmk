
// Static implementation of header service

export interface HeaderConfig {
  navLinks?: any[];
  socialLinks?: any[];
  showThemeSelector?: boolean;
  logo?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  style?: HeaderStyleConfig;
}

export interface HeaderStyleConfig {
  transparent?: boolean;
  sticky?: boolean;
  glassmorphism?: boolean;
  border_bottom?: boolean;
  drop_shadow?: boolean;
  background_color?: string;
  text_color?: string;
  border_color?: string;
  scrolled_bg_color?: string;
  scrolled_text_color?: string;
  scrolled_border_color?: string;
  scrolled_shadow?: string;
  padding?: string;
  utilityIconColor?: string;
  utilityIconBgColor?: string;
  utilityIconBorderColor?: string;
  utilityIconHoverColor?: string;
}

const defaultHeaderConfig: HeaderConfig = {
  navLinks: [
    { id: 'home', name: 'Accueil', href: '/', is_visible: true },
    { id: 'services', name: 'Services', href: '/#services', is_visible: true },
    { id: 'about', name: 'À propos', href: '/#about', is_visible: true },
    { id: 'contact', name: 'Contact', href: '/#contact', is_visible: true },
  ],
  socialLinks: [],
  showThemeSelector: true,
  logo: {
    src: '/logo.svg',
    alt: 'Logo',
    width: 120,
    height: 40
  },
  style: {
    transparent: true,
    sticky: true,
    glassmorphism: true,
    border_bottom: false,
    drop_shadow: true,
    background_color: 'rgba(255, 255, 255, 0)',
    text_color: '#ffffff',
    border_color: 'rgba(255, 255, 255, 0.1)',
    scrolled_bg_color: 'rgba(255, 255, 255, 0.9)',
    scrolled_text_color: '#111827',
    scrolled_border_color: 'rgba(229, 231, 235, 1)',
    scrolled_shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '1rem',
    utilityIconColor: '#111827',
    utilityIconBgColor: 'white',
    utilityIconBorderColor: '#e5e7eb',
    utilityIconHoverColor: '#4f46e5'
  }
};

export const getHeaderConfig = async (): Promise<HeaderConfig> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Retourner le header statique
  return defaultHeaderConfig;
};

export const updateHeaderSettings = async (settings: any): Promise<any> => {
  console.log('Mock update header settings:', settings);
  return { success: true };
};
