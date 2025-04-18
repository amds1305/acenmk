
import React from 'react';
import MigrationTool from '@/components/admin/supabase-migration/MigrationTool';
import ApiPackageDownload from '@/components/admin/supabase-migration/ApiPackageDownload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AdminSupabaseMigration = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Migration des données</h1>
        <p className="text-muted-foreground mt-2">
          Transférez vos données depuis le stockage local vers la base de données MySQL ou Supabase.
        </p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information importante</AlertTitle>
        <AlertDescription>
          Cette étape est nécessaire pour que votre site utilise une base de données persistante
          plutôt que le stockage local de votre navigateur. La migration n'est à effectuer qu'une seule fois.
        </AlertDescription>
      </Alert>

      <MigrationTool />
    </div>
  );
};

export default AdminSupabaseMigration;
