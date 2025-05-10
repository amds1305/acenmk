
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveHeaderStyle, getHeaderConfig } from '@/services/supabase/headerService';
import { HeaderStyle } from '../types';

export interface UseHeaderStyleReturn {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
  saveChanges: () => Promise<boolean>;
  isLoading: boolean;
}

export const useHeaderStyle = (): UseHeaderStyleReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // État initial des styles du header
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>({
    backgroundColor: 'transparent',
    textColor: '#333333',
    hoverColor: '#ca3c66',
    activeColor: '#ca3c66',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    padding: '1rem',
    sticky: true,
    transparent: true,
    glassmorphism: true,
    borderBottom: true,
    borderColor: '#e5e7eb',
    dropShadow: true,
    showThemeSelector: true,
    
    // Nouvelles propriétés avec des valeurs par défaut
    menuHoverBgColor: 'rgba(239, 246, 255, 0.15)',
    menuActiveBgColor: 'rgba(239, 246, 255, 0.1)',
    socialIconColor: '#6B7280',
    socialIconHoverColor: 'hsl(var(--primary))',
    socialIconBgColor: 'transparent',
    socialIconBorderColor: '#E5E7EB',
    utilityIconColor: '#6B7280',
    utilityIconHoverColor: 'hsl(var(--primary))',
    utilityIconBgColor: 'transparent',
    utilityIconBorderColor: '#E5E7EB'
  });

  // Charger les styles depuis la base de données
  useEffect(() => {
    const loadHeaderStyle = async () => {
      try {
        setIsLoading(true);
        const { headerStyle: style } = await getHeaderConfig();
        if (style) {
          setHeaderStyle(style);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des styles:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les styles de l'en-tête",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadHeaderStyle();
  }, [toast]);

  // Fonction pour mettre à jour un style spécifique
  const updateStyle = <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => {
    setHeaderStyle(prev => ({ ...prev, [key]: value }));
  };

  // Fonction pour sauvegarder les changements
  const saveChanges = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveHeaderStyle(headerStyle);
      
      if (success) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Styles de l'en-tête mis à jour"
        });
        
        // Déclencher un événement pour mettre à jour l'en-tête en temps réel
        window.dispatchEvent(new CustomEvent('header-config-updated'));
        
        return true;
      } else {
        showSaveError();
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder les styles",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des styles:', error);
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
    headerStyle,
    updateStyle,
    saveChanges,
    isLoading
  };
};
