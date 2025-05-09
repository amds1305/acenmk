
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Pen, Trash2, Twitter, Github, Instagram, Facebook, Linkedin, Youtube, LucideIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { SocialLink } from './types';

const SocialLinkManager = () => {
  const { toast } = useToast();

  // Social links - use actual Lucide icon components with visibility property
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter', isVisible: true, order: 0 },
    { icon: Github, href: 'https://github.com', ariaLabel: 'Github', isVisible: true, order: 1 },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram', isVisible: true, order: 2 },
  ]);

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
  const handleSaveSocialLink = () => {
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

    if (editingSocialLink) {
      // Update existing link
      setSocialLinks(socialLinks.map(link => 
        link === editingSocialLink 
          ? { 
              icon: iconComponent, 
              href: newSocialHref, 
              ariaLabel: newSocialAriaLabel,
              isVisible: newSocialVisible,
              order: link.order
            } 
          : link
      ));
      toast({
        title: "Succès",
        description: "Lien social mis à jour"
      });
    } else {
      // Add new link
      const newOrder = socialLinks.length > 0 
        ? Math.max(...socialLinks.map(link => link.order)) + 1
        : 0;
      
      setSocialLinks([...socialLinks, { 
        icon: iconComponent, 
        href: newSocialHref, 
        ariaLabel: newSocialAriaLabel,
        isVisible: newSocialVisible,
        order: newOrder
      }]);
      toast({
        title: "Succès",
        description: "Lien social ajouté"
      });
    }

    // Reset form
    setEditingSocialLink(null);
    setNewSocialIcon('Twitter');
    setNewSocialHref('');
    setNewSocialAriaLabel('');
    setNewSocialVisible(true);
  };

  // Delete social link
  const handleDeleteSocialLink = (link: SocialLink) => {
    setSocialLinks(socialLinks.filter(l => l !== link));
    toast({
      title: "Succès",
      description: "Lien social supprimé"
    });
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
  const handleToggleVisibility = (link: SocialLink) => {
    setSocialLinks(socialLinks.map(l => 
      l === link ? { ...l, isVisible: !l.isVisible } : l
    ));
    
    toast({
      title: "Visibilité modifiée",
      description: `Le lien ${link.ariaLabel} est maintenant ${link.isVisible ? 'masqué' : 'visible'}`
    });
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
