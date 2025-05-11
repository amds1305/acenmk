
import { supabase } from '@/lib/supabase';
import { HeaderStyle } from '@/components/admin/header/types';
import { NavLink } from '@/components/admin/header/navigation/types';
import { SocialLink } from '@/components/admin/header/social/types';
import { SearchBarSettings } from '@/components/admin/header/types';

export interface HeaderLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: 'left' | 'center';
}

export interface HeaderConfig {
  headerLogo?: HeaderLogo;
  userMenu?: UserMenuSettings;
  headerStyle?: HeaderStyle;
  navLinks?: NavLink[];
  searchBar?: SearchBarSettings;
  socialLinks?: SocialLink[];
}

export interface UserMenuSettings {
  showLoginButton: boolean;
  showRegisterButton: boolean;
  showProfileIcon: boolean;
  loginButtonLabel: string;
  registerButtonLabel: string;
}

export const getHeaderConfig = async (): Promise<HeaderConfig> => {
  try {
    // Try to get logo
    const { data: logoData, error: logoError } = await supabase
      .from('header_logo')
      .select('*')
      .single();
    
    if (logoError && logoError.code !== 'PGRST116') {
      console.error('Error fetching header logo:', logoError);
    }
    
    // Try to get user menu settings
    const { data: userMenuData, error: userMenuError } = await supabase
      .from('header_user_menu')
      .select('*')
      .single();
    
    if (userMenuError && userMenuError.code !== 'PGRST116') {
      console.error('Error fetching user menu settings:', userMenuError);
    }

    // Try to get header style settings
    const { data: headerStyleData, error: headerStyleError } = await supabase
      .from('header_style')
      .select('*')
      .single();
    
    if (headerStyleError && headerStyleError.code !== 'PGRST116') {
      console.error('Error fetching header style:', headerStyleError);
    }
    
    // Try to get navigation links
    const { data: navLinksData, error: navLinksError } = await supabase
      .from('header_nav_links')
      .select('*')
      .order('order_index');
    
    if (navLinksError) {
      console.error('Error fetching navigation links:', navLinksError);
    }
    
    // Try to get search bar settings
    const { data: searchBarData, error: searchBarError } = await supabase
      .from('header_search_bar')
      .select('*')
      .single();
    
    if (searchBarError && searchBarError.code !== 'PGRST116') {
      console.error('Error fetching search bar settings:', searchBarError);
    }
    
    // Try to get social links
    const { data: socialLinksData, error: socialLinksError } = await supabase
      .from('header_social_links')
      .select('*')
      .order('order');
    
    if (socialLinksError) {
      console.error('Error fetching social links:', socialLinksError);
    }
    
    return {
      headerLogo: logoData ? {
        src: logoData.src,
        alt: logoData.alt,
        width: logoData.width,
        height: logoData.height,
        position: logoData.position as 'left' | 'center',
      } : undefined,
      userMenu: userMenuData ? {
        showLoginButton: userMenuData.show_login_button,
        showRegisterButton: userMenuData.show_register_button,
        showProfileIcon: userMenuData.show_profile_icon,
        loginButtonLabel: userMenuData.login_button_label,
        registerButtonLabel: userMenuData.register_button_label
      } : undefined,
      headerStyle: headerStyleData || undefined,
      navLinks: navLinksData || [],
      searchBar: searchBarData ? {
        isEnabled: searchBarData.is_enabled,
        placeholder: searchBarData.placeholder,
        position: searchBarData.position,
        expandOnFocus: searchBarData.expand_on_focus
      } : undefined,
      socialLinks: socialLinksData || []
    };
  } catch (error) {
    console.error('Error in getHeaderConfig:', error);
    return {};
  }
};

export const saveHeaderLogo = async (logo: HeaderLogo): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('header_logo')
      .upsert({
        src: logo.src,
        alt: logo.alt,
        width: logo.width,
        height: logo.height,
        position: logo.position
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving header logo:', error);
    return false;
  }
};

export const saveUserMenu = async (settings: UserMenuSettings): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('header_user_menu')
      .upsert({
        show_login_button: settings.showLoginButton,
        show_register_button: settings.showRegisterButton,
        show_profile_icon: settings.showProfileIcon,
        login_button_label: settings.loginButtonLabel,
        register_button_label: settings.registerButtonLabel
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving user menu settings:', error);
    return false;
  }
};

export const saveHeaderStyle = async (style: HeaderStyle): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('header_style')
      .upsert({
        background_color: style.backgroundColor,
        text_color: style.textColor,
        hover_color: style.hoverColor,
        active_color: style.activeColor,
        font_family: style.fontFamily,
        font_size: style.fontSize,
        padding: style.padding,
        sticky: style.sticky,
        transparent: style.transparent,
        glassmorphism: style.glassmorphism,
        border_bottom: style.borderBottom,
        border_color: style.borderColor,
        drop_shadow: style.dropShadow,
        menu_hover_bg_color: style.menuHoverBgColor,
        menu_active_bg_color: style.menuActiveBgColor,
        social_icon_color: style.socialIconColor,
        social_icon_hover_color: style.socialIconHoverColor,
        social_icon_bg_color: style.socialIconBgColor,
        social_icon_border_color: style.socialIconBorderColor,
        utility_icon_color: style.utilityIconColor,
        utility_icon_hover_color: style.utilityIconHoverColor,
        utility_icon_bg_color: style.utilityIconBgColor,
        utility_icon_border_color: style.utilityIconBorderColor
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving header style:', error);
    return false;
  }
};

export const saveNavLinks = async (links: NavLink[]): Promise<boolean> => {
  try {
    // First delete all existing links
    const { error: deleteError } = await supabase
      .from('header_nav_links')
      .delete()
      .gt('id', '0'); // This will delete all records
    
    if (deleteError) throw deleteError;
    
    // Then insert the updated links
    if (links.length > 0) {
      const formattedLinks = links.map((link, index) => ({
        name: link.name,
        href: link.href,
        icon: link.icon || null,
        is_external: link.isExternal || false,
        requires_auth: link.requiresAuth || false,
        order_index: link.orderIndex || index,
        is_visible: link.isVisible ?? true,
        parent_id: link.parentId || null,
        required_role: link.requiredRole || null
      }));
      
      const { error: insertError } = await supabase
        .from('header_nav_links')
        .insert(formattedLinks);
      
      if (insertError) throw insertError;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving navigation links:', error);
    return false;
  }
};

// Add the missing functions for searchBar and socialLinks
export const saveSearchBar = async (settings: SearchBarSettings): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('header_search_bar')
      .upsert({
        is_enabled: settings.isEnabled,
        placeholder: settings.placeholder,
        position: settings.position,
        expand_on_focus: settings.expandOnFocus
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving search bar settings:', error);
    return false;
  }
};

export const saveSocialLinks = async (links: SocialLink[]): Promise<boolean> => {
  try {
    // First delete all existing links
    const { error: deleteError } = await supabase
      .from('header_social_links')
      .delete()
      .gt('id', '0');
    
    if (deleteError) throw deleteError;
    
    // Then insert the updated links
    if (links.length > 0) {
      // Convert icon components to string names for storage
      const formattedLinks = links.map((link, index) => {
        // Find the icon name by its component reference
        let iconName = "Twitter"; // Default
        if (typeof link.icon === 'function') {
          // This is a bit of a hack, but it works to get the name of the component
          const iconString = link.icon.toString();
          const matches = iconString.match(/function\s+([^(]+)/);
          if (matches && matches[1]) {
            iconName = matches[1];
          }
        } else if (typeof link.icon === 'string') {
          iconName = link.icon;
        }
        
        return {
          icon: iconName,
          href: link.href,
          aria_label: link.ariaLabel,
          is_visible: link.isVisible,
          order: link.order || index
        };
      });
      
      const { error: insertError } = await supabase
        .from('header_social_links')
        .insert(formattedLinks);
      
      if (insertError) throw insertError;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving social links:', error);
    return false;
  }
};
