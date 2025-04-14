
import React from 'react';
import { Section } from '@/types/sections';
import SectionItem from './SectionItem';

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
  if (sections.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Aucune section configurée. Ajoutez des sections pour personnaliser votre page d'accueil.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md divide-y">
      {sections.sort((a, b) => a.order - b.order).map((section, index) => (
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
