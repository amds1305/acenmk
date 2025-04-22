
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
      
      console.log("Login successful:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Login exception:", error);
      const errorMessage = error instanceof Error ? error.message : 'Identifiants invalides';
      return { success: false, error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    try {
      console.log("Register attempt with:", email);
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
      
      console.log("Registration successful:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
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
