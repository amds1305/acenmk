
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { User, UserPreferences } from '@/types/auth';

export const useProfile = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);

    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          company: data.company,
          phone: data.phone,
          biography: data.biography,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      if (data.role && data.role !== user.role) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: data.role })
          .eq('user_id', user.id);
          
        if (roleError) throw roleError;
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès."
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La mise à jour du profil a échoué."
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    setIsLoading(true);
    
    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const avatarUrl = data.publicUrl;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été modifiée avec succès."
      });
      
      return Promise.resolve(avatarUrl);
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le téléchargement de l'avatar a échoué."
      });
      return Promise.reject("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    uploadAvatar,
    isLoading
  };
};
