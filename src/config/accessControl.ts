
import { AccessControlConfig } from '@/types/permissions';
import { UserRole } from '@/types/auth';

// Configuration par défaut des contrôles d'accès
export const DEFAULT_ACCESS_CONFIG: AccessControlConfig = {
  routes: {
    // Routes publiques par défaut
    '/': { isPublic: true, allowedRoles: [] },
    '/login': { isPublic: true, allowedRoles: [] },
    '/register': { isPublic: true, allowedRoles: [] },
    '/blog': { isPublic: true, allowedRoles: [] },
    '/faq': { isPublic: true, allowedRoles: [] },
    '/ace-job': { isPublic: true, allowedRoles: [] },
    '/careers': { isPublic: true, allowedRoles: [] },
    '/portfolio': { isPublic: true, allowedRoles: [] },
    '/estimation': { isPublic: true, allowedRoles: [] },

    // Routes privées nécessitant une connexion
    '/profile': { 
      isPublic: false, 
      allowedRoles: ['user', 'client_standard', 'client_premium', 'external_provider', 'contributor', 'manager', 'business_admin', 'admin', 'super_admin'], 
      description: 'Profil utilisateur' 
    }
  },
  
  adminRoutes: {
    // Route admin de base - restreinte aux administrateurs
    '': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Tableau de bord administrateur' 
    },
    
    // Routes d'administration spécifiques
    'home': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Gestion de la page d\'accueil' 
    },
    'hero': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Édition de la section Hero' 
    },
    'services': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion des services' 
    },
    'pricing': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Configuration des tarifs' 
    },
    'about': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Édition de la section À propos' 
    },
    'team': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion des membres de l\'équipe' 
    },
    'testimonials': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion des témoignages' 
    },
    'faq': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion de la FAQ' 
    },
    'blog': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion du blog' 
    },
    'careers': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'manager'], 
      description: 'Gestion des offres d\'emploi' 
    },
    'appointments': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'manager'], 
      description: 'Gestion des rendez-vous' 
    },
    'trusted-clients': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin', 'contributor'], 
      description: 'Gestion des clients de confiance' 
    },
    'header': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Configuration de l\'en-tête' 
    },
    'footer': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Configuration du pied de page' 
    },
    'users': { 
      isPublic: false, 
      allowedRoles: ['admin', 'super_admin', 'business_admin'], 
      description: 'Gestion des utilisateurs' 
    },
    'roles': { 
      isPublic: false, 
      allowedRoles: ['super_admin', 'admin'], 
      description: 'Gestion des rôles et permissions' 
    }
  }
};
