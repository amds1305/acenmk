
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/contexts/PermissionsContext';
import { UserRole } from '@/types/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedModuleProps {
  requiredRoles: UserRole[];
  path: string;
  children: React.ReactNode;
}

const ProtectedModule: React.FC<ProtectedModuleProps> = ({ requiredRoles, path, children }) => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasAccess } = usePermissions();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ne vérifier l'accès que lorsque l'authentification est terminée
    if (!authLoading) {
      // Vérifier si l'utilisateur est authentifié
      if (!isAuthenticated) {
        navigate('/login', { state: { returnTo: path } });
        return;
      }
      
      // Vérifier si l'utilisateur a un rôle requis
      if (user && requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.includes(user.role);
        const userHasAccess = hasAccess(path, user.role);
        
        if (!hasRequiredRole && !userHasAccess) {
          navigate('/');
          return;
        }
      }
    }
  }, [isAuthenticated, user, requiredRoles, hasAccess, path, navigate, authLoading]);
  
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès...</span>
      </div>
    );
  }
  
  // Si nous avons passé toutes les vérifications, afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedModule;
