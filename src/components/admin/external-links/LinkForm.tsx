
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Role } from './useExternalLinks';

interface LinkFormProps {
  currentLink: ExternalLink;
  roles: Role[];
  onChange: (link: ExternalLink) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ currentLink, roles, onChange }) => {
  // Handler for updating link properties
  const handleChange = <K extends keyof ExternalLink>(key: K, value: ExternalLink[K]) => {
    onChange({
      ...currentLink,
      [key]: value
    });
  };
  
  // Toggle a role in the allowed roles array
  const toggleRole = (roleId: string) => {
    const roleExists = currentLink.allowed_roles.includes(roleId);
    
    if (roleExists) {
      handleChange('allowed_roles', currentLink.allowed_roles.filter(id => id !== roleId));
    } else {
      handleChange('allowed_roles', [...currentLink.allowed_roles, roleId]);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="link-name">Nom</Label>
        <Input 
          id="link-name" 
          value={currentLink.name} 
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Nom du lien"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="link-url">URL</Label>
        <Input 
          id="link-url" 
          value={currentLink.url} 
          onChange={e => handleChange('url', e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="link-icon">Icône (optionnel)</Label>
        <Input 
          id="link-icon" 
          value={currentLink.icon || ''} 
          onChange={e => handleChange('icon', e.target.value)}
          placeholder="Nom de l'icône"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="requires-auth" 
          checked={currentLink.requires_auth}
          onCheckedChange={checked => handleChange('requires_auth', checked)}
        />
        <Label htmlFor="requires-auth">Requiert une authentification</Label>
      </div>
      
      {currentLink.requires_auth && (
        <div className="space-y-2">
          <Label>Rôles autorisés</Label>
          <div className="space-y-2 mt-1">
            {roles.map(role => (
              <div key={role.id} className="flex items-center space-x-2">
                <Switch 
                  id={`role-${role.id}`}
                  checked={currentLink.allowed_roles.includes(role.id)}
                  onCheckedChange={() => toggleRole(role.id)}
                />
                <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkForm;
