
import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { useParams } from 'react-router-dom';

const AdminCustomSection = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Section Personnalisée</h1>
        <p className="text-muted-foreground">
          Personnalisez cette section avec l'identifiant: {id}
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="mb-4">Cette section est en cours de développement.</p>
          <p>Contenu personnalisé pour la section ID: {id}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomSection;
