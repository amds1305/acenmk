
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveSearchBar, getHeaderConfig } from '@/services/supabase/headerService';
import { SearchBarSettings } from '../types';

export interface UseSearchBarReturn {
  searchSettings: SearchBarSettings;
  updateSetting: <K extends keyof SearchBarSettings>(key: K, value: SearchBarSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  isLoading: boolean;
}

export const useSearchBar = (): UseSearchBarReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // État des paramètres de la barre de recherche
  const [searchSettings, setSearchSettings] = useState<SearchBarSettings>({
    isEnabled: true,
    placeholder: 'Rechercher...',
    position: 'right',
    expandOnFocus: true
  });

  // Charger les paramètres depuis la base de données
  useEffect(() => {
    const loadSearchBar = async () => {
      try {
        setIsLoading(true);
        const config = await getHeaderConfig();
        if (config.searchBar) {
          setSearchSettings(config.searchBar);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la barre de recherche:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les paramètres de la barre de recherche",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSearchBar();
  }, [toast]);

  // Mettre à jour un paramètre spécifique
  const updateSetting = <K extends keyof SearchBarSettings>(key: K, value: SearchBarSettings[K]) => {
    setSearchSettings({
      ...searchSettings,
      [key]: value
    });
  };

  // Sauvegarder les paramètres
  const saveSettings = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveSearchBar(searchSettings);
      
      if (success) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Paramètres de la barre de recherche mis à jour"
        });
        return true;
      } else {
        showSaveError();
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder les paramètres",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      showSaveError();
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchSettings,
    updateSetting,
    saveSettings,
    isLoading
  };
};
