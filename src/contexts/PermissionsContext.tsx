
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AccessControlConfig, PermissionsContextType, PermissionRule, RouteMetadata, RouteWithAccess } from '@/types/permissions';
import { UserRole } from '@/types/auth';
import { getAllRoutes, getRouteMetadata } from '@/lib/routes';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

// Default permissions configuration
const DEFAULT_ACCESS_CONFIG: AccessControlConfig = {
  routes: {},
  adminRoutes: {}
};

// Create the context
const PermissionsContext = createContext<PermissionsContextType | null>(null);

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessConfig, setAccessConfig] = useState<AccessControlConfig>(DEFAULT_ACCESS_CONFIG);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load permissions from Supabase
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        setIsLoading(true);
        console.log('Loading permissions from Supabase...');
        
        // Use proper header setup to avoid 406 errors
        const { data, error } = await supabase
          .from('app_settings')
          .select('*')
          .eq('id', 'route_permissions:1');

        if (error) {
          console.error('Error loading permissions:', error);
          toast({
            title: "Erreur de chargement des permissions",
            description: "Utilisation des permissions par défaut",
            variant: "destructive",
          });
          return;
        }

        if (data && data.length > 0 && data[0].settings) {
          console.log('Permissions loaded successfully', data[0].settings);
          setAccessConfig(data[0].settings as AccessControlConfig);
        } else {
          console.log('No permissions found, using defaults');
        }
      } catch (error) {
        console.error('Exception loading permissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPermissions();
  }, [toast]);

  // Function to check if a user has access to a route
  const hasAccess = (route: string, userRole?: UserRole): boolean => {
    // Default to the current user's role if not provided
    const role = userRole || (user?.role as UserRole) || 'visitor';
    
    // Check if route exists in public routes
    if (accessConfig.routes[route]) {
      const rule = accessConfig.routes[route];
      return rule.isPublic || rule.allowedRoles.includes(role);
    }
    
    // Check if route exists in admin routes
    if (accessConfig.adminRoutes[route]) {
      const rule = accessConfig.adminRoutes[route];
      return rule.isPublic || rule.allowedRoles.includes(role);
    }
    
    // If route is not found in either config, default to public
    return true;
  };

  // Function to update route access
  const updateRouteAccess = async (route: string, permissions: PermissionRule): Promise<void> => {
    try {
      // Determine which set of routes this belongs to
      const isAdminRoute = route.startsWith('/admin');
      const updatedConfig = { ...accessConfig };
      
      if (isAdminRoute) {
        updatedConfig.adminRoutes[route] = permissions;
      } else {
        updatedConfig.routes[route] = permissions;
      }
      
      setAccessConfig(updatedConfig);
      
      // Save is handled separately through savePermissions()
      toast({
        title: "Modifications en attente",
        description: "N'oubliez pas d'enregistrer vos modifications",
      });
      
    } catch (error) {
      console.error('Error updating route access:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les permissions",
        variant: "destructive",
      });
    }
  };

  // Function to save all permissions to Supabase
  const savePermissions = async (): Promise<void> => {
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({
          id: 'route_permissions:1',
          settings: accessConfig,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast({
        title: "Permissions enregistrées",
        description: "Les modifications ont été sauvegardées avec succès",
      });
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les permissions",
        variant: "destructive",
      });
    }
  };

  // Function to get routes for a specific role
  const getRoutesForRole = (role: UserRole): RouteWithAccess[] => {
    const allRoutes = Object.keys(accessConfig.routes);
    const routesWithAccess: RouteWithAccess[] = [];
    
    allRoutes.forEach(route => {
      const rule = accessConfig.routes[route];
      const metadata = getRouteMetadata(route) || { path: route, title: route };
      
      if (rule.isPublic || rule.allowedRoles.includes(role)) {
        routesWithAccess.push({
          ...metadata,
          permissions: rule
        });
      }
    });
    
    return routesWithAccess;
  };

  // Function to get all public routes
  const getPublicRoutes = (): RouteWithAccess[] => {
    const allRoutes = Object.keys(accessConfig.routes);
    const publicRoutes: RouteWithAccess[] = [];
    
    allRoutes.forEach(route => {
      const rule = accessConfig.routes[route];
      const metadata = getRouteMetadata(route) || { path: route, title: route };
      
      if (rule.isPublic) {
        publicRoutes.push({
          ...metadata,
          permissions: rule
        });
      }
    });
    
    return publicRoutes;
  };

  // Function to get admin routes for a specific role
  const getAdminRoutesForRole = (role: UserRole): RouteWithAccess[] => {
    const allAdminRoutes = Object.keys(accessConfig.adminRoutes);
    const adminRoutesWithAccess: RouteWithAccess[] = [];
    
    allAdminRoutes.forEach(route => {
      const rule = accessConfig.adminRoutes[route];
      const metadata = getRouteMetadata(route) || { path: route, title: route };
      
      if (rule.isPublic || rule.allowedRoles.includes(role)) {
        adminRoutesWithAccess.push({
          ...metadata,
          permissions: rule
        });
      }
    });
    
    return adminRoutesWithAccess;
  };

  // Function to check if a route is public
  const isRoutePublic = (route: string): boolean => {
    if (accessConfig.routes[route]) {
      return accessConfig.routes[route].isPublic;
    }
    
    if (accessConfig.adminRoutes[route]) {
      return accessConfig.adminRoutes[route].isPublic;
    }
    
    // Default to false for undefined routes
    return false;
  };

  // Function to scan for new routes and update the configuration
  const scanAndUpdateRoutes = async (): Promise<void> => {
    try {
      const allRoutes = getAllRoutes();
      const updatedConfig = { ...accessConfig };
      let hasChanges = false;
      
      // Check for new public routes
      allRoutes.publicRoutes.forEach(route => {
        if (!updatedConfig.routes[route]) {
          updatedConfig.routes[route] = {
            isPublic: true,
            allowedRoles: ['admin', 'user', 'editor', 'visitor']
          };
          hasChanges = true;
        }
      });
      
      // Check for new admin routes
      allRoutes.adminRoutes.forEach(route => {
        if (!updatedConfig.adminRoutes[route]) {
          updatedConfig.adminRoutes[route] = {
            isPublic: false,
            allowedRoles: ['admin']
          };
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setAccessConfig(updatedConfig);
        toast({
          title: "Nouvelles routes détectées",
          description: "La configuration des permissions a été mise à jour",
        });
      } else {
        toast({
          title: "Scan terminé",
          description: "Aucune nouvelle route détectée",
        });
      }
    } catch (error) {
      console.error('Error scanning routes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de scanner les routes",
        variant: "destructive",
      });
    }
  };

  const contextValue: PermissionsContextType = {
    accessConfig,
    isLoading,
    hasAccess,
    updateRouteAccess,
    savePermissions,
    getRoutesForRole,
    getPublicRoutes,
    getAdminRoutesForRole,
    isRoutePublic,
    scanAndUpdateRoutes
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export default PermissionsProvider;
