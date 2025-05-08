import { RouteMetadata } from '@/types/permissions';

// Définition des métadonnées pour chaque route
const routeMetadataMap: Record<string, RouteMetadata> = {
  '/': {
    path: '/',
    title: 'Accueil',
    description: 'Page d\'accueil du site',
    icon: 'home',
    showInNav: true,
    order: 0,
    category: 'public'
  },
  '/login': {
    path: '/login',
    title: 'Connexion',
    description: 'Page de connexion',
    icon: 'log-in',
    showInNav: true,
    order: 100,
    category: 'auth'
  },
  '/register': {
    path: '/register',
    title: 'Inscription',
    description: 'Page d\'inscription',
    icon: 'user-plus',
    showInNav: true,
    order: 101,
    category: 'auth'
  },
  '/profile': {
    path: '/profile',
    title: 'Profil',
    description: 'Profil utilisateur',
    icon: 'user',
    showInNav: true,
    order: 200,
    category: 'user'
  },
  '/blog': {
    path: '/blog',
    title: 'Blog',
    description: 'Articles de blog',
    icon: 'file-text',
    showInNav: true,
    order: 40,
    category: 'content'
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ',
    description: 'Foire aux questions',
    icon: 'help-circle',
    showInNav: true,
    order: 50,
    category: 'content'
  },
  '/estimation': {
    path: '/estimation',
    title: 'Estimation',
    description: 'Estimation de projet',
    icon: 'calculator',
    showInNav: true,
    order: 30,
    category: 'services'
  },
  '/portfolio': {
    path: '/portfolio',
    title: 'Portfolio',
    description: 'Nos réalisations',
    icon: 'image',
    showInNav: true,
    order: 20,
    category: 'content'
  },
  '/careers': {
    path: '/careers',
    title: 'Carrières',
    description: 'Offres d\'emploi',
    icon: 'briefcase',
    showInNav: true,
    order: 60,
    category: 'services'
  },
  '/ace-job': {
    path: '/ace-job',
    title: 'AceJob',
    description: 'Services de CV et candidatures',
    icon: 'file-text',
    showInNav: true,
    order: 25,
    category: 'services'
  },
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
  }
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
    icon: path.startsWith('/admin') ? 'settings' : 'file',
    category: path.startsWith('/admin') ? 'admin' : 'content',
    order: 1000
  };
};

/**
 * Ajoute les métadonnées pour une nouvelle route
 */
export const addRouteMetadata = (path: string, metadata: Partial<RouteMetadata>): void => {
  routeMetadataMap[path] = {
    path,
    title: metadata.title || path.split('/').filter(Boolean).join(' > '),
    description: metadata.description || '',
    icon: metadata.icon || (path.startsWith('/admin') ? 'settings' : 'file'),
    parentPath: metadata.parentPath,
    showInNav: metadata.showInNav ?? true,
    order: metadata.order || 1000,
    category: metadata.category || (path.startsWith('/admin') ? 'admin' : 'content')
  };
};

/**
 * Récupère toutes les routes enregistrées
 */
export const getAllRoutes = (): RouteMetadata[] => {
  return Object.values(routeMetadataMap);
};

/**
 * Extrait tous les chemins utilisés dans une application React Router
 * à partir du composant App
 */
export const extractAppRoutes = (): string[] => {
  try {
    // Cette fonction sera implémentée dans un autre fichier pour scanner l'app
    // Pour l'instant, nous retournons les clés de routeMetadataMap
    return Object.keys(routeMetadataMap);
  } catch (error) {
    console.error("Erreur lors de l'extraction des routes:", error);
    return Object.keys(routeMetadataMap);
  }
};
