
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
        throw error;
      }
      
      console.log("Login successful:", data.session);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace.",
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Login exception:", error);
      const errorMessage = error instanceof Error ? error.message : 'Identifiants invalides';
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: errorMessage,
      });
      return Promise.reject(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            phone
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès."
      });
      
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: errorMessage,
      });
      return Promise.reject(new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    login,
    logout,
    register,
    isLoading
  };
};
