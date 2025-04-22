
import { useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuthentication } from './auth/useAuthentication';
import { useProfile } from './auth/useProfile';
import { useMessages } from './auth/useMessages';
import { useSecuritySettings } from './auth/useSecuritySettings';

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

  useEffect(() => {
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
          setIsAdmin(basicUser.role === 'admin' || basicUser.role === 'super_admin');

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
                setIsAdmin(updatedUser.role === 'admin' || updatedUser.role === 'super_admin');
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

  return {
    user,
    isLoading: loading,
    login: authService.login,
    logout: authService.logout,
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
