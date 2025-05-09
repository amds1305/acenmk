
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Pen, Trash2, Twitter, Github, Instagram, Facebook, Linkedin, Youtube, LucideIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { SocialLink } from './types';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { supabase } from '@/lib/supabase';

const SocialLinkManager = () => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();

  // Social links - use actual Lucide icon components with visibility property
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter', isVisible: true, order: 0 },
    { icon: Github, href: 'https://github.com', ariaLabel: 'Github', isVisible: true, order: 1 },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram', isVisible: true, order: 2 },
  ]);

  // Load social links from localStorage or database when component mounts
  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        // First attempt to load from localStorage (for backward compatibility)
        const savedLinks = localStorage.getItem('socialLinks');
        if (savedLinks) {
          const parsedLinks = JSON.parse(savedLinks);
          
          // Convert string icon names to actual Lucide components
          const iconMap = { Twitter, Github, Instagram, Facebook, Linkedin, Youtube };
          
          // Create updated links with resolved icon components
          const updatedLinks = parsedLinks.map(link => ({
            ...link,
            icon: iconMap[link.icon] || Twitter // Default to Twitter if icon not found
          }));
          
          setSocialLinks(updatedLinks);
        }
        
        // Then check if we have data in Supabase
        const { data, error } = await supabase
          .from('header_social_links')
          .select('*')
          .order('order', { ascending: true });
          
        if (error) {
          console.error('Error fetching social links from Supabase:', error);
        } else if (data && data.length > 0) {
          // If we have data in Supabase, use it instead of localStorage data
          const iconMap = { Twitter, Github, Instagram, Facebook, Linkedin, Youtube };
          
          const dbLinks = data.map(link => ({
            icon: iconMap[link.icon_name] || Twitter,
            href: link.href,
            ariaLabel: link.aria_label,
            isVisible: link.is_visible,
            order: link.order
          }));
          
          setSocialLinks(dbLinks);
        }
      } catch (error) {
        console.error('Error loading social links:', error);
      }
    };
    
    loadSocialLinks();
  }, []);

  // Save social links to localStorage and optionally to database
  const saveSocialLinks = async (links: SocialLink[]) => {
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
      
      // Then try to save to Supabase if available
      try {
        // First delete all existing links
        await supabase.from('header_social_links').delete().neq('id', 0);
        
        // Then insert the new links
        const dbLinks = links.map(link => {
          // Find the icon name by comparing the component reference
          const iconName = Object.entries({ Twitter, Github, Instagram, Facebook, Linkedin, Youtube }).find(
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
        
        const { error } = await supabase.from('header_social_links').insert(dbLinks);
        
        if (error) {
          console.error('Error saving social links to Supabase:', error);
          // Still continue as we have saved to localStorage
        }
        
      } catch (dbError) {
        console.error('Database error when saving social links:', dbError);
        // Still continue as we have saved to localStorage
      }
      
      // Trigger a page reload to apply the changes to the header
      // For better UX, we should implement a context to avoid page reload
      // but this is a simpler solution for now
      window.dispatchEvent(new CustomEvent('header-config-updated'));
      
      return true;
    } catch (error) {
      console.error('Error saving social links:', error);
      return false;
    }
  };

  // Define available social icons
  const availableSocialIcons: Record<string, LucideIcon> = {
    Twitter,
    Github,
    Instagram,
    Facebook,
    Linkedin,
    Youtube
  };

  // For editing social links
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [newSocialIcon, setNewSocialIcon] = useState('Twitter');
  const [newSocialHref, setNewSocialHref] = useState('');
  const [newSocialAriaLabel, setNewSocialAriaLabel] = useState('');
  const [newSocialVisible, setNewSocialVisible] = useState(true);

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
      
      const saveSuccess = await saveSocialLinks(updatedLinks);
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
      
      const saveSuccess = await saveSocialLinks(updatedLinks);
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
    setEditingSocialLink(null);
    setNewSocialIcon('Twitter');
    setNewSocialHref('');
    setNewSocialAriaLabel('');
    setNewSocialVisible(true);
  };

  // Delete social link
  const handleDeleteSocialLink = async (link: SocialLink) => {
    const updatedLinks = socialLinks.filter(l => l !== link);
    setSocialLinks(updatedLinks);
    
    const saveSuccess = await saveSocialLinks(updatedLinks);
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
    
    const saveSuccess = await saveSocialLinks(updatedLinks);
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

  // Function to render the correct icon component
  const renderSocialIcon = (icon: LucideIcon) => {
    const IconComponent = icon;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="grid gap-4">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="flex items-center gap-2">
                <div className={`${!link.isVisible ? "opacity-50" : ""}`}>
                  {renderSocialIcon(link.icon)}
                </div>
                <div>
                  <p className={`font-medium ${!link.isVisible ? "text-gray-400 dark:text-gray-500" : ""}`}>
                    {link.ariaLabel}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="flex items-center space-x-2 mr-2">
                  <Switch 
                    checked={link.isVisible} 
                    onCheckedChange={() => handleToggleVisibility(link)}
                    aria-label={`Afficher/masquer ${link.ariaLabel}`}
                  />
                  <span className="text-sm text-gray-500">
                    {link.isVisible ? 'Visible' : 'Masqué'}
                  </span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => handleEditSocialLink(link)}>
                  <Pen className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteSocialLink(link)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">
            {editingSocialLink ? 'Modifier le lien social' : 'Ajouter un nouveau lien social'}
          </h4>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <label htmlFor="socialIcon">Icône</label>
              <select
                id="socialIcon"
                value={newSocialIcon}
                onChange={(e) => setNewSocialIcon(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {Object.keys(availableSocialIcons).map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <Input
              placeholder="URL"
              value={newSocialHref}
              onChange={(e) => setNewSocialHref(e.target.value)}
            />
            <Input
              placeholder="Texte alternatif (pour accessibilité)"
              value={newSocialAriaLabel}
              onChange={(e) => setNewSocialAriaLabel(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <Switch 
                checked={newSocialVisible} 
                onCheckedChange={setNewSocialVisible}
                id="visible-switch"
              />
              <label htmlFor="visible-switch" className="text-sm">
                {newSocialVisible ? 'Visible' : 'Masqué'}
              </label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveSocialLink}>
                {editingSocialLink ? 'Mettre à jour' : 'Ajouter'}
              </Button>
              {editingSocialLink && (
                <Button variant="outline" onClick={() => {
                  setEditingSocialLink(null);
                  setNewSocialIcon('Twitter');
                  setNewSocialHref('');
                  setNewSocialAriaLabel('');
                  setNewSocialVisible(true);
                }}>
                  Annuler
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default SocialLinkManager;
