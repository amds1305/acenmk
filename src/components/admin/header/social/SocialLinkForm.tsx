
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { SocialLinkFormProps } from './types';

const SocialLinkForm = ({
  editingSocialLink,
  newSocialIcon,
  newSocialHref,
  newSocialAriaLabel,
  newSocialVisible,
  setNewSocialIcon,
  setNewSocialHref,
  setNewSocialAriaLabel,
  setNewSocialVisible,
  handleSaveSocialLink,
  handleCancelEdit,
  availableSocialIcons
}: SocialLinkFormProps) => {
  return (
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
            <Button variant="outline" onClick={handleCancelEdit}>
              Annuler
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinkForm;
