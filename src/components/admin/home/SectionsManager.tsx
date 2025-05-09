
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
import { AddSectionDialog, SectionsList, useSectionManager } from './sections';
import { useToast } from '@/hooks/use-toast';

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

  const { toast } = useToast();
  
  const handleSaveClick = () => {
    saveChanges()
      .then(() => {
        toast({
          title: "Sections sauvegardées",
          description: "Les sections ont été mises à jour avec succès.",
        });
      })
      .catch((error) => {
        console.error('Error saving sections:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la sauvegarde des sections.",
        });
      });
  };
  
  // Debug logging
  console.log('SectionsManager - Config loaded:', config);
  console.log('SectionsManager - Sections:', config?.sections || []);

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
          
          <Button onClick={handleSaveClick} variant="default" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Display debug info if there are no sections */}
        {(!config.sections || config.sections.length === 0) && (
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
            <p className="text-muted-foreground">Aucune section trouvée. Les données n'ont peut-être pas été chargées correctement.</p>
          </div>
        )}
        
        <SectionsList
          sections={config.sections || []}
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
