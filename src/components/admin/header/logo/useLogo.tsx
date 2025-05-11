
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '../types';
import { supabase } from '@/lib/supabase';
import { saveHeaderLogo, getHeaderConfig } from '@/services/supabase/headerService';
import { v4 as uuidv4 } from 'uuid';

export const useLogo = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logo, setLogo] = useState<Logo>({
    src: '',
    alt: '',
    width: 0,
    height: 0,
    position: 'left'
  });

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    setIsLoading(true);
    try {
      const headerConfig = await getHeaderConfig();
      
      if (headerConfig.headerLogo) {
        setLogo({
          src: headerConfig.headerLogo.src || '',
          alt: headerConfig.headerLogo.alt || '',
          width: headerConfig.headerLogo.width || 0,
          height: headerConfig.headerLogo.height || 0,
          position: headerConfig.headerLogo.position || 'left'
        });
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données du logo',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLogoProperty = <K extends keyof Logo>(property: K, value: Logo[K]) => {
    setLogo(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      if (data) {
        setLogo(prev => ({
          ...prev,
          src: data.publicUrl
        }));

        toast({
          title: 'Succès',
          description: 'Le logo a été téléchargé avec succès',
        });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger le logo',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveLogoChanges = async () => {
    setIsLoading(true);
    try {
      // Make sure we have the required properties with default values if they're missing
      const logoToSave = {
        src: logo.src,
        alt: logo.alt || '',
        width: logo.width || 0,
        height: logo.height || 0,
        position: logo.position || 'left'
      };
      
      const success = await saveHeaderLogo(logoToSave);
      
      if (success) {
        toast({
          title: 'Succès',
          description: 'Les modifications du logo ont été enregistrées',
        });
      } else {
        throw new Error('Failed to save logo');
      }
    } catch (error) {
      console.error('Error saving logo:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'enregistrer les modifications du logo',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logo,
    isLoading,
    handleFileChange,
    updateLogoProperty,
    saveLogoChanges
  };
};
