
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log("Login attempt with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        
        // Gérer l'erreur spécifique pour les emails non confirmés
        if (error.message === 'Email not confirmed') {
          toast({
            variant: 'destructive',
            title: 'Email non confirmé',
            description: 'Veuillez vérifier votre boîte mail et confirmer votre adresse email.'
          });
        }
        
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
      const errorMessage = error instanceof Error 
        ? error.message === 'Email not confirmed'
          ? 'Email non confirmé. Veuillez vérifier votre boîte mail.'
          : error.message
        : 'Identifiants invalides';
      
      return { success: false, error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    try {
      console.log("Register attempt with:", email);
      
      // Désactiver la confirmation d'email pour faciliter les tests
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            phone
          },
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      console.log("Registration successful:", data);
      
      // Informer l'utilisateur sur le statut de la confirmation par email
      if (data.user && !data.session) {
        toast({
          title: 'Inscription réussie',
          description: 'Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail.',
        });
      } else {
        toast({
          title: 'Inscription réussie',
          description: 'Votre compte a été créé avec succès.',
        });
      }
      
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      
      toast({
        variant: 'destructive',
        title: "Échec de l'inscription",
        description: errorMessage,
      });
      
      return { success: false, error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error };
    }
  };

  return {
    login,
    logout,
    register,
    isLoading
  };
};
