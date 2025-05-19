
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { migrateLocalStorageToSupabase } from '@/services/supabase/sectionsService';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';

const MigrationTool: React.FC = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationSuccess, setMigrationSuccess] = useState(false);
  const { toast } = useToast();
  const { reloadConfig } = useSections();

  const handleMigration = async () => {
    try {
      setIsMigrating(true);
      const success = await migrateLocalStorageToSupabase();
      
      if (success) {
        toast({
          title: "Migration réussie",
          description: "Vos données ont été migrées avec succès vers Supabase.",
        });
        setMigrationSuccess(true);
        
        // Recharger la configuration depuis Supabase
        await reloadConfig();
      } else {
        toast({
          title: "Aucune donnée à migrer",
          description: "Aucune donnée n'a été trouvée dans le localStorage.",
        });
        setMigrationSuccess(false);
      }
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      toast({
        title: "Erreur de migration",
        description: "Un problème est survenu lors de la migration des données.",
        variant: "destructive",
      });
      setMigrationSuccess(false);
    } finally {
      setIsMigrating(false);
      setMigrationComplete(true);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Migration des données</CardTitle>
        <CardDescription>
          Migrer les données de votre site depuis le stockage local vers la base de données Supabase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Cette opération va transférer toutes vos données actuelles (sections, configuration, clients en vedette, etc.) 
          depuis le stockage local de votre navigateur vers votre base de données Supabase.
        </p>
        
        {migrationComplete && (
          <Alert variant={migrationSuccess ? "default" : "destructive"} className="mb-4">
            {migrationSuccess ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {migrationSuccess ? "Migration réussie" : "Échec de la migration"}
            </AlertTitle>
            <AlertDescription>
              {migrationSuccess 
                ? "Toutes les données ont été migrées avec succès vers Supabase." 
                : "Un problème est survenu lors de la migration des données."}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleMigration} 
          disabled={isMigrating || migrationComplete}
          className="w-full"
        >
          {isMigrating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Migration en cours...
            </>
          ) : migrationComplete ? (
            "Migration terminée"
          ) : (
            "Lancer la migration"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MigrationTool;
