
// Types for header styling
export interface HeaderStyleConfig {
  transparent: boolean;
  sticky: boolean;
  glassmorphism: boolean;
  border_bottom: boolean;
  drop_shadow: boolean;
  background_color: string;
  text_color: string;
  border_color: string;
  scrolled_bg_color: string;
  scrolled_text_color: string;
  scrolled_border_color: string;
  scrolled_shadow: string;
  padding: string;
  showThemeSelector?: boolean;
}

// Mock header data
export const getHeaderConfig = async () => {
  const headerConfig = {
    logo: {
      src: '/logo.svg',
      alt: 'Logo',
      width: 40,
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
      showThemeSelector: true
    },
    navLinks: [
      { id: 'home', name: 'Accueil', href: '/', is_visible: true },
      { id: 'services', name: 'Services', href: '/services', is_visible: true },
      { id: 'about', name: 'À propos', href: '/about', is_visible: true },
      { id: 'blog', name: 'Blog', href: '/blog', is_visible: true },
      { id: 'contact', name: 'Contact', href: '/contact', is_visible: true }
    ],
    socialLinks: [
      { icon_name: 'Facebook', href: '#', aria_label: 'Facebook' },
      { icon_name: 'Twitter', href: '#', aria_label: 'Twitter' },
      { icon_name: 'Instagram', href: '#', aria_label: 'Instagram' }
    ],
    userMenu: {
      show_login_button: true,
      show_register_button: true,
      login_button_label: 'Connexion',
      register_button_label: 'Inscription'
    },
    searchBar: {
      is_enabled: true,
      placeholder: 'Rechercher...',
      expand_on_focus: true,
      position: 'right'
    }
  };

  return headerConfig;
};
