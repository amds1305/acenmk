
import { RouteMetadata } from '@/types/permissions';

// Définition des métadonnées pour chaque route
const routeMetadataMap: Record<string, RouteMetadata> = {
  '/': {
    path: '/',
    title: 'Accueil',
    description: 'Page d\'accueil du site',
    icon: 'home'
  },
  '/login': {
    path: '/login',
    title: 'Connexion',
    description: 'Page de connexion',
    icon: 'log-in'
  },
  '/register': {
    path: '/register',
    title: 'Inscription',
    description: 'Page d\'inscription',
    icon: 'user-plus'
  },
  '/profile': {
    path: '/profile',
    title: 'Profil',
    description: 'Profil utilisateur',
    icon: 'user'
  },
  '/blog': {
    path: '/blog',
    title: 'Blog',
    description: 'Articles de blog',
    icon: 'file-text'
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ',
    description: 'Foire aux questions',
    icon: 'help-circle'
  },
  '/estimation': {
    path: '/estimation',
    title: 'Estimation',
    description: 'Estimation de projet',
    icon: 'calculator'
  },
  '/portfolio': {
    path: '/portfolio',
    title: 'Portfolio',
    description: 'Nos réalisations',
    icon: 'image'
  },
  '/careers': {
    path: '/careers',
    title: 'Carrières',
    description: 'Offres d\'emploi',
    icon: 'briefcase'
  },
  '/admin': {
    path: '/admin',
    title: 'Administration',
    description: 'Tableau de bord d\'administration',
    icon: 'layout-dashboard'
  },
  '/admin/home': {
    path: '/admin/home',
    title: 'Page d\'accueil',
    description: 'Gestion de la page d\'accueil',
    icon: 'layout',
    parentPath: '/admin'
  },
  '/admin/hero': {
    path: '/admin/hero',
    title: 'Section Hero',
    description: 'Édition de la section hero',
    icon: 'flag',
    parentPath: '/admin'
  },
  '/admin/services': {
    path: '/admin/services',
    title: 'Services',
    description: 'Gestion des services',
    icon: 'settings',
    parentPath: '/admin'
  },
  '/admin/about': {
    path: '/admin/about',
    title: 'À propos',
    description: 'Édition de la section à propos',
    icon: 'info',
    parentPath: '/admin'
  }
  // ...autres routes
};

/**
 * Récupère les métadonnées d'une route
 * @param path Chemin de la route
 * @returns Métadonnées de la route
 */
export const getRouteMetadata = (path: string): RouteMetadata => {
  return routeMetadataMap[path] || {
    path,
    title: path.split('/').filter(Boolean).join(' > '),
    icon: path.startsWith('/admin') ? 'settings' : 'file'
  };
};
