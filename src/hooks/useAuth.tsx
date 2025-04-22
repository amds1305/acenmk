
import { useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from './auth/useAuthentication';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { toast } = useToast();
  const authService = useAuthentication();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        
        if (session?.user) {
          try {
            // Créer un objet utilisateur de base avec les données de l'authentification
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
            setIsAdmin(basicUser.role === 'admin' || basicUser.role === 'super_admin');

            // Utiliser setTimeout pour éviter les deadlocks potentiels
            setTimeout(async () => {
              try {
                // Récupérer plus de données utilisateur si nécessaire
                const { data: userData, error: userError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();
                  
                if (!userError && userData) {
                  // Mettre à jour avec les données du profil
                  const updatedUser: User = {
                    ...basicUser,
                    name: userData.name || basicUser.name,
                    role: userData.role || basicUser.role,
                    avatar: userData.avatar || basicUser.avatar,
                    company: userData.company,
                    phone: userData.phone,
                  };
                  
                  setUser(updatedUser);
                  setIsAdmin(updatedUser.role === 'admin' || updatedUser.role === 'super_admin');
                }
              } catch (err) {
                console.error("Erreur lors de la récupération du profil:", err);
                // L'utilisateur reste authentifié même si on ne peut pas récupérer son profil
              }
            }, 0);
          } catch (err) {
            console.error("Erreur initiale:", err);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session);
      if (!session) {
        setLoading(false);
      }
      // Le reste est géré par onAuthStateChange
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      console.log("Tentative de connexion avec:", email);
      const { success, error, data } = await authService.login(email, password);
      
      if (!success) throw error;
      
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur votre espace client.',
      });
      
      return Promise.resolve();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Identifiants invalides';
      toast({
        variant: 'destructive',
        title: 'Échec de la connexion',
        description: errorMessage,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setLoading(true);
    
    try {
      console.log("Tentative d'inscription avec:", email);
      const { success, error } = await authService.register(name, email, password, company, phone);
      
      if (!success) throw error;
      
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès.',
      });
      
      return Promise.resolve();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription";
      toast({
        variant: 'destructive',
        title: "Échec de l'inscription",
        description: errorMessage,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      return Promise.reject(error);
    }
  };

  // Autres fonctions...
  const updateProfile = async (data: Partial<User>) => {
    return Promise.resolve();
  };

  const uploadAvatar = async (file: File) => {
    return Promise.resolve('/placeholder.svg');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    return Promise.resolve();
  };

  const toggleTwoFactor = async (enable: boolean) => {
    return Promise.resolve();
  };

  const updatePreferences = async (preferences: any) => {
    return Promise.resolve();
  };

  return {
    user,
    isLoading: loading,
    login,
    logout,
    register,
    updateProfile,
    uploadAvatar,
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isAuthenticated,
    isAdmin,
    messages,
    unreadMessages,
  };
};
