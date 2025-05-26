
import { useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from './auth/useAuthentication';
import { useProfile } from './auth/useProfile';
import { useMessages } from './auth/useMessages';
import { useSecuritySettings } from './auth/useSecuritySettings';
import { isAdminRole } from '@/utils/roleUtils';

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
    messages: messageService.messages,
    unreadMessages: messageService.unreadMessages,
  };
};
