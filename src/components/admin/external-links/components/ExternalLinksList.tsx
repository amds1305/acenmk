
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Eye, EyeOff } from 'lucide-react';
import { Section } from '@/types/sections';

interface ExternalLinksListProps {
  externalLinks: Section[];
  availableRoles: { id: string; label: string }[];
  onEdit: (section: Section) => void;
  onToggleVisibility: (section: Section) => void;
}

const ExternalLinksList: React.FC<ExternalLinksListProps> = ({ 
  externalLinks, 
  availableRoles, 
  onEdit, 
  onToggleVisibility 
}) => {
  if (externalLinks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <ExternalLink className="mx-auto h-8 w-8 mb-2 opacity-50" />
        <p>Aucun lien externe configuré</p>
        <p className="text-sm mt-2">
          Ajoutez des liens externes depuis le gestionnaire de sections
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Accès</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {externalLinks.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium">{link.title}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              <a 
                href={link.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {link.externalUrl}
                <ExternalLink className="h-3 w-3" />
              </a>
            </TableCell>
            <TableCell>
              {link.requiresAuth ? (
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-amber-100 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                    Authentification requise
                  </Badge>
                  {(link.allowedRoles && link.allowedRoles.length > 0) ? (
                    <div className="flex flex-wrap gap-1">
                      {link.allowedRoles.map(role => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {availableRoles.find(r => r.id === role)?.label || role}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Tous les utilisateurs connectés
                    </Badge>
                  )}
                </div>
              ) : (
                <Badge variant="outline" className="bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
                  Public
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {link.visible ? (
                <Badge className="bg-green-500">Visible</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">Masqué</Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => onToggleVisibility(link)}>
                  {link.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onEdit(link)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExternalLinksList;
