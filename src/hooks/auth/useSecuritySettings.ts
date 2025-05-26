
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useSecuritySettings = () => {
  const { toast } = useToast();

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été modifié avec succès.',
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la modification du mot de passe.',
      });
      return Promise.reject(error);
    }
  };

  const toggleTwoFactor = async (enable: boolean) => {
    try {
      // TODO: Implémenter la 2FA avec Supabase
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la modification de la 2FA:", error);
      return Promise.reject(error);
    }
  };

  return {
    updatePassword,
    toggleTwoFactor,
  };
};
