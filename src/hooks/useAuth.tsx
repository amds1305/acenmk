
import { useState, useEffect } from 'react';
import { User, AuthContextType, UserRole, Message, Project, Estimate } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from './auth/useAuthentication';
import { useProfile } from './auth/useProfile';
import { useMessages } from './auth/useMessages';
import { useSecuritySettings } from './auth/useSecuritySettings';
import { isAdminRole } from '@/utils/roleUtils';

// Données de test pour les projets
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Site vitrine E-commerce',
    description: 'Création d\'un site e-commerce pour la vente de produits artisanaux',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Application mobile iOS',
    description: 'Développement d\'une application mobile pour la gestion de tâches',
    date: '2024-03-10',
    status: 'in-progress'
  },
  {
    id: '3',
    name: 'Refonte graphique',
    description: 'Refonte complète de l\'identité visuelle et des supports de communication',
    date: '2024-04-05',
    status: 'pending'
  }
];

// Données de test pour les devis
const mockEstimates: Estimate[] = [
  {
    id: '1',
    title: 'Site vitrine E-commerce',
    description: 'Création d\'un site e-commerce incluant catalogue produits et système de paiement',
    amount: 3500,
    createdAt: '2024-01-05',
    status: 'accepted'
  },
  {
    id: '2',
    title: 'Application mobile iOS',
    description: 'Développement d\'une application mobile pour la gestion de tâches',
    amount: 5200,
    createdAt: '2024-02-28',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Refonte graphique',
    description: 'Refonte complète de l\'identité visuelle et des supports de communication',
    amount: 1800,
    createdAt: '2024-03-20',
    status: 'rejected'
  }
];

// Données de test pour les messages
const mockMessages: Message[] = [
  {
    id: '1',
    subject: 'Validation de votre devis',
    content: 'Nous avons le plaisir de vous informer que votre devis a été validé. Nous allons pouvoir commencer le travail dès réception de l\'acompte.',
    sender: 'Service commercial',
    date: '2024-04-01',
    read: false
  },
  {
    id: '2',
    subject: 'Mise à jour de votre projet',
    content: 'Bonjour, nous venons de terminer la première phase de développement. Vous pouvez consulter l\'avancement sur votre espace projet.',
    sender: 'Chef de projet',
    date: '2024-03-25',
    read: true
  },
  {
    id: '3',
    subject: 'Réunion de suivi',
    content: 'Nous vous proposons une réunion de suivi ce vendredi à 14h pour faire le point sur l\'avancement de votre projet. Merci de nous confirmer votre disponibilité.',
    sender: 'Marie Dupont',
    date: '2024-03-28',
    read: false
  },
  {
    id: '4',
    subject: 'Facture en attente',
    content: 'Nous vous rappelons que la facture n°F20240315 est en attente de règlement. Merci de procéder au paiement dans les meilleurs délais.',
    sender: 'Service comptabilité',
    date: '2024-03-30',
    read: true
  }
];

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Import des hooks personnalisés
  const authService = useAuthentication();
  const profileService = useProfile();
  const messageService = useMessages();
  const securityService = useSecuritySettings();

  // Vérifier le mode admin de test
  useEffect(() => {
    const isTestAdmin = localStorage.getItem('adminTestMode') === 'true';
    const testRole = localStorage.getItem('adminTestRole') as UserRole || 'user';
    
    console.log("Checking admin test mode:", { isTestAdmin, testRole });
    
    if (isTestAdmin) {
      console.log("Admin test mode active, setting user state");
      const isAdminUser = isAdminRole(testRole);
      setIsAdmin(isAdminUser);
      setIsAuthenticated(true);
      setLoading(false);
      
      const testEmail = localStorage.getItem('adminTestEmail') || 'admin@example.com';
      const testUser: User = {
        id: 'test-admin-id',
        email: testEmail,
        name: 'Administrateur Test',
        role: testRole,
        avatar: '/placeholder.svg',
        createdAt: new Date().toISOString(),
        projects: mockProjects,
        estimates: mockEstimates
      };
      setUser(testUser);
    }
  }, []);

  useEffect(() => {
    // Ne pas exécuter cette logique si nous sommes en mode test admin
    if (localStorage.getItem('adminTestMode') === 'true') {
      console.log("Admin test mode active, skipping Supabase auth");
      return;
    }

    console.log("Setting up regular Supabase auth listener");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        
        if (session?.user) {
          const basicUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Utilisateur',
            role: session.user.user_metadata?.role || 'user',
            avatar: session.user.user_metadata?.avatar || '/placeholder.svg',
            createdAt: session.user.created_at || new Date().toISOString(),
            projects: mockProjects,
            estimates: mockEstimates
          };
          
          setUser(basicUser);
          setIsAuthenticated(true);
          setIsAdmin(isAdminRole(basicUser.role));

          setTimeout(async () => {
            try {
              const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (!userError && userData) {
                const updatedUser: User = {
                  ...basicUser,
                  name: userData.name || basicUser.name,
                  role: userData.role || basicUser.role,
                  avatar: userData.avatar || basicUser.avatar,
                  company: userData.company,
                  phone: userData.phone,
                  projects: mockProjects,
                  estimates: mockEstimates
                };
                
                setUser(updatedUser);
                setIsAdmin(isAdminRole(updatedUser.role));
              }
              
              // Vérifier également la table user_roles pour les rôles spécifiques
              const { data: userRoles, error: rolesError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1);
                
              if (!rolesError && userRoles && userRoles.length > 0) {
                const latestRole = userRoles[0].role as UserRole;
                const hasAdminRole = isAdminRole(latestRole);
                
                // Mettre à jour l'utilisateur avec le rôle le plus récent
                setUser(prev => prev ? { ...prev, role: latestRole } : prev);
                if (hasAdminRole) setIsAdmin(true);
              }
            } catch (err) {
              console.error("Erreur lors de la récupération du profil:", err);
            }
          }, 0);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    // Si nous sommes en mode test admin, nettoyer les données locales
    if (localStorage.getItem('adminTestMode') === 'true') {
      console.log("Logging out from admin test mode");
      localStorage.removeItem('adminTestMode');
      localStorage.removeItem('adminTestEmail');
      localStorage.removeItem('adminTestRole');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous êtes maintenant déconnecté du mode test.',
      });
      return { success: true };
    }
    
    // Sinon, utiliser la déconnexion Supabase normale
    return authService.logout();
  };

  return {
    user,
    isLoading: loading,
    login: authService.login,
    logout: logout,
    register: authService.register,
    updateProfile: profileService.updateProfile,
    uploadAvatar: profileService.uploadAvatar,
    updatePassword: securityService.updatePassword,
    toggleTwoFactor: securityService.toggleTwoFactor,
    isAuthenticated,
    isAdmin,
    messages: mockMessages,
    unreadMessages: mockMessages.filter(msg => !msg.read).length,
  };
};
