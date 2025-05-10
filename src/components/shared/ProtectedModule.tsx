
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Loader2 } from 'lucide-react';

interface ProtectedModuleProps {
  children: React.ReactNode;
  requiredRoles: string[];
  path: string;
}

/**
 * Composant qui protège l'accès aux modules internes en fonction des rôles et permissions
 */
const ProtectedModule: React.FC<ProtectedModuleProps> = ({ 
  children, 
  requiredRoles,
  path 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { hasAccess } = usePermissions();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: path }} replace />;
  }

  // Vérifier si l'utilisateur a un des rôles requis
  const hasRequiredRole = user && requiredRoles.some(role => user.role === role);
  
  // Vérifier si l'utilisateur a accès au chemin via le système de permissions
  const hasModuleAccess = user && hasAccess(path, user.role);

  // Si l'utilisateur n'a pas les permissions nécessaires, rediriger vers la page d'accueil
  if (!hasRequiredRole && !hasModuleAccess) {
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur a les permissions nécessaires, afficher le module
  return <>{children}</>;
};

export default ProtectedModule;
