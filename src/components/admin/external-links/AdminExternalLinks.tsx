
import React from 'react';
import ExternalLinksManager from './ExternalLinksManager';

const AdminExternalLinks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Liens externes</h1>
        <p className="text-muted-foreground">Gérer les liens vers des applications externes</p>
      </div>
      
      <ExternalLinksManager />
    </div>
  );
};

export default AdminExternalLinks;
