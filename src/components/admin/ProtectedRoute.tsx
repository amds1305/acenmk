
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = true 
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
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

  // If we're in admin test mode, check the role if necessary
  if (isTestAdmin) {
    if (requireAdmin && testRole !== 'admin' && testRole !== 'super_admin') {
      console.log("Test user doesn't have admin privileges");
      return <Navigate to="/" replace />;
    }
    console.log("Admin test mode active, allowing access");
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page with the current location
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // If the user is not an administrator and the route requires admin privileges
    console.log("User authenticated but not admin, access denied");
    return <Navigate to="/" replace />;
  }

  console.log("Access granted to protected route");
  return <>{children}</>;
};

export default ProtectedRoute;
