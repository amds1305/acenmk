
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash, Link } from 'lucide-react';
import { ClientLogo } from '@/types/sections';

interface ClientLogoCardProps {
  logo: ClientLogo;
  onEdit: (logo: ClientLogo) => void;
  onDelete: (id: string) => void;
}

const ClientLogoCard = ({ logo, onEdit, onDelete }: ClientLogoCardProps) => {
  return (
    <Card key={logo.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-4">
          <div className="h-16 mb-4">
            <img 
              src={logo.logoUrl} 
              alt={logo.name} 
              className="h-full w-auto object-contain" 
            />
          </div>
          <h3 className="font-medium text-center">{logo.name}</h3>
          {logo.websiteUrl && (
            <a 
              href={logo.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center mt-1"
            >
              <Link className="h-3 w-3 mr-1" />
              {logo.websiteUrl}
            </a>
          )}
        </div>
        
        <div className="flex justify-end items-center mt-4 pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(logo)}>
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer le logo de {logo.name} ? Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(logo.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientLogoCard;
