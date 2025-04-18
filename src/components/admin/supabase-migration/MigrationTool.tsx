
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, InfoIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/SectionsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MySQLConfigInfo from './MySQLConfigInfo';
import ApiPackageDownload from './ApiPackageDownload';
import { migrateLocalStorageToSupabase } from '@/services/supabase/sectionsService'; // For Supabase migrations
import { migrateLocalStorageToSupabase as migrateLocalStorageToMySQL } from '@/services/mysql/migration'; // For MySQL migrations

const MigrationTool: React.FC = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationSuccess, setMigrationSuccess] = useState(false);
  const { toast } = useToast();
  const { reloadConfig } = useSections();

  const handleSupabaseMigration = async () => {
    try {
      setIsMigrating(true);
      const success = await migrateLocalStorageToSupabase();
      
      if (success) {
        toast({
          title: "Migration réussie",
          description: "Vos données ont été migrées avec succès vers Supabase.",
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
      console.error('Erreur lors de la migration vers Supabase:', error);
      toast({
        title: "Erreur de migration",
        description: "Un problème est survenu lors de la migration des données vers Supabase.",
        variant: "destructive",
      });
      setMigrationSuccess(false);
    } finally {
      setIsMigrating(false);
      setMigrationComplete(true);
    }
  };
  
  const handleMySQLMigration = async () => {
    try {
      setIsMigrating(true);
      const success = await migrateLocalStorageToMySQL();
      
      if (success) {
        toast({
          title: "Migration réussie",
          description: "Vos données ont été migrées avec succès vers MySQL.",
        });
        setMigrationSuccess(true);
        
        // Recharger la configuration
        await reloadConfig();
      } else {
        toast({
          title: "Échec de la migration",
          description: "Aucune donnée n'a été migrée. Vérifiez que l'API MySQL est configurée correctement.",
        });
        setMigrationSuccess(false);
      }
    } catch (error) {
      console.error('Erreur lors de la migration vers MySQL:', error);
      toast({
        title: "Erreur de migration",
        description: "Un problème est survenu lors de la migration des données vers MySQL. Vérifiez la configuration de l'API.",
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
        <ApiPackageDownload />
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
                    : "Un problème est survenu lors de la migration des données. Vérifiez que l'API est bien configurée."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleMySQLMigration} 
              disabled={isMigrating}
              className="w-full"
            >
              {isMigrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migration en cours...
                </>
              ) : migrationComplete && migrationSuccess ? (
                "Migration terminée"
              ) : migrationComplete && !migrationSuccess ? (
                "Réessayer la migration"
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
              Cette option migre vos données vers Supabase, une solution de base de données PostgreSQL hébergée dans le cloud.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSupabaseMigration}
              disabled={isMigrating}
              className="w-full"
            >
              {isMigrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migration en cours...
                </>
              ) : "Lancer la migration vers Supabase"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default MigrationTool;
