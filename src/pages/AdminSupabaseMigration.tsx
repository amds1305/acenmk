
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import MigrationTool from '@/components/admin/supabase-migration/MigrationTool';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AdminSupabaseMigration = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Migration des données</h1>
          <p className="text-muted-foreground">Transférer vos données vers Supabase</p>
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
    </AdminLayout>
  );
};

export default AdminSupabaseMigration;
