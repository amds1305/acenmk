
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Pen, Trash2 } from 'lucide-react';
import { SocialLinkListProps } from './types';

const SocialLinkList = ({ 
  socialLinks, 
  handleEditSocialLink, 
  handleDeleteSocialLink, 
  handleToggleVisibility,
  renderSocialIcon 
}: SocialLinkListProps) => {
  return (
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
  );
};

export default SocialLinkList;
