
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pen, Trash2 } from 'lucide-react';
import { NavLink } from './types';

const NavLinkManager = () => {
  const { toast } = useToast();
  
  // Initial data (simulated here - should be from a real data source in production)
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

  // For editing nav links
  const [editingNavLink, setEditingNavLink] = useState<NavLink | null>(null);
  const [newNavLinkName, setNewNavLinkName] = useState('');
  const [newNavLinkHref, setNewNavLinkHref] = useState('');

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

  return (
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
  );
};

export default NavLinkManager;
