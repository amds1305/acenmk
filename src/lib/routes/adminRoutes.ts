
import { RouteMetadata } from './types';

// Admin route definitions
export const adminRouteMetadata: Record<string, RouteMetadata> = {
  '/admin': {
    path: '/admin',
    title: 'Administration',
    description: 'Tableau de bord d\'administration',
    icon: 'layout-dashboard',
    showInNav: false,
    order: 500,
    category: 'admin'
  },
  '/admin/home': {
    path: '/admin/home',
    title: 'Page d\'accueil',
    description: 'Gestion de la page d\'accueil',
    icon: 'layout',
    parentPath: '/admin',
    showInNav: true,
    order: 510,
    category: 'admin'
  },
  '/admin/hero': {
    path: '/admin/hero',
    title: 'Section Hero',
    description: 'Édition de la section hero',
    icon: 'flag',
    parentPath: '/admin',
    showInNav: true,
    order: 511,
    category: 'admin'
  },
  '/admin/services': {
    path: '/admin/services',
    title: 'Services',
    description: 'Gestion des services',
    icon: 'settings',
    parentPath: '/admin',
    showInNav: true,
    order: 520,
    category: 'admin'
  },
  '/admin/about': {
    path: '/admin/about',
    title: 'À propos',
    description: 'Édition de la section à propos',
    icon: 'info',
    parentPath: '/admin',
    showInNav: true,
    order: 521,
    category: 'admin'
  },
  '/admin/roles': {
    path: '/admin/roles',
    title: 'Rôles et Permissions',
    description: 'Gestion des rôles et permissions',
    icon: 'shield',
    parentPath: '/admin',
    showInNav: true,
    order: 600,
    category: 'admin'
  },
  '/admin/external-links': {
    path: '/admin/external-links',
    title: 'Liens Externes',
    description: 'Gestion des liens vers des applications externes',
    icon: 'external-link',
    parentPath: '/admin',
    showInNav: true,
    order: 530,
    category: 'admin'
  },
  '/admin/trusted-clients': {
    path: '/admin/trusted-clients',
    title: 'Logos clients',
    description: 'Gestion des logos de clients de confiance',
    icon: 'users',
    parentPath: '/admin',
    showInNav: true,
    order: 525,
    category: 'admin'
  },
  '/admin/ace-job': {
    path: '/admin/ace-job',
    title: 'AceJob',
    description: 'Gestion du module de recrutement AceJob',
    icon: 'graduation-cap',
    parentPath: '/admin',
    showInNav: true,
    order: 522,
    category: 'admin'
  }
};
