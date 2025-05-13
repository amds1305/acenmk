import { supabase } from '@/lib/supabase';
import { Logo, NavLink, SocialLink, SearchBarSettings, ActionButton, UserMenuSettings, HeaderStyle } from '@/components/admin/header/types';
import { LucideIcon } from 'lucide-react';

// Type pour la réponse complète de configuration d'en-tête
export interface HeaderConfig {
  logo?: Logo;
  navLinks?: NavLink[];
  socialLinks?: SocialLink[];
  searchBar?: SearchBarSettings;
  actionButtons?: ActionButton[];
  userMenu?: UserMenuSettings;
  headerStyle?: HeaderStyle;
}

// Récupérer toute la configuration d'en-tête
export async function getHeaderConfig(): Promise<HeaderConfig> {
  try {
    // Récupérer le logo
    const { data: logoData, error: logoError } = await supabase
      .from('header_logo')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (logoError && logoError.code !== 'PGRST116') {
      console.error('Erreur lors de la récupération du logo:', logoError);
    }

    // Récupérer les liens de navigation
    const { data: navLinksData, error: navLinksError } = await supabase
      .from('header_nav_links')
      .select('*')
      .order('order_index', { ascending: true });

    if (navLinksError) {
      console.error('Erreur lors de la récupération des liens de navigation:', navLinksError);
    }

    // Récupérer les liens sociaux
    const { data: socialLinksData, error: socialLinksError } = await supabase
      .from('header_social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (socialLinksError) {
      console.error('Erreur lors de la récupération des liens sociaux:', socialLinksError);
    }

    // Récupérer la configuration de la barre de recherche
    const { data: searchBarData, error: searchBarError } = await supabase
      .from('header_search_bar')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (searchBarError && searchBarError.code !== 'PGRST116') {
      console.error('Erreur lors de la récupération de la barre de recherche:', searchBarError);
    }

    // Récupérer les boutons d'action
    const { data: actionButtonsData, error: actionButtonsError } = await supabase
      .from('header_action_buttons')
      .select('*')
      .order('order_index', { ascending: true });

    if (actionButtonsError) {
      console.error('Erreur lors de la récupération des boutons d\'action:', actionButtonsError);
    }

    // Récupérer la configuration du menu utilisateur
    const { data: userMenuData, error: userMenuError } = await supabase
      .from('header_user_menu')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (userMenuError && userMenuError.code !== 'PGRST116') {
      console.error('Erreur lors de la récupération du menu utilisateur:', userMenuError);
    }

    // Récupérer le style de l'en-tête
    const { data: headerStyleData, error: headerStyleError } = await supabase
      .from('header_style')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (headerStyleError && headerStyleError.code !== 'PGRST116') {
      console.error('Erreur lors de la récupération du style d\'en-tête:', headerStyleError);
    }

    // Créer les objets à partir des données récupérées
    const logo = logoData ? {
      src: logoData.src,
      alt: logoData.alt,
      width: logoData.width,
      height: logoData.height,
      position: logoData.position
    } as Logo : undefined;

    // Transformer les données de navigation en objets NavLink
    const navLinks = navLinksData ? navLinksData.map(link => ({
      id: link.id,
      name: link.name,
      href: link.href,
      icon: link.icon,
      isExternal: link.is_external,
      requiresAuth: link.requires_auth,
      requiredRole: link.required_role,
      order: link.order_index,
      isVisible: link.is_visible,
      parentId: link.parent_id
    })) : [];

    // Transformer les données des liens sociaux en objets SocialLink avec les icônes Lucide
    const socialLinks = socialLinksData ? socialLinksData.map(link => {
      // Nous stockons juste le nom de l'icône dans la base de données, il faut la convertir en composant
      return {
        icon: link.icon_name, // Nous gérerons la conversion dans les composants qui utilisent ces données
        href: link.href,
        ariaLabel: link.aria_label,
        isVisible: link.is_visible,
        order: link.display_order
      };
    }) : [];

    // Créer l'objet de configuration de la barre de recherche
    const searchBar = searchBarData ? {
      isEnabled: searchBarData.is_enabled,
      placeholder: searchBarData.placeholder,
      position: searchBarData.position,
      expandOnFocus: searchBarData.expand_on_focus
    } as SearchBarSettings : undefined;

    // Transformer les données des boutons d'action en objets ActionButton
    const actionButtons = actionButtonsData ? actionButtonsData.map(button => ({
      id: button.id,
      label: button.label,
      href: button.href,
      icon: button.icon,
      variant: button.variant,
      isVisible: button.is_visible,
      requiresAuth: button.requires_auth,
      requiredRole: button.required_role,
      order: button.order_index
    })) : [];

    // Créer l'objet de configuration du menu utilisateur
    const userMenu = userMenuData ? {
      showLoginButton: userMenuData.show_login_button,
      showRegisterButton: userMenuData.show_register_button,
      showProfileIcon: userMenuData.show_profile_icon,
      loginButtonLabel: userMenuData.login_button_label,
      registerButtonLabel: userMenuData.register_button_label
    } as UserMenuSettings : undefined;

    // Créer l'objet de style de l'en-tête
    const headerStyle = headerStyleData ? {
      backgroundColor: headerStyleData.background_color,
      textColor: headerStyleData.text_color,
      hoverColor: headerStyleData.hover_color,
      activeColor: headerStyleData.active_color,
      fontFamily: headerStyleData.font_family,
      fontSize: headerStyleData.font_size,
      padding: headerStyleData.padding,
      sticky: headerStyleData.sticky,
      transparent: headerStyleData.transparent,
      glassmorphism: headerStyleData.glassmorphism,
      borderBottom: headerStyleData.border_bottom,
      borderColor: headerStyleData.border_color,
      dropShadow: headerStyleData.drop_shadow,
      showThemeSelector: true,
      
      // Propriétés de style basiques
      menuHoverBgColor: headerStyleData.menu_hover_bg_color,
      menuActiveBgColor: headerStyleData.menu_active_bg_color,
      socialIconColor: headerStyleData.social_icon_color,
      socialIconHoverColor: headerStyleData.social_icon_hover_color,
      socialIconBgColor: headerStyleData.social_icon_bg_color,
      socialIconBorderColor: headerStyleData.social_icon_border_color,
      utilityIconColor: headerStyleData.utility_icon_color,
      utilityIconHoverColor: headerStyleData.utility_icon_hover_color,
      utilityIconBgColor: headerStyleData.utility_icon_bg_color,
      utilityIconBorderColor: headerStyleData.utility_icon_border_color,
      
      // Nouvelles propriétés typographiques avancées
      fontWeight: headerStyleData.font_weight || '500',
      letterSpacing: headerStyleData.letter_spacing || 'normal',
      textTransform: headerStyleData.text_transform || 'none',
      
      // Nouvelles propriétés d'animation
      transitionDuration: headerStyleData.transition_duration || '0.3s',
      transitionTiming: headerStyleData.transition_timing || 'ease',
      
      // Nouvelles propriétés de style avancées
      menuTransition: headerStyleData.menu_transition || 'all 0.3s ease',
      menuBorderRadius: headerStyleData.menu_border_radius || '0.375rem',
      socialIconSize: headerStyleData.social_icon_size || '18px',
      socialIconSpacing: headerStyleData.social_icon_spacing || '0.75rem',
      utilityIconSize: headerStyleData.utility_icon_size || '18px',
      
      // Nouvelles propriétés d'état lors du défilement
      scrolledBgColor: headerStyleData.scrolled_bg_color || 'rgba(255, 255, 255, 0.8)',
      scrolledTextColor: headerStyleData.scrolled_text_color || '#333333',
      scrolledBorderColor: headerStyleData.scrolled_border_color || '#e5e7eb',
      scrolledShadow: headerStyleData.scrolled_shadow || '0 2px 4px rgba(0, 0, 0, 0.05)'
    } as HeaderStyle : undefined;

    // Récupérer l'option showThemeSelector de la table header_config
    // Corriger la requête problématique qui causait l'erreur 406
    let showThemeSelector = true; // Valeur par défaut
    try {
      const { data: configData, error } = await supabase
        .from('header_config')
        .select('show_theme_selector')
        .eq('id', 'default')
        .maybeSingle();

      if (error) {
        console.error('Erreur lors de la récupération de la configuration d\'en-tête:', error);
      } else if (configData) {
        showThemeSelector = configData.show_theme_selector !== false;
      }
    } catch (configError) {
      console.error('Erreur inattendue lors de la récupération de la configuration d\'en-tête:', configError);
    }

    // Mettre à jour headerStyle avec la bonne valeur de showThemeSelector
    if (headerStyle) {
      headerStyle.showThemeSelector = showThemeSelector;
    }

    return {
      logo,
      navLinks,
      socialLinks,
      searchBar,
      actionButtons,
      userMenu,
      headerStyle
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration d\'en-tête:', error);
    return {};
  }
}

// Sauvegarder le logo
export async function saveLogo(logo: Logo): Promise<boolean> {
  try {
    // Vérifier s'il y a déjà un logo dans la base de données
    const { data: existingLogo } = await supabase
      .from('header_logo')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingLogo) {
      // Mettre à jour le logo existant
      const { error } = await supabase
        .from('header_logo')
        .update({
          src: logo.src,
          alt: logo.alt,
          width: logo.width,
          height: logo.height,
          position: logo.position
        })
        .eq('id', existingLogo.id);

      if (error) {
        console.error('Erreur lors de la mise à jour du logo:', error);
        return false;
      }
    } else {
      // Insérer un nouveau logo
      const { error } = await supabase
        .from('header_logo')
        .insert({
          src: logo.src,
          alt: logo.alt,
          width: logo.width,
          height: logo.height,
          position: logo.position
        });

      if (error) {
        console.error('Erreur lors de l\'insertion du logo:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du logo:', error);
    return false;
  }
}

// Sauvegarder les liens de navigation
export async function saveNavLinks(navLinks: NavLink[]): Promise<boolean> {
  try {
    // Supprimer tous les liens existants
    const { error: deleteError } = await supabase
      .from('header_nav_links')
      .delete()
      .gt('id', '0'); // condition pour supprimer tous les enregistrements

    if (deleteError) {
      console.error('Erreur lors de la suppression des liens de navigation:', deleteError);
      return false;
    }

    // Si nous avons des liens à insérer
    if (navLinks.length > 0) {
      // Préparer les données pour l'insertion
      const insertData = navLinks.map(link => ({
        id: link.id,
        name: link.name,
        href: link.href,
        icon: link.icon ? typeof link.icon === 'string' ? link.icon : undefined : undefined,
        is_external: link.isExternal || false,
        requires_auth: link.requiresAuth || false,
        required_role: link.requiredRole,
        order_index: link.order,
        is_visible: link.isVisible,
        parent_id: link.parentId
      }));

      // Insérer les nouveaux liens
      const { error: insertError } = await supabase
        .from('header_nav_links')
        .insert(insertData);

      if (insertError) {
        console.error('Erreur lors de l\'insertion des liens de navigation:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des liens de navigation:', error);
    return false;
  }
}

// Sauvegarder les liens sociaux
export async function saveSocialLinks(socialLinks: SocialLink[]): Promise<boolean> {
  try {
    // Supprimer tous les liens sociaux existants
    const { error: deleteError } = await supabase
      .from('header_social_links')
      .delete()
      .gt('id', '0');

    if (deleteError) {
      console.error('Erreur lors de la suppression des liens sociaux:', deleteError);
      return false;
    }

    // Si nous avons des liens à insérer
    if (socialLinks.length > 0) {
      // Préparer les données pour l'insertion
      const insertData = socialLinks.map(link => {
        // Obtenir le nom de l'icône à partir du composant
        let iconName = '';
        if (typeof link.icon === 'string') {
          iconName = link.icon;
        } else if (link.icon) {
          // Trouver le nom du composant dans le nom de la fonction
          iconName = link.icon.name || 'Twitter';
        }

        return {
          icon_name: iconName,
          href: link.href,
          aria_label: link.ariaLabel,
          is_visible: link.isVisible,
          display_order: link.order
        };
      });

      // Insérer les nouveaux liens
      const { error: insertError } = await supabase
        .from('header_social_links')
        .insert(insertData);

      if (insertError) {
        console.error('Erreur lors de l\'insertion des liens sociaux:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des liens sociaux:', error);
    return false;
  }
}

// Sauvegarder la configuration de la barre de recherche
export async function saveSearchBar(searchBar: SearchBarSettings): Promise<boolean> {
  try {
    // Vérifier s'il y a déjà une configuration dans la base de données
    const { data: existingConfig } = await supabase
      .from('header_search_bar')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConfig) {
      // Mettre à jour la configuration existante
      const { error } = await supabase
        .from('header_search_bar')
        .update({
          is_enabled: searchBar.isEnabled,
          placeholder: searchBar.placeholder,
          position: searchBar.position,
          expand_on_focus: searchBar.expandOnFocus
        })
        .eq('id', existingConfig.id);

      if (error) {
        console.error('Erreur lors de la mise à jour de la barre de recherche:', error);
        return false;
      }
    } else {
      // Insérer une nouvelle configuration
      const { error } = await supabase
        .from('header_search_bar')
        .insert({
          is_enabled: searchBar.isEnabled,
          placeholder: searchBar.placeholder,
          position: searchBar.position,
          expand_on_focus: searchBar.expandOnFocus
        });

      if (error) {
        console.error('Erreur lors de l\'insertion de la barre de recherche:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la barre de recherche:', error);
    return false;
  }
}

// Sauvegarder les boutons d'action
export async function saveActionButtons(buttons: ActionButton[]): Promise<boolean> {
  try {
    // Supprimer tous les boutons existants
    const { error: deleteError } = await supabase
      .from('header_action_buttons')
      .delete()
      .gt('id', '0');

    if (deleteError) {
      console.error('Erreur lors de la suppression des boutons d\'action:', deleteError);
      return false;
    }

    // Si nous avons des boutons à insérer
    if (buttons.length > 0) {
      // Préparer les données pour l'insertion
      const insertData = buttons.map(button => ({
        id: button.id,
        label: button.label,
        href: button.href,
        icon: button.icon ? typeof button.icon === 'string' ? button.icon : undefined : undefined,
        variant: button.variant,
        is_visible: button.isVisible,
        requires_auth: button.requiresAuth || false,
        required_role: button.requiredRole,
        order_index: button.order
      }));

      // Insérer les nouveaux boutons
      const { error: insertError } = await supabase
        .from('header_action_buttons')
        .insert(insertData);

      if (insertError) {
        console.error('Erreur lors de l\'insertion des boutons d\'action:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des boutons d\'action:', error);
    return false;
  }
}

// Sauvegarder la configuration du menu utilisateur
export async function saveUserMenu(userMenu: UserMenuSettings): Promise<boolean> {
  try {
    // Vérifier s'il y a déjà une configuration dans la base de données
    const { data: existingConfig } = await supabase
      .from('header_user_menu')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConfig) {
      // Mettre à jour la configuration existante
      const { error } = await supabase
        .from('header_user_menu')
        .update({
          show_login_button: userMenu.showLoginButton,
          show_register_button: userMenu.showRegisterButton,
          show_profile_icon: userMenu.showProfileIcon,
          login_button_label: userMenu.loginButtonLabel,
          register_button_label: userMenu.registerButtonLabel
        })
        .eq('id', existingConfig.id);

      if (error) {
        console.error('Erreur lors de la mise à jour du menu utilisateur:', error);
        return false;
      }
    } else {
      // Insérer une nouvelle configuration
      const { error } = await supabase
        .from('header_user_menu')
        .insert({
          show_login_button: userMenu.showLoginButton,
          show_register_button: userMenu.showRegisterButton,
          show_profile_icon: userMenu.showProfileIcon,
          login_button_label: userMenu.loginButtonLabel,
          register_button_label: userMenu.registerButtonLabel
        });

      if (error) {
        console.error('Erreur lors de l\'insertion du menu utilisateur:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du menu utilisateur:', error);
    return false;
  }
}

// Sauvegarder le style de l'en-tête
export async function saveHeaderStyle(style: HeaderStyle): Promise<boolean> {
  try {
    // Vérifier s'il y a déjà un style dans la base de données
    const { data: existingStyle } = await supabase
      .from('header_style')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingStyle) {
      // Mettre à jour le style existant
      const { error } = await supabase
        .from('header_style')
        .update({
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
          
          // Mettre à jour les nouvelles colonnes
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
        })
        .eq('id', existingStyle.id);

      if (error) {
        console.error('Erreur lors de la mise à jour du style de l\'en-tête:', error);
        return false;
      }
    } else {
      // Insérer un nouveau style
      const { error } = await supabase
        .from('header_style')
        .insert({
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
          
          // Insérer les nouvelles colonnes
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

      if (error) {
        console.error('Erreur lors de l\'insertion du style de l\'en-tête:', error);
        return false;
      }
    }

    // Mettre à jour l'option showThemeSelector dans la table header_config
    const { error: configError } = await supabase
      .from('header_config')
      .update({ show_theme_selector: style.showThemeSelector })
      .eq('id', 'default');

    if (configError) {
      console.error('Erreur lors de la mise à jour de l\'option showThemeSelector:', configError);
      // On ne considère pas cela comme une erreur fatale
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du style de l\'en-tête:', error);
    return false;
  }
}

// Fonction utilitaire pour convertir les noms d'icônes en composants Lucide
export function getIconComponentByName(iconName: string): LucideIcon | undefined {
  try {
    // Cette fonction sera implémentée dans le composant qui utilise ces données
    return undefined;
  } catch (error) {
    console.error('Erreur lors de la conversion du nom d\'icône en composant:', error);
    return undefined;
  }
}
