
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/auth';
import { isAdminRole } from '@/utils/roleUtils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true,
  requiredRole
}) => {
  const { isAuthenticated, isAdmin, user, isLoading } = useAuth();
  const { hasAccess } = usePermissions();
  const location = useLocation();
  
  // Check for admin test mode
  const isTestAdmin = localStorage.getItem('adminTestMode') === 'true';
  const testRole = localStorage.getItem('adminTestRole');
  
  console.log("Protected Route Check:", { 
    isAuthenticated, 
    isAdmin, 
    isLoading, 
    isTestAdmin, 
    testRole,
    userRole: user?.role,
    path: location.pathname 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Si nous sommes en mode test admin
  if (isTestAdmin) {
    if (requireAdmin && testRole !== 'admin' && testRole !== 'super_admin' && 
        testRole !== 'business_admin') {
      console.log("Test user doesn't have admin privileges");
      return <Navigate to="/" replace />;
    }
    
    // Si un rôle spécifique est requis, vérifier
    if (requiredRole && testRole !== requiredRole) {
      console.log(`Test user doesn't have the required role: ${requiredRole}`);
      return <Navigate to="/admin" replace />;
    }
    
    console.log("Admin test mode active, allowing access");
    return <>{children}</>;
  }

  // Vérifier si l'utilisateur est authentifié
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Vérifier les permissions basées sur le chemin actuel
  if (!hasAccess(location.pathname, user?.role)) {
    console.log(`User does not have access to ${location.pathname}`);
    // Rediriger vers la page d'accueil admin ou le tableau de bord
    return <Navigate to="/admin" replace />;
  }

  // Vérifier si l'accès admin est requis
  if (requireAdmin) {
    if (!isAdmin && !(user && isAdminRole(user.role))) {
      console.log("User authenticated but not admin, access denied");
      return <Navigate to="/" replace />;
    }
  }

  // Vérifier si un rôle spécifique est requis
  if (requiredRole && user && user.role !== requiredRole) {
    console.log(`User doesn't have the required role: ${requiredRole}`);
    return <Navigate to="/admin" replace />;
  }

  console.log("Access granted to protected route");
  return <>{children}</>;
};

export default ProtectedRoute;
