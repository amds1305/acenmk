
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/layout';
import { SectionsProvider } from '@/contexts/sections/SectionsContext';
import { AdminNotificationProvider } from '@/hooks/admin-notification';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AdminWrapperProps {
  children?: React.ReactNode;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();
  const location = useLocation();
  
  // Vérifier le mode admin de test
  const isTestAdmin = localStorage.getItem('adminTestMode') === 'true';
  
  // Afficher un chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès...</span>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  // et n'est pas en mode test admin
  if (!isAuthenticated && !isTestAdmin) {
    console.log("Utilisateur non authentifié, redirection vers la connexion admin");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // Vérifier si l'utilisateur est administrateur ou en mode test admin
  if (!isAdmin && !isTestAdmin && !(user?.role === 'super_admin' || user?.role === 'business_admin')) {
    console.log("Utilisateur authentifié mais sans droits d'administration");
    return <Navigate to="/" replace />;
  }
  
  // Si tout est en ordre, afficher le contenu d'administration
  return (
    <AdminNotificationProvider>
      <SectionsProvider>
        <AdminLayout>
          {children || <Outlet />}
        </AdminLayout>
      </SectionsProvider>
    </AdminNotificationProvider>
  );
};

export default AdminWrapper;
