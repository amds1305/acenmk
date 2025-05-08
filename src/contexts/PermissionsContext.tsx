
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  AccessControlConfig, 
  PermissionsContextType, 
  PermissionRule, 
  RouteWithAccess 
} from '@/types/permissions';
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { getRouteMetadata, extractAppRoutes, getAllRoutes } from '@/lib/routes';
import { DEFAULT_ACCESS_CONFIG } from '@/config/accessControl';
import { supabase } from '@/lib/supabase';

// Create context
const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessConfig, setAccessConfig] = useState<AccessControlConfig>(DEFAULT_ACCESS_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  /**
   * Synchronise la configuration d'accès avec les routes actuelles de l'application
   * @param currentConfig Configuration actuelle des accès
   * @returns Configuration mise à jour pour inclure toutes les routes de l'application
   */
  const syncRoutesWithAccessConfig = useCallback(
    (currentConfig: AccessControlConfig): AccessControlConfig => {
      const updatedConfig: AccessControlConfig = {
        routes: { ...currentConfig.routes },
        adminRoutes: { ...currentConfig.adminRoutes }
      };
      
      // Extraire toutes les routes de l'application
      const appRoutes = extractAppRoutes();
      console.log('Routes extraites de l\'application:', appRoutes);
      
      // Parcourir toutes les routes et les ajouter à la config si elles n'existent pas déjà
      appRoutes.forEach(route => {
        // Séparer les routes admin et les routes normales
        if (route.startsWith('/admin')) {
          // Pour les routes admin, on extrait la partie après '/admin/'
          const adminRoute = route.replace('/admin/', '');
          
          // Si cette route admin n'existe pas déjà dans la config, l'ajouter
          if (!updatedConfig.adminRoutes[adminRoute] && adminRoute !== '') {
            console.log(`Ajout de la route admin: ${adminRoute}`);
            updatedConfig.adminRoutes[adminRoute] = {
              isPublic: false,
              allowedRoles: ['admin', 'super_admin'],
              description: `Route d'administration: ${route}`
            };
          }
        } else {
          // Si cette route normale n'existe pas déjà dans la config, l'ajouter
          if (!updatedConfig.routes[route]) {
            console.log(`Ajout de la route: ${route}`);
            updatedConfig.routes[route] = {
              isPublic: true, // Par défaut, les nouvelles routes sont publiques
              allowedRoles: [],
              description: `Nouvelle route: ${route}`
            };
          }
        }
      });
      
      return updatedConfig;
    },
    []
  );

  // Charger la configuration des accès
  const loadAccessConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Vérifier si nous sommes en mode test
      const isTestMode = localStorage.getItem('adminTestMode') === 'true';
      
      let loadedConfig: AccessControlConfig;
      
      if (isTestMode) {
        console.log('Mode test: utilisation de la config par défaut pour les permissions');
        loadedConfig = DEFAULT_ACCESS_CONFIG;
      } else {
        // Dans une implémentation réelle, récupérer depuis la base de données
        const { data, error } = await supabase
          .from('app_settings')
          .select('*')
          .eq('id', 'route_permissions')
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') { // Code for "not found"
            console.log('Aucune configuration trouvée, utilisation des valeurs par défaut');
            loadedConfig = DEFAULT_ACCESS_CONFIG;
          } else {
            throw error;
          }
        } else if (data && data.value) {
          console.log('Configuration des permissions chargée avec succès');
          loadedConfig = data.value as AccessControlConfig;
        } else {
          console.log('Aucune donnée trouvée, utilisation des valeurs par défaut');
          loadedConfig = DEFAULT_ACCESS_CONFIG;
        }
      }
      
      // Synchroniser la configuration chargée avec les routes actuelles de l'application
      const updatedConfig = syncRoutesWithAccessConfig(loadedConfig);
      setAccessConfig(updatedConfig);
      
    } catch (error) {
      console.error('Erreur lors du chargement des permissions:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger la configuration des accès',
        variant: 'destructive',
      });
      // Utiliser la configuration par défaut en cas d'erreur
      const defaultConfig = syncRoutesWithAccessConfig(DEFAULT_ACCESS_CONFIG);
      setAccessConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  }, [toast, syncRoutesWithAccessConfig]);

  // Charger la configuration au démarrage
  useEffect(() => {
    loadAccessConfig();
  }, [loadAccessConfig]);

  // Vérifier si un utilisateur a accès à une route
  const hasAccess = useCallback((route: string, userRole?: UserRole): boolean => {
    // Si la route commence par /admin, vérifier les permissions admin
    if (route.startsWith('/admin')) {
      const adminRoute = route.replace('/admin/', '');
      const permissions = accessConfig.adminRoutes[adminRoute];
      
      // Si pas de règle trouvée, vérifier pour /admin
      if (!permissions && adminRoute !== '') {
        return hasAccess('/admin', userRole);
      }
      
      // Si toujours pas de règle, refuser l'accès par défaut
      if (!permissions) {
        return false;
      }
      
      // Vérifier si la route est publique ou si l'utilisateur a un rôle autorisé
      return permissions.isPublic || (userRole ? permissions.allowedRoles.includes(userRole) : false);
    }
    
    // Autres routes (non-admin)
    const permissions = accessConfig.routes[route];
    
    // Si pas de règle définie, autoriser par défaut (public)
    if (!permissions) {
      return true;
    }
    
    // Vérifier si la route est publique ou si l'utilisateur a un rôle autorisé
    return permissions.isPublic || (userRole ? permissions.allowedRoles.includes(userRole) : false);
  }, [accessConfig]);

  // Vérifier si une route est publique
  const isRoutePublic = useCallback((route: string): boolean => {
    if (route.startsWith('/admin')) {
      const adminRoute = route.replace('/admin/', '');
      const permissions = accessConfig.adminRoutes[adminRoute];
      return permissions ? permissions.isPublic : false;
    }
    
    const permissions = accessConfig.routes[route];
    return permissions ? permissions.isPublic : true;
  }, [accessConfig]);

  // Mettre à jour les permissions d'une route
  const updateRouteAccess = useCallback(async (route: string, permissions: PermissionRule): Promise<void> => {
    try {
      const newConfig = { ...accessConfig };
      
      if (route.startsWith('/admin')) {
        const adminRoute = route.replace('/admin/', '');
        newConfig.adminRoutes = {
          ...newConfig.adminRoutes,
          [adminRoute]: permissions
        };
      } else {
        newConfig.routes = {
          ...newConfig.routes,
          [route]: permissions
        };
      }
      
      setAccessConfig(newConfig);
      
      // Dans une implémentation réelle, on pourrait sauvegarder immédiatement
      // Ici, on laisse la responsabilité à savePermissions() pour plus de contrôle
      
      toast({
        title: 'Mise à jour',
        description: 'Permissions mises à jour. N\'oubliez pas de sauvegarder!',
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des permissions:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour les permissions',
        variant: 'destructive',
      });
    }
  }, [accessConfig, toast]);

  // Sauvegarder la configuration complète
  const savePermissions = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Vérifier si nous sommes en mode test
      const isTestMode = localStorage.getItem('adminTestMode') === 'true';
      
      if (isTestMode) {
        console.log('Mode test: simulation de sauvegarde des permissions');
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: 'Succès',
            description: 'Permissions sauvegardées avec succès (mode test)',
          });
        }, 500);
        return;
      }
      
      // Dans une implémentation réelle, sauvegarder dans la base de données
      const { error } = await supabase
        .from('app_settings')
        .upsert({
          id: 'route_permissions',
          name: 'Route Permissions',
          description: 'Configuration des permissions d\'accès aux routes',
          value: accessConfig
        });
        
      if (error) throw error;
      
      toast({
        title: 'Succès',
        description: 'Permissions sauvegardées avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des permissions:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder les permissions',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [accessConfig, toast]);

  // Scanner l'application pour détecter de nouvelles routes et mettre à jour la config
  const scanAndUpdateRoutes = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Récupérer toutes les routes de l'application
      const appRoutes = extractAppRoutes();
      
      // Mettre à jour la configuration d'accès
      const updatedConfig = syncRoutesWithAccessConfig(accessConfig);
      
      // Si des changements ont été détectés, mettre à jour la configuration
      if (JSON.stringify(updatedConfig) !== JSON.stringify(accessConfig)) {
        setAccessConfig(updatedConfig);
        
        toast({
          title: 'Routes mises à jour',
          description: 'Nouvelles routes détectées et ajoutées à la configuration des accès',
        });
      } else {
        toast({
          title: 'Scan terminé',
          description: 'Aucune nouvelle route détectée',
        });
      }
    } catch (error) {
      console.error('Erreur lors du scan des routes:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de scanner les routes de l\'application',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [accessConfig, syncRoutesWithAccessConfig, toast]);

  // Obtenir les routes accessibles pour un rôle spécifique
  const getRoutesForRole = useCallback((role: UserRole): RouteWithAccess[] => {
    const routes: RouteWithAccess[] = [];
    
    Object.entries(accessConfig.routes).forEach(([path, permissions]) => {
      if (permissions.isPublic || permissions.allowedRoles.includes(role)) {
        routes.push({
          ...getRouteMetadata(path),
          path,
          permissions
        });
      }
    });
    
    return routes;
  }, [accessConfig.routes]);

  // Obtenir les routes publiques
  const getPublicRoutes = useCallback((): RouteWithAccess[] => {
    const routes: RouteWithAccess[] = [];
    
    Object.entries(accessConfig.routes).forEach(([path, permissions]) => {
      if (permissions.isPublic) {
        routes.push({
          ...getRouteMetadata(path),
          path,
          permissions
        });
      }
    });
    
    return routes;
  }, [accessConfig.routes]);

  // Obtenir les routes admin accessibles pour un rôle spécifique
  const getAdminRoutesForRole = useCallback((role: UserRole): RouteWithAccess[] => {
    const routes: RouteWithAccess[] = [];
    
    Object.entries(accessConfig.adminRoutes).forEach(([path, permissions]) => {
      if (permissions.isPublic || permissions.allowedRoles.includes(role)) {
        routes.push({
          ...getRouteMetadata(`/admin/${path}`),
          path: `/admin/${path}`,
          permissions
        });
      }
    });
    
    return routes;
  }, [accessConfig.adminRoutes]);

  const value: PermissionsContextType = {
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
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions doit être utilisé à l\'intérieur d\'un PermissionsProvider');
  }
  return context;
};
