
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { ExternalLink } from './useExternalLinks';

interface LinkListItemProps {
  link: ExternalLink;
  onEdit: (link: ExternalLink) => void;
  onDelete: (id: string) => void;
}

const LinkListItem: React.FC<LinkListItemProps> = ({ link, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between border p-3 rounded-md">
      <div>
        <h3 className="font-medium">{link.name}</h3>
        <p className="text-sm text-muted-foreground">{link.url}</p>
        {link.requires_auth && (
          <div className="text-xs mt-1">
            Requiert authentification
            {link.allowed_roles.length > 0 && (
              <span> • Rôles: {link.allowed_roles.join(', ')}</span>
            )}
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(link)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer ce lien externe ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(link.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LinkListItem;
