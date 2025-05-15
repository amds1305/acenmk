
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Les sections disponibles pour la migration
const dataSections = [
  { id: 'sections', name: 'Sections de page' },
  { id: 'hero', name: 'Section Hero' },
  { id: 'services', name: 'Services' },
  { id: 'about', name: 'À propos' },
  { id: 'team', name: 'Équipe' },
  { id: 'testimonials', name: 'Témoignages' },
  { id: 'faq', name: 'FAQ' },
  { id: 'trusted_clients', name: 'Clients de confiance' },
  { id: 'contact', name: 'Contact' },
  { id: 'footer', name: 'Footer' },
  { id: 'legal', name: 'Contenus légaux' },
  { id: 'users', name: 'Utilisateurs' },
];

const MigrationTool = () => {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ section: string, success: boolean, message: string }[]>([]);
  const { toast } = useToast();

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const selectAll = () => {
    setSelectedSections(dataSections.map(section => section.id));
  };

  const deselectAll = () => {
    setSelectedSections([]);
  };

  const startMigration = async () => {
    if (selectedSections.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une section à migrer",
        variant: "destructive"
      });
      return;
    }

    setMigrationStatus('migrating');
    setProgress(0);
    setResults([]);

    const totalSections = selectedSections.length;
    let completedSections = 0;
    const migrationResults = [];

    // Simuler le processus de migration
    for (const sectionId of selectedSections) {
      try {
        // Dans une implémentation réelle, cette partie serait remplacée par le code de migration effectif
        // vers Supabase pour chaque section
        const success = Math.random() > 0.2; // Simulation: 80% de chance de succès
        
        // Simuler une opération asynchrone
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sectionName = dataSections.find(s => s.id === sectionId)?.name || sectionId;
        
        migrationResults.push({
          section: sectionName,
          success,
          message: success 
            ? `Les données de ${sectionName} ont été migrées avec succès` 
            : `Échec de la migration pour ${sectionName}`
        });

        completedSections++;
        setProgress(Math.round((completedSections / totalSections) * 100));
      } catch (error) {
        console.error(`Erreur lors de la migration de ${sectionId}:`, error);
        
        const sectionName = dataSections.find(s => s.id === sectionId)?.name || sectionId;
        
        migrationResults.push({
          section: sectionName,
          success: false,
          message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
        });

        completedSections++;
        setProgress(Math.round((completedSections / totalSections) * 100));
      }
    }

    setResults(migrationResults);
    
    // Déterminer le statut global
    const hasErrors = migrationResults.some(result => !result.success);
    setMigrationStatus(hasErrors ? 'error' : 'success');
    
    toast({
      title: hasErrors ? "Migration terminée avec des erreurs" : "Migration réussie",
      description: hasErrors 
        ? "Certaines sections n'ont pas pu être migrées. Consultez les détails pour plus d'informations."
        : "Toutes les sections ont été migrées avec succès vers Supabase.",
      variant: hasErrors ? "destructive" : "default"
    });
  };

  const resetMigration = () => {
    setMigrationStatus('idle');
    setProgress(0);
    setResults([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Migration des données vers Supabase</CardTitle>
        <CardDescription>
          Transférez les données stockées localement vers votre base de données Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        {migrationStatus === 'migrating' ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">Migration en cours... Veuillez patienter.</p>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-right">{progress}%</p>
          </div>
        ) : migrationStatus === 'success' || migrationStatus === 'error' ? (
          <div className="space-y-4">
            <Alert variant={migrationStatus === 'success' ? "default" : "destructive"}>
              {migrationStatus === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>
                {migrationStatus === 'success' 
                  ? "Migration terminée avec succès" 
                  : "Migration terminée avec des erreurs"}
              </AlertDescription>
            </Alert>
            
            <div className="border rounded-md">
              <div className="bg-muted px-4 py-2 rounded-t-md">
                <h3 className="font-medium">Résultats de la migration</h3>
              </div>
              <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'}`}>
                      {result.success ? (
                        <CheckCircle2 className="h-4 w-4 text-white m-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-white m-0.5" />
                      )}
                    </div>
                    <div className="ml-2">
                      <p className={`text-sm font-medium ${result.success ? 'text-green-600' : 'text-red-600'}`}>{result.section}</p>
                      <p className="text-xs text-muted-foreground">{result.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Sélectionnez les données à migrer</h3>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={selectAll}>Tout sélectionner</Button>
                <Button variant="outline" size="sm" onClick={deselectAll}>Tout désélectionner</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                  />
                  <Label htmlFor={section.id}>{section.name}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {migrationStatus === 'idle' ? (
          <Button onClick={startMigration} disabled={selectedSections.length === 0}>
            Démarrer la migration
          </Button>
        ) : migrationStatus === 'migrating' ? (
          <Button disabled>Migration en cours...</Button>
        ) : (
          <Button onClick={resetMigration}>Nouvelle migration</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MigrationTool;
