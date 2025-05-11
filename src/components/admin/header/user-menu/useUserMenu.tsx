
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveUserMenu, getHeaderConfig } from '@/services/supabase/headerService';
import { UserMenuSettings } from '../types';

export interface UseUserMenuReturn {
  userMenuSettings: UserMenuSettings;
  updateSetting: <K extends keyof UserMenuSettings>(key: K, value: UserMenuSettings[K]) => void;
  saveSettings: () => Promise<boolean>;
  isLoading: boolean;
}

export const useUserMenu = (): UseUserMenuReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // État des paramètres de l'espace membre
  const [userMenuSettings, setUserMenuSettings] = useState<UserMenuSettings>({
    showLoginButton: true,
    showRegisterButton: true,
    showProfileIcon: true,
    loginButtonLabel: 'Connexion',
    registerButtonLabel: 'Inscription'
  });

  // Charger les paramètres depuis la base de données
  useEffect(() => {
    const loadUserMenu = async () => {
      try {
        setIsLoading(true);
        const config = await getHeaderConfig();
        if (config.userMenu) {
          setUserMenuSettings(config.userMenu);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du menu utilisateur:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les paramètres du menu utilisateur",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserMenu();
  }, [toast]);

  // Mettre à jour un paramètre spécifique
  const updateSetting = <K extends keyof UserMenuSettings>(key: K, value: UserMenuSettings[K]) => {
    setUserMenuSettings({
      ...userMenuSettings,
      [key]: value
    });
  };

  // Sauvegarder les paramètres
  const saveSettings = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Make sure we have non-empty values for required fields
      const settings = {
        ...userMenuSettings,
        loginButtonLabel: userMenuSettings.loginButtonLabel || 'Connexion',
        registerButtonLabel: userMenuSettings.registerButtonLabel || 'Inscription'
      };
      
      const success = await saveUserMenu(settings);
      
      if (success) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Paramètres du menu utilisateur mis à jour"
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
    userMenuSettings,
    updateSetting,
    saveSettings,
    isLoading
  };
};
