
import { UserRole } from '@/types/auth';

type RoleLevel = 'external' | 'internal';
type RoleCategory = 'visitor' | 'client' | 'provider' | 'staff' | 'admin';

export interface RoleInfo {
  name: string;
  description: string;
  level: RoleLevel;
  category: RoleCategory;
  permissions: string[];
  icon?: string;
  badgeColor: string;
}

export const roleInfoMap: Record<UserRole, RoleInfo> = {
  // External users (Level 1)
  'visitor': {
    name: 'Visiteur',
    description: 'Accès limité aux contenus publics',
    level: 'external',
    category: 'visitor',
    permissions: [],
    badgeColor: 'secondary'
  },
  'client_standard': {
    name: 'Client Standard',
    description: 'Accès de base après authentification',
    level: 'external',
    category: 'client',
    permissions: ['profile', 'projects.view', 'quotes.view'],
    badgeColor: 'secondary'
  },
  'client_premium': {
    name: 'Client Premium',
    description: 'Accès élargi : services exclusifs, outils d\'analyse, support prioritaire',
    level: 'external',
    category: 'client',
    permissions: ['profile', 'projects', 'quotes.view', 'analytics.basic'],
    badgeColor: 'orange'
  },
  'external_provider': {
    name: 'Prestataire Externe',
    description: 'Accès restreint aux informations et outils liés à ses livrables',
    level: 'external',
    category: 'provider',
    permissions: ['profile', 'projects.assigned', 'content.create'],
    badgeColor: 'blue'
  },
  
  // Internal users (Level 2)
  'contributor': {
    name: 'Contributeur',
    description: 'Création de contenus, interactions limitées avec les clients',
    level: 'internal',
    category: 'staff',
    permissions: ['profile', 'projects', 'content.create', 'content.edit'],
    badgeColor: 'green'
  },
  'manager': {
    name: 'Gestionnaire',
    description: 'Supervision de projets, clients et contributeurs',
    level: 'internal',
    category: 'staff',
    permissions: ['profile', 'projects.all', 'quotes', 'users.view'],
    badgeColor: 'purple'
  },
  'business_admin': {
    name: 'Administrateur Métier',
    description: 'Administration des offres, équipes et contenus',
    level: 'internal',
    category: 'admin',
    permissions: ['profile', 'projects.all', 'quotes.all', 'content.all', 'users.manage'],
    badgeColor: 'default'
  },
  'super_admin': {
    name: 'Super Administrateur',
    description: 'Autorité complète sur le système',
    level: 'internal',
    category: 'admin',
    permissions: ['*'],
    badgeColor: 'destructive'
  },
  
  // Legacy roles (for backward compatibility)
  'user': {
    name: 'Client',
    description: 'Utilisateur standard de la plateforme',
    level: 'external',
    category: 'client',
    permissions: ['profile', 'projects.view'],
    badgeColor: 'secondary'
  },
  'admin': {
    name: 'Administrateur',
    description: 'Administrateur de la plateforme',
    level: 'internal',
    category: 'admin',
    permissions: ['profile', 'admin'],
    badgeColor: 'default'
  }
};

export const getRoleInfo = (role: UserRole): RoleInfo => {
  return roleInfoMap[role] || roleInfoMap['user'];
};

export const getRoleBadgeVariant = (role: UserRole) => {
  return getRoleInfo(role).badgeColor;
};

export const getRoleLabel = (role: UserRole) => {
  return getRoleInfo(role).name;
};

export const getRoleDescription = (role: UserRole) => {
  return getRoleInfo(role).description;
};

export const isAdminRole = (role: UserRole) => {
  return ['admin', 'super_admin', 'business_admin'].includes(role);
};

export const isClientRole = (role: UserRole) => {
  return ['user', 'client_standard', 'client_premium'].includes(role);
};

export const isStaffRole = (role: UserRole) => {
  return ['contributor', 'manager'].includes(role);
};

export const getRolesByLevel = (level: RoleLevel): UserRole[] => {
  return Object.entries(roleInfoMap)
    .filter(([_, info]) => info.level === level)
    .map(([role]) => role as UserRole);
};

export const getRolesByCategory = (category: RoleCategory): UserRole[] => {
  return Object.entries(roleInfoMap)
    .filter(([_, info]) => info.category === category)
    .map(([role]) => role as UserRole);
};
