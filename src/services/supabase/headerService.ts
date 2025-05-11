
import { supabase } from '@/lib/supabase';

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
      } : undefined
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
