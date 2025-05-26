
import { RouteMetadata, RouteMetadataMap } from './types';
import { publicRouteMetadata, userRouteMetadata } from './publicRoutes';
import { adminRouteMetadata } from './adminRoutes';

// Combine all route metadata into one map
const routeMetadataMap: RouteMetadataMap = {
  ...publicRouteMetadata,
  ...userRouteMetadata,
  ...adminRouteMetadata
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
