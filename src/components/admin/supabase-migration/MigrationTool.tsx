
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Database, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { migrateLocalStorageToSupabase } from '@/services/mysql/migration';

const MigrationTool: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState<string | null>(null);
  const [confirmMigration, setConfirmMigration] = useState(false);

  const handleMigration = async () => {
    if (!confirmMigration) {
      toast({
        variant: "destructive",
        title: "Confirmation requise",
        description: "Veuillez confirmer que vous avez lu les informations de migration.",
      });
      return;
    }

    setIsLoading(true);
    setMigrationError(null);
    
    try {
      const success = await migrateLocalStorageToSupabase();
      
      if (success) {
        setMigrationComplete(true);
        toast({
          title: "Migration réussie",
          description: "Les données ont été transférées avec succès vers Supabase",
        });
      } else {
        setMigrationError("La migration n'a pas pu être effectuée ou aucune donnée n'était disponible.");
        toast({
          variant: "destructive",
          title: "Échec de la migration",
          description: "La migration des données n'a pas pu être effectuée.",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      setMigrationError(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
      toast({
        variant: "destructive",
        title: "Erreur de migration",
        description: "Une erreur s'est produite lors de la migration.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Migration vers Supabase
          </CardTitle>
          <CardDescription>
            Transférez vos données du stockage local vers la base de données Supabase pour une persistance permanente et un accès multi-utilisateurs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 rounded-md">
            <h3 className="flex items-center text-amber-800 dark:text-amber-300 font-medium mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Informations importantes
            </h3>
            <ul className="list-disc list-inside space-y-2 text-amber-700 dark:text-amber-400">
              <li>Cette opération est à effectuer une seule fois pour initialiser votre base de données.</li>
              <li>Assurez-vous que tous vos contenus ont été correctement saisis et sauvegardés localement avant de procéder.</li>
              <li>Les données existantes dans la base de données Supabase seront préservées si elles ont le même identifiant.</li>
              <li>Une fois la migration effectuée, votre site utilisera exclusivement la base de données Supabase.</li>
            </ul>
          </div>
          
          <div className="flex items-top space-x-2">
            <Checkbox 
              id="confirm-migration" 
              checked={confirmMigration}
              onCheckedChange={(checked) => setConfirmMigration(!!checked)}
            />
            <label htmlFor="confirm-migration" className="text-sm leading-tight">
              J'ai lu les informations ci-dessus et je comprends que cette opération doit être effectuée une seule fois. J'ai sauvegardé mes données et je souhaite procéder à la migration.
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleMigration} 
              disabled={isLoading || migrationComplete || !confirmMigration}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Migration en cours...
                </>
              ) : migrationComplete ? (
                <>
                  <Check className="h-4 w-4" />
                  Migration effectuée
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  Démarrer la migration
                </>
              )}
            </Button>
            
            {migrationComplete && (
              <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                <Check className="h-4 w-4" />
                Migration réussie
              </Badge>
            )}
            
            {migrationError && (
              <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                <AlertTriangle className="h-4 w-4" />
                Erreur de migration
              </Badge>
            )}
          </div>
          
          {migrationError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded-md text-red-700 dark:text-red-300">
              <h4 className="font-medium mb-1">Détails de l'erreur:</h4>
              <p className="text-sm">{migrationError}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationTool;
