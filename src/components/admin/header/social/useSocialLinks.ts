
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveSocialLinks, getHeaderConfig } from '@/services/supabase/headerService';
import { SocialLink } from '../types';
import { Twitter, Github, Instagram, Facebook, Linkedin, Youtube, LucideIcon } from 'lucide-react';
import { UseSocialLinksReturn } from './types';

export const useSocialLinks = (): UseSocialLinksReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();

  // Social links state
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [newSocialIcon, setNewSocialIcon] = useState('Twitter');
  const [newSocialHref, setNewSocialHref] = useState('');
  const [newSocialAriaLabel, setNewSocialAriaLabel] = useState('');
  const [newSocialVisible, setNewSocialVisible] = useState(true);

  // Define available social icons
  const availableSocialIcons: Record<string, LucideIcon> = {
    Twitter,
    Github,
    Instagram,
    Facebook,
    Linkedin,
    Youtube
  };

  // Load social links from Supabase when component mounts
  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const { socialLinks } = await getHeaderConfig();
        if (socialLinks && socialLinks.length > 0) {
          setSocialLinks(socialLinks);
        }
      } catch (error) {
        console.error('Error loading social links:', error);
        
        // Fallback to localStorage (for backward compatibility)
        const savedLinks = localStorage.getItem('socialLinks');
        if (savedLinks) {
          try {
            const parsedLinks = JSON.parse(savedLinks);
            
            // Convert string icon names to actual Lucide components
            const iconMap = { Twitter, Github, Instagram, Facebook, Linkedin, Youtube };
            
            // Create updated links with resolved icon components
            const updatedLinks = parsedLinks.map(link => ({
              ...link,
              icon: iconMap[link.icon] || Twitter // Default to Twitter if icon not found
            }));
            
            setSocialLinks(updatedLinks);
          } catch (error) {
            console.error('Error parsing localStorage social links:', error);
          }
        }
      }
    };
    
    loadSocialLinks();
  }, []);

  // Save social links to Supabase and localStorage
  const handleSaveSocialLinks = async (links: SocialLink[]) => {
    try {
      // First save to localStorage for backward compatibility
      const serializedLinks = links.map(link => {
        // Find the icon name by comparing the component reference
        const iconName = Object.entries({ Twitter, Github, Instagram, Facebook, Linkedin, Youtube }).find(
          ([_, component]) => component === link.icon
        )?.[0] || 'Twitter';
        
        return {
          ...link,
          icon: iconName
        };
      });
      
      localStorage.setItem('socialLinks', JSON.stringify(serializedLinks));
      
      // Then save to Supabase
      const saveSuccess = await saveSocialLinks(links);
      
      if (!saveSuccess) {
        console.warn('Failed to save to Supabase, but saved to localStorage');
      }
      
      // Trigger a page reload to apply the changes to the header
      window.dispatchEvent(new CustomEvent('header-config-updated'));
      
      return true;
    } catch (error) {
      console.error('Error saving social links:', error);
      return false;
    }
  };

  // Add or update social link
  const handleSaveSocialLink = async () => {
    if (!newSocialIcon || !newSocialHref || !newSocialAriaLabel) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis",
        variant: "destructive"
      });
      return;
    }

    const iconComponent = availableSocialIcons[newSocialIcon];
    
    if (!iconComponent) {
      toast({
        title: "Erreur",
        description: "Icône sociale non valide",
        variant: "destructive"
      });
      return;
    }

    let updatedLinks: SocialLink[];
    
    if (editingSocialLink) {
      // Update existing link
      updatedLinks = socialLinks.map(link => 
        link === editingSocialLink 
          ? { 
              icon: iconComponent, 
              href: newSocialHref, 
              ariaLabel: newSocialAriaLabel,
              isVisible: newSocialVisible,
              order: link.order
            } 
          : link
      );
      setSocialLinks(updatedLinks);
      
      const saveSuccess = await handleSaveSocialLinks(updatedLinks);
      if (saveSuccess) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Lien social mis à jour"
        });
      } else {
        showSaveError();
      }
    } else {
      // Add new link
      const newOrder = socialLinks.length > 0 
        ? Math.max(...socialLinks.map(link => link.order)) + 1
        : 0;
      
      const newLink = { 
        icon: iconComponent, 
        href: newSocialHref, 
        ariaLabel: newSocialAriaLabel,
        isVisible: newSocialVisible,
        order: newOrder
      };
      
      updatedLinks = [...socialLinks, newLink];
      setSocialLinks(updatedLinks);
      
      const saveSuccess = await handleSaveSocialLinks(updatedLinks);
      if (saveSuccess) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Lien social ajouté"
        });
      } else {
        showSaveError();
      }
    }

    // Reset form
    resetForm();
  };

  // Delete social link
  const handleDeleteSocialLink = async (link: SocialLink) => {
    const updatedLinks = socialLinks.filter(l => l !== link);
    setSocialLinks(updatedLinks);
    
    const saveSuccess = await handleSaveSocialLinks(updatedLinks);
    if (saveSuccess) {
      showSaveSuccess();
      toast({
        title: "Succès",
        description: "Lien social supprimé"
      });
    } else {
      showSaveError();
    }
  };

  // Edit social link (prepare form for editing)
  const handleEditSocialLink = (link: SocialLink) => {
    setEditingSocialLink(link);
    // Find the icon name by comparing the component reference
    const iconName = Object.entries(availableSocialIcons).find(
      ([_, component]) => component === link.icon
    )?.[0] || 'Twitter';
    
    setNewSocialIcon(iconName);
    setNewSocialHref(link.href);
    setNewSocialAriaLabel(link.ariaLabel);
    setNewSocialVisible(link.isVisible);
  };

  // Toggle visibility for a social link
  const handleToggleVisibility = async (link: SocialLink) => {
    const updatedLinks = socialLinks.map(l => 
      l === link ? { ...l, isVisible: !l.isVisible } : l
    );
    
    setSocialLinks(updatedLinks);
    
    const saveSuccess = await handleSaveSocialLinks(updatedLinks);
    if (saveSuccess) {
      showSaveSuccess();
      toast({
        title: "Visibilité modifiée",
        description: `Le lien ${link.ariaLabel} est maintenant ${link.isVisible ? 'masqué' : 'visible'}`
      });
    } else {
      showSaveError();
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setEditingSocialLink(null);
    setNewSocialIcon('Twitter');
    setNewSocialHref('');
    setNewSocialAriaLabel('');
    setNewSocialVisible(true);
  };

  // Function to render the correct icon component
  const renderSocialIcon = (icon: LucideIcon) => {
    const IconComponent = icon;
    return <IconComponent className="h-5 w-5" />;
  };

  return {
    socialLinks,
    editingSocialLink,
    newSocialIcon,
    newSocialHref,
    newSocialAriaLabel,
    newSocialVisible,
    availableSocialIcons,
    setNewSocialIcon,
    setNewSocialHref,
    setNewSocialAriaLabel,
    setNewSocialVisible,
    handleSaveSocialLink,
    handleDeleteSocialLink,
    handleEditSocialLink,
    handleToggleVisibility,
    handleCancelEdit,
    renderSocialIcon
  };
};
