
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthError } from '@supabase/supabase-js';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log("Login attempt with:", email);
      
      // Option temporaire pour connexion avec admin@example.com/password pour les tests
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: 'Connexion réussie (mode test)',
          description: 'Bienvenue sur votre espace client.',
        });
        
        // Simuler une session admin
        localStorage.setItem('adminTestMode', 'true');
        localStorage.setItem('adminTestEmail', email);
        localStorage.setItem('adminTestRole', 'admin');
        
        return { success: true, data: { user: { email } } };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        handleLoginError(error);
        throw error;
      }
      
      console.log("Login successful:", data);
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur votre espace client.',
      });
      
      return { success: true, data };
    } catch (error) {
      console.error("Login exception:", error);
      return handleLoginException(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (error: AuthError) => {
    if (error.message === 'Email not confirmed') {
      toast({
        variant: 'destructive',
        title: 'Email non confirmé',
        description: 'Veuillez vérifier votre boîte mail et confirmer votre adresse email.'
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: error.message
      });
    }
  };

  const handleLoginException = (error: AuthError) => {
    const errorMessage = error.message === 'Email not confirmed'
      ? 'Email non confirmé. Veuillez vérifier votre boîte mail.'
      : error.message || 'Identifiants invalides';
    
    return { success: false, error: new Error(errorMessage) };
  };

  return {
    login,
    isLoading
  };
};
