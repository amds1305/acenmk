
import React from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Section } from '@/types/sections';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface SectionItemProps {
  section: Section;
  isDragging: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onToggleVisibility: () => void;
  onRemove: () => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onToggleVisibility,
  onRemove
}) => {
  return (
    <div 
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`flex items-center justify-between p-3 ${isDragging ? 'bg-muted' : ''} ${!section.visible ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="cursor-move p-1 text-muted-foreground hover:text-foreground">
          <GripVertical className="h-5 w-5" />
        </div>
        <div>
          <div className="font-medium">{section.title}</div>
          <div className="text-xs text-muted-foreground">Type: {
            section.type.charAt(0).toUpperCase() + section.type.slice(1).replace(/-/g, ' ')
          }</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleVisibility}
        >
          {section.visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera la section "{section.title}" de la page d'accueil.
                {section.type !== 'custom' && " Cette section standard peut être ré-ajoutée plus tard."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={onRemove}
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

export default SectionItem;
