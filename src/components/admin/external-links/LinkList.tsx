
import React from 'react';
import { ExternalLink } from './useExternalLinks';
import LinkListItem from './LinkListItem';

interface LinkListProps {
  links: ExternalLink[];
  onEdit: (link: ExternalLink) => void;
  onDelete: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  if (links.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Aucun lien externe n'a été configuré.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {links.map(link => (
        <LinkListItem 
          key={link.id} 
          link={link} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default LinkList;
