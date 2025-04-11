
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Pen, Plus, Trash2, Twitter, Github, Instagram, Facebook, Linkedin, Youtube, LucideIcon } from 'lucide-react';

// Update the type to use LucideIcon directly
interface SocialLink {
  icon: LucideIcon;
  href: string;
  ariaLabel: string;
}

interface NavLink {
  name: string;
  href: string;
}

const AdminHeader = () => {
  const { toast } = useToast();
  
  // Initial data from useHeader (simulated here - should be from a real data source in production)
  const [navLinks, setNavLinks] = useState<NavLink[]>([
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Estimation', href: '/estimation' },
    { name: 'Rendez-vous', href: '/appointments' },
    { name: 'Équipe', href: '/#team' },
    { name: 'Témoignages', href: '/#testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Contact', href: '/#contact' },
  ]);

  // Social links - use actual Lucide icon components
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { icon: Twitter, href: 'https://twitter.com', ariaLabel: 'Twitter' },
    { icon: Github, href: 'https://github.com', ariaLabel: 'Github' },
    { icon: Instagram, href: 'https://instagram.com', ariaLabel: 'Instagram' },
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

  // For editing nav links
  const [editingNavLink, setEditingNavLink] = useState<NavLink | null>(null);
  const [newNavLinkName, setNewNavLinkName] = useState('');
  const [newNavLinkHref, setNewNavLinkHref] = useState('');

  // For editing social links
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [newSocialIcon, setNewSocialIcon] = useState('Twitter');
  const [newSocialHref, setNewSocialHref] = useState('');
  const [newSocialAriaLabel, setNewSocialAriaLabel] = useState('');

  // Add or update navigation link
  const handleSaveNavLink = () => {
    if (!newNavLinkName || !newNavLinkHref) {
      toast({
        title: "Erreur",
        description: "Nom et lien sont requis",
        variant: "destructive"
      });
      return;
    }

    if (editingNavLink) {
      // Update existing link
      setNavLinks(navLinks.map(link => 
        link === editingNavLink 
          ? { name: newNavLinkName, href: newNavLinkHref } 
          : link
      ));
      toast({
        title: "Succès",
        description: "Lien de navigation mis à jour"
      });
    } else {
      // Add new link
      setNavLinks([...navLinks, { name: newNavLinkName, href: newNavLinkHref }]);
      toast({
        title: "Succès",
        description: "Lien de navigation ajouté"
      });
    }

    // Reset form
    setEditingNavLink(null);
    setNewNavLinkName('');
    setNewNavLinkHref('');
  };

  // Delete navigation link
  const handleDeleteNavLink = (link: NavLink) => {
    setNavLinks(navLinks.filter(l => l !== link));
    toast({
      title: "Succès",
      description: "Lien de navigation supprimé"
    });
  };

  // Edit navigation link (prepare form for editing)
  const handleEditNavLink = (link: NavLink) => {
    setEditingNavLink(link);
    setNewNavLinkName(link.name);
    setNewNavLinkHref(link.href);
  };

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
          ? { icon: iconComponent, href: newSocialHref, ariaLabel: newSocialAriaLabel } 
          : link
      ));
      toast({
        title: "Succès",
        description: "Lien social mis à jour"
      });
    } else {
      // Add new link
      setSocialLinks([...socialLinks, { 
        icon: iconComponent, 
        href: newSocialHref, 
        ariaLabel: newSocialAriaLabel 
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
  };

  // Function to render the correct icon component
  const renderSocialIcon = (icon: LucideIcon) => {
    const IconComponent = icon;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Administration de l'en-tête</h1>
      </div>

      <Tabs defaultValue="navigation">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navigation">Liens de navigation</TabsTrigger>
          <TabsTrigger value="social">Liens sociaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigation" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Liens de navigation</CardTitle>
              <CardDescription>
                Gérer les liens affichés dans le menu de navigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {navLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">{link.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditNavLink(link)}>
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteNavLink(link)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">
                    {editingNavLink ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
                  </h4>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Nom du lien"
                      value={newNavLinkName}
                      onChange={(e) => setNewNavLinkName(e.target.value)}
                    />
                    <Input
                      placeholder="URL (ex: /page ou /#section)"
                      value={newNavLinkHref}
                      onChange={(e) => setNewNavLinkHref(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveNavLink}>
                        {editingNavLink ? 'Mettre à jour' : 'Ajouter'}
                      </Button>
                      {editingNavLink && (
                        <Button variant="outline" onClick={() => {
                          setEditingNavLink(null);
                          setNewNavLinkName('');
                          setNewNavLinkHref('');
                        }}>
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Liens sociaux</CardTitle>
              <CardDescription>
                Gérer les liens vers les réseaux sociaux dans l'en-tête
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        {renderSocialIcon(link.icon)}
                        <div>
                          <p className="font-medium">{link.ariaLabel}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
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
                        }}>
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHeader;
