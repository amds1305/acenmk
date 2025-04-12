
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { migrateLocalStorageToSupabase } from '@/services/mysql/sectionsService';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MySQLConfigInfo from './MySQLConfigInfo';

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
          description: "Vos données ont été migrées avec succès.",
        });
        setMigrationSuccess(true);
        
        // Recharger la configuration
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
    <Tabs defaultValue="mysql">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mysql">MySQL (OVH)</TabsTrigger>
        <TabsTrigger value="supabase">Supabase</TabsTrigger>
      </TabsList>
      
      <TabsContent value="mysql" className="space-y-4 mt-4">
        <MySQLConfigInfo />
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Migration des données vers MySQL</CardTitle>
            <CardDescription>
              Migrer les données de votre site depuis le stockage local vers votre base de données MySQL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Cette opération va transférer toutes vos données actuelles (sections, configuration, clients en vedette, etc.) 
              depuis le stockage local de votre navigateur vers votre base de données MySQL via votre API.
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
                    ? "Toutes les données ont été migrées avec succès vers votre base MySQL." 
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
      </TabsContent>
      
      <TabsContent value="supabase" className="space-y-4 mt-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Supabase utilise PostgreSQL et non MySQL. Si vous préférez utiliser Supabase directement,
            vous devrez créer un projet Supabase et configurer les tables PostgreSQL.
          </AlertDescription>
        </Alert>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Migration des données vers Supabase</CardTitle>
            <CardDescription>
              Migrer les données de votre site depuis le stockage local vers la base de données Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Cette option est disponible uniquement si vous décidez d'utiliser Supabase avec PostgreSQL
              au lieu de votre base MySQL chez OVH.
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">
              Option non disponible avec MySQL
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default MigrationTool;
