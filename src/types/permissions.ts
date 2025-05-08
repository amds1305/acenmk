
import { UserRole } from './auth';

export interface PermissionRule {
  isPublic: boolean;
  allowedRoles: UserRole[];
  description?: string;
}

export type RoutePermissions = Record<string, PermissionRule>;

// Type pour la configuration des accès aux rubriques
export interface AccessControlConfig {
  routes: RoutePermissions;
  adminRoutes: RoutePermissions;
}

// Type pour les métadonnées d'une route
export interface RouteMetadata {
  path: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  parentPath?: string;
  showInNav?: boolean;
  order?: number;
}

// Types pour la configuration combinée
export interface RouteWithAccess extends RouteMetadata {
  permissions: PermissionRule;
}

// Interface pour le contexte des permissions
export interface PermissionsContextType {
  accessConfig: AccessControlConfig;
  isLoading: boolean;
  hasAccess: (route: string, userRole?: UserRole) => boolean;
  updateRouteAccess: (route: string, permissions: PermissionRule) => Promise<void>;
  savePermissions: () => Promise<void>;
  getRoutesForRole: (role: UserRole) => RouteWithAccess[];
  getPublicRoutes: () => RouteWithAccess[];
  getAdminRoutesForRole: (role: UserRole) => RouteWithAccess[];
  isRoutePublic: (route: string) => boolean;
}
