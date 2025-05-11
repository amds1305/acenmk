
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NavLink } from '../../../header/types';
import { NavLinkFormProps } from '../types';

// Define icon type as string only
type IconName = string;

// Mock icons as strings (not React components)
const availableIcons: IconName[] = [
  'Home', 'Info', 'Mail', 'Phone', 'Settings', 'User', 'Users',
  'FileText', 'ShoppingCart', 'Calendar', 'Star', 'Heart',
  'Link', 'ExternalLink', 'Globe', 'Map', 'BookOpen'
];

export const NavLinkForm: React.FC<NavLinkFormProps> = ({ 
  navLink, 
  updateNavLink, 
  existingLinks,
  onSave,
  onCancel
}) => {
  // Parent link options (excluding current link and its children)
  const parentOptions = existingLinks.filter(link => 
    link.id !== navLink.id && 
    !hasAncestor(existingLinks, link.id, navLink.id)
  );

  // Check if a link is an ancestor of another
  function hasAncestor(links: NavLink[], linkId: string, ancestorId: string): boolean {
    const link = links.find(l => l.id === linkId);
    if (!link || !link.parentId) return false;
    if (link.parentId === ancestorId) return true;
    return hasAncestor(links, link.parentId, ancestorId);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="link-name">Nom</Label>
          <Input 
            id="link-name" 
            value={navLink.name} 
            onChange={e => updateNavLink('name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link-href">Lien URL</Label>
          <Input 
            id="link-href" 
            value={navLink.href} 
            onChange={e => updateNavLink('href', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="link-icon">Icône (optionnel)</Label>
          <Select 
            value={navLink.icon || ''} 
            onValueChange={(value: string) => updateNavLink('icon', value)}
          >
            <SelectTrigger id="link-icon">
              <SelectValue placeholder="Sélectionner une icône" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Aucune icône</SelectItem>
              {availableIcons.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="link-parent">Lien parent (optionnel)</Label>
          <Select 
            value={navLink.parentId || ''} 
            onValueChange={(value) => updateNavLink('parentId', value || null)}
          >
            <SelectTrigger id="link-parent">
              <SelectValue placeholder="Lien principal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Lien principal</SelectItem>
              {parentOptions.map((link) => (
                <SelectItem key={link.id} value={link.id}>
                  {link.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          id="link-auth" 
          checked={navLink.requires_auth}
          onCheckedChange={checked => updateNavLink('requires_auth', checked)}
        />
        <Label htmlFor="link-auth">Authentification requise</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="link-external" 
          checked={navLink.is_external}
          onCheckedChange={checked => updateNavLink('is_external', checked)}
        />
        <Label htmlFor="link-external">Lien externe</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={onSave}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default NavLinkForm;
