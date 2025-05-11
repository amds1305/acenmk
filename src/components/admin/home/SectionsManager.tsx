
import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, RefreshCw } from 'lucide-react';
import { AddSectionDialog, SectionsList } from './sections';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useQueryClient } from '@tanstack/react-query';
import { useSectionManager } from './sections/useSectionManager';

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
  const queryClient = useQueryClient();
  
  // Forcer un rechargement au montage du composant
  useEffect(() => {
    console.log("SectionsManager - Rechargement forcé des sections");
    reloadConfig();
  }, [reloadConfig]);
  
  const handleSaveClick = async () => {
    setSaveStatus('saving');
    try {
      await saveChanges();
      showSaveSuccess();
      
      // Invalider les requêtes pour forcer un rechargement complet
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      
      // Déclencher l'événement de mise à jour
      window.dispatchEvent(new CustomEvent('admin-changes-saved', {
        detail: { timestamp: new Date().getTime() }
      }));
      
      // Nettoyer le cache local si présent
      localStorage.removeItem('cachedHomepageConfig');
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSaveError();
    } finally {
      setSaveStatus('idle');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sections de la page d'accueil</CardTitle>
          <CardDescription>
            Ajoutez, réorganisez et configurez les sections de votre page d'accueil
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <SaveIndicator status={saveStatus} />
          <Button variant="outline" size="sm" onClick={() => reloadConfig()}>
            <RefreshCw className="mr-1 h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
            <PlusCircle className="mr-1 h-4 w-4" />
            Ajouter
          </Button>
          <Button size="sm" onClick={handleSaveClick}>
            <Save className="mr-1 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {config.sections && config.sections.length > 0 ? (
          <SectionsList
            sections={config.sections}
            draggingIndex={draggingIndex}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onToggleVisibility={handleToggleVisibility}
            onRemoveSection={handleRemoveSection}
          />
        ) : (
          <Alert>
            <AlertTitle>Aucune section trouvée</AlertTitle>
            <AlertDescription>
              Commencez par ajouter une section à votre page d'accueil.
            </AlertDescription>
          </Alert>
        )}
        
        <AddSectionDialog
          open={dialogOpen}
          setIsOpen={setDialogOpen}
          newSection={newSection}
          setNewSection={setNewSection}
          onAddSection={handleAddSection}
        />
      </CardContent>
    </Card>
  );
};

export default SectionsManager;
