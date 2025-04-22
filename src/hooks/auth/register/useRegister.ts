
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { AuthError } from '@supabase/supabase-js';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    company?: string, 
    phone?: string
  ) => {
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
          },
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      handleSuccessfulRegistration(data);
      return { success: true, data };
    } catch (error) {
      console.error("Registration error:", error);
      return handleRegistrationError(error as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulRegistration = (data: any) => {
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
  };

  const handleRegistrationError = (error: AuthError) => {
    const errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
    
    toast({
      variant: 'destructive',
      title: "Échec de l'inscription",
      description: errorMessage,
    });
    
    return { success: false, error: new Error(errorMessage) };
  };

  return {
    register,
    isLoading
  };
};
