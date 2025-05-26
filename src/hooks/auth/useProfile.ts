
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useProfile = () => {
  const { toast } = useToast();
  
  const updateProfile = async (data: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', data.id);
        
      if (error) throw error;
      
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès.',
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour de votre profil.',
      });
      return Promise.reject(error);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error("Erreur lors de l'upload de l'avatar:", error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: "Une erreur est survenue lors de l'upload de votre avatar.",
      });
      return '/placeholder.svg';
    }
  };

  return {
    updateProfile,
    uploadAvatar,
  };
};
