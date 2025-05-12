
import React from 'react';
import { Section } from '@/types/sections';

interface SectionRendererProps {
  sections: Section[];
  sectionComponents: Record<string, React.FC>;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ sections, sectionComponents }) => {
  return (
    <>
      {sections.map((section) => {
        const SectionComponent = sectionComponents[section.type];
        
        if (!SectionComponent) {
          console.warn(`📊 [SectionRenderer] Section component not found for type: ${section.type}`);
          return (
            <div key={section.id} className="p-4 my-2 bg-red-100 dark:bg-red-900 border border-red-500 rounded text-center">
              <p className="text-red-600 dark:text-red-300">⚠️ Composant non trouvé: {section.type}</p>
            </div>
          );
        }
        
        try {
          console.log(`📊 [SectionRenderer] Rendu de la section ${section.id} (${section.type})`);
          return <SectionComponent key={section.id} />;
        } catch (err) {
          console.error(`📊 [SectionRenderer] Erreur lors du rendu de la section ${section.type}:`, err);
          return (
            <div key={section.id} className="p-4 my-2 bg-red-100 dark:bg-red-900 border border-red-500 rounded text-center">
              <p className="text-red-600 dark:text-red-300">⚠️ Erreur de rendu: {section.type}</p>
              <pre className="text-sm overflow-auto">{err instanceof Error ? err.message : 'Erreur inconnue'}</pre>
            </div>
          );
        }
      })}
    </>
  );
};

export default SectionRenderer;
