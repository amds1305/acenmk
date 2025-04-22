
import { useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from './auth/useAuthentication';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { toast } = useToast();
  const authService = useAuthentication();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        if (session?.user) {
          try {
            // Récupérer les données utilisateur après authentification
            const { data: userData, error: userError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (userError) throw userError;
            
            // Créer un objet utilisateur combiné avec les données de l'authentification et du profil
            const combinedUser: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: userData?.name || session.user.email?.split('@')[0] || 'Utilisateur',
              role: userData?.role || 'user',
              avatar: userData?.avatar || '/placeholder.svg',
              createdAt: session.user.created_at || new Date().toISOString(),
              // Ajouter d'autres champs si nécessaires
            };
            
            setUser(combinedUser);
            setIsAuthenticated(true);
            setIsAdmin(combinedUser.role === 'admin' || combinedUser.role === 'super_admin');
          } catch (err) {
            console.error("Erreur lors de la récupération du profil:", err);
            // Même en cas d'erreur, on considère l'utilisateur comme authentifié
            const basicUser: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.email?.split('@')[0] || 'Utilisateur',
              role: 'user',
              avatar: '/placeholder.svg',
              createdAt: session.user.created_at || new Date().toISOString(),
            };
            setUser(basicUser);
            setIsAuthenticated(true);
            setIsAdmin(false);
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
    setError(null);
    
    try {
      console.log("Tentative de connexion avec:", email);
      const { error } = await authService.login(email, password);
      
      if (error) throw error;
      
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur votre espace client.',
      });
      
      // Ne pas définir l'utilisateur ici, il sera défini par onAuthStateChange
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Identifiants invalides';
      toast({
        variant: 'destructive',
        title: 'Échec de la connexion',
        description: errorMessage,
      });
      setError(err instanceof Error ? err : new Error(errorMessage));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Tentative d'inscription avec:", email);
      await authService.register(name, email, password, company, phone);
      
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès.',
      });
      
      // Ne pas définir l'utilisateur ici, il sera défini par onAuthStateChange
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription";
      toast({
        variant: 'destructive',
        title: "Échec de l'inscription",
        description: errorMessage,
      });
      setError(err instanceof Error ? err : new Error(errorMessage));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      // Ne pas définir l'utilisateur ici, il sera défini par onAuthStateChange
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      return Promise.reject(error);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    // This would typically call an API to update the user's profile
    return Promise.resolve();
  };

  const uploadAvatar = async (file: File) => {
    // This would typically call an API to upload the avatar
    return Promise.resolve('/placeholder.svg');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // This would typically call an API to update the password
    return Promise.resolve();
  };

  const toggleTwoFactor = async (enable: boolean) => {
    // This would typically call an API to toggle two-factor authentication
    return Promise.resolve();
  };

  const updatePreferences = async (preferences: any) => {
    // This would typically call an API to update the user's preferences
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
