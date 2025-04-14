
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
import { AddSectionDialog, SectionsList, useSectionManager } from './sections';

const SectionsManager: React.FC = () => {
  const {
    config,
    newSection,
    setNewSection,
    draggingIndex,
    dialogOpen,
    setDialogOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddSection,
    handleToggleVisibility,
    handleRemoveSection,
    saveChanges
  } = useSectionManager();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Gestion des sections</CardTitle>
          <CardDescription>
            Ajoutez, réorganisez et gérez les sections de la page d'accueil
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-1" onClick={() => setDialogOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            Ajouter
          </Button>
          
          <Button onClick={saveChanges} variant="default" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <SectionsList
          sections={config.sections}
          draggingIndex={draggingIndex}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onToggleVisibility={handleToggleVisibility}
          onRemoveSection={handleRemoveSection}
        />

        <AddSectionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          newSection={newSection}
          setNewSection={setNewSection}
          handleAddSection={handleAddSection}
        />
      </CardContent>
    </Card>
  );
};

export default SectionsManager;
