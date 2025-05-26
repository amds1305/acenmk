
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, RefreshCw } from 'lucide-react';
import { AddSectionDialog, SectionsList, useSectionManager } from './sections';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
    saveChanges,
    reloadConfig,
  } = useSectionManager();
  
  const { saveStatus, setSaveStatus, showSaveSuccess, showSaveError } = useAdminNotification();
  
  const handleSaveClick = async () => {
    setSaveStatus('saving');
    try {
      await saveChanges();
      showSaveSuccess();
    } catch (error) {
      console.error('Error saving sections:', error);
      showSaveError(error);
    }
  };
  
  const handleReloadClick = () => {
    setSaveStatus('idle');
    reloadConfig();
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
        <div className="flex items-center gap-2">
          <SaveIndicator status={saveStatus} showText={false} />
          
          <Button size="sm" className="gap-1" onClick={handleReloadClick} variant="outline">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          
          <Button size="sm" className="gap-1" onClick={() => setDialogOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            Ajouter
          </Button>
          
          <Button 
            onClick={handleSaveClick} 
            variant="default" 
            size="sm" 
            className="gap-1"
            disabled={saveStatus === 'saving'}
          >
            <Save className="h-4 w-4" />
            {saveStatus === 'saving' ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Display debug info if there are no sections */}
        {(!config.sections || config.sections.length === 0) && (
          <Alert className="mb-4">
            <AlertTitle>Aucune section trouvée</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>Les données n'ont peut-être pas été chargées correctement.</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={handleReloadClick}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Recharger les données
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Afficher les sections si elles existent */}
        {config.sections && config.sections.length > 0 && (
          <SectionsList
            sections={config.sections || []}
            draggingIndex={draggingIndex}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onToggleVisibility={handleToggleVisibility}
            onRemoveSection={handleRemoveSection}
          />
        )}

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
