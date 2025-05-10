
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useProfile = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  const updateProfile = async (data: Partial<User>) => {
    try {
      // Vérifier si un avatar_url est inclus dans les données
      // et s'assurer qu'il est correctement formaté pour Supabase
      const updateData = { ...data };
      
      // Supprimer l'avatar du payload car nous le stockons dans avatar_url
      if ('avatar' in updateData) {
        updateData.avatar_url = updateData.avatar;
        delete updateData.avatar;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
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
      setIsUploading(true);
      
      // Assurer que le bucket avatars existe
      await ensureStorageBucket('avatars');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
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
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  // Fonction utilitaire pour créer un bucket s'il n'existe pas
  const ensureStorageBucket = async (name: string) => {
    try {
      // Vérifier si le bucket existe déjà
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === name);
      
      if (!bucketExists) {
        // Créer le bucket s'il n'existe pas
        await supabase.storage.createBucket(name, { public: true });
        console.log(`Bucket de stockage "${name}" créé avec succès.`);
      }
    } catch (error) {
      console.error(`Erreur lors de la vérification/création du bucket "${name}":`, error);
    }
  };

  return {
    updateProfile,
    uploadAvatar,
    isUploading
  };
};
