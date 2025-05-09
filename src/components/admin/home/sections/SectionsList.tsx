
import React from 'react';
import { Section } from '@/types/sections';
import SectionItem from './SectionItem';
import { AlertCircle } from 'lucide-react';

interface SectionsListProps {
  sections: Section[];
  draggingIndex: number | null;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  onRemoveSection: (id: string) => void;
}

const SectionsList: React.FC<SectionsListProps> = ({
  sections,
  draggingIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onToggleVisibility,
  onRemoveSection
}) => {
  // Safety check for sections array
  const safelyOrderedSections = sections && sections.length > 0
    ? [...sections].sort((a, b) => a.order - b.order)
    : [];

  // If no sections, display an informative message
  if (safelyOrderedSections.length === 0) {
    return (
      <div className="p-8 border rounded-md text-center space-y-3 bg-gray-50 dark:bg-gray-800">
        <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
        <div>
          <p className="text-lg font-semibold">Aucune section disponible</p>
          <p className="text-muted-foreground">
            Aucune section n'a été configurée ou les données n'ont pas été chargées correctement. 
            Essayez d'ajouter une nouvelle section ou de rafraîchir la page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md divide-y">
      {safelyOrderedSections.map((section, index) => (
        <SectionItem
          key={section.id}
          section={section}
          isDragging={draggingIndex === index}
          onDragStart={() => onDragStart(index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDragEnd={onDragEnd}
          onToggleVisibility={() => onToggleVisibility(section.id, section.visible)}
          onRemove={() => onRemoveSection(section.id)}
        />
      ))}
    </div>
  );
};

export default SectionsList;
