
export interface NewSectionForm {
  name: string;
  type: string;
}

export interface SectionItemProps {
  section: {
    id: string;
    name: string;
    type: string;
    isVisible: boolean;
    order: number;
  };
  isDragging: boolean;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onToggleVisibility: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
}

export interface SectionsListProps {
  sections: {
    id: string;
    name: string;
    type: string;
    isVisible: boolean;
    order: number;
  }[];
  draggingIndex: number | null;
  onDragStart: (index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onToggleVisibility: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
}
