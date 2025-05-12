
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LeadTraceManager = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Leads récents</h2>
          <p className="text-muted-foreground">
            Module en cours de développement. Bientôt disponible.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Statistiques</h2>
          <p className="text-muted-foreground">
            Module en cours de développement. Bientôt disponible.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Actions</h2>
          <p className="text-muted-foreground">
            Module en cours de développement. Bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadTraceManager;
