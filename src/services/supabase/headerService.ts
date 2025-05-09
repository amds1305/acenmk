
import { supabase } from '@/integrations/supabase/client';
import { SocialLink } from '@/components/header/types';
import { Twitter, Github, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

// Map string icon names to actual Lucide components
const iconComponentMap = {
  Twitter,
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
};

// Get header configuration
export const getHeaderConfig = async () => {
  try {
    // Get header general settings
    const { data: headerConfig, error: headerError } = await supabase
      .from('header_config')
      .select('*')
      .single();
    
    if (headerError && headerError.code !== 'PGRST116') {
      console.error('Error fetching header config:', headerError);
    }
    
    // Get social links
    const { data: socialLinks, error: socialError } = await supabase
      .from('header_social_links')
      .select('*')
      .order('order', { ascending: true });
      
    if (socialError) {
      console.error('Error fetching social links:', socialError);
    }
    
    // Map database social links to app format with proper icon components
    const mappedSocialLinks = socialLinks?.map(link => ({
      icon: iconComponentMap[link.icon_name] || Twitter,
      href: link.href,
      ariaLabel: link.aria_label,
      isVisible: link.is_visible,
      order: link.order
    })) || [];
    
    return {
      config: headerConfig || { showThemeSelector: true },
      socialLinks: mappedSocialLinks
    };
  } catch (error) {
    console.error('Error in getHeaderConfig:', error);
    return {
      config: { showThemeSelector: true },
      socialLinks: []
    };
  }
};

// Save header configuration
export const saveHeaderConfig = async (config: any) => {
  try {
    const { error } = await supabase
      .from('header_config')
      .upsert([
        { 
          id: 'default',
          show_theme_selector: config.showThemeSelector,
        }
      ]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving header config:', error);
    return false;
  }
};

// Save social links
export const saveSocialLinks = async (links: SocialLink[]) => {
  try {
    // First delete all existing links
    const { error: deleteError } = await supabase
      .from('header_social_links')
      .delete()
      .neq('id', 0);
      
    if (deleteError) throw deleteError;
    
    // Map app social links to database format
    const dbLinks = links.map(link => {
      // Find the icon name by comparing the component reference
      const iconName = Object.entries(iconComponentMap).find(
        ([_, component]) => component === link.icon
      )?.[0] || 'Twitter';
      
      return {
        icon_name: iconName,
        href: link.href,
        aria_label: link.ariaLabel,
        is_visible: link.isVisible,
        order: link.order
      };
    });
    
    // Insert new links
    const { error: insertError } = await supabase
      .from('header_social_links')
      .insert(dbLinks);
      
    if (insertError) throw insertError;
    
    return true;
  } catch (error) {
    console.error('Error saving social links:', error);
    return false;
  }
};
