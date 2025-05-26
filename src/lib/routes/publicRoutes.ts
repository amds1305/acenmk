
import { RouteMetadata } from './types';

// Public route definitions
export const publicRouteMetadata: Record<string, RouteMetadata> = {
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
  }
};

// Add user routes that require authentication
export const userRouteMetadata: Record<string, RouteMetadata> = {
  '/profile': {
    path: '/profile',
    title: 'Profil',
    description: 'Profil utilisateur',
    icon: 'user',
    showInNav: true,
    order: 200,
    category: 'user'
  }
};
