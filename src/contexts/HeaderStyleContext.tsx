
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HeaderStyle } from '@/components/admin/header/types';
import { getHeaderConfig, saveHeaderStyle } from '@/services/supabase/headerService';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';

// Valeurs par défaut pour les styles du header
export const defaultHeaderStyle: HeaderStyle = {
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
  
  // Styles pour les éléments de menu
  menuHoverBgColor: 'rgba(239, 246, 255, 0.15)',
  menuActiveBgColor: 'rgba(239, 246, 255, 0.1)',
  menuTransition: 'all 0.3s ease',
  menuBorderRadius: '0.375rem',
  
  // Styles pour les icônes sociales
  socialIconColor: '#6B7280',
  socialIconHoverColor: '#ca3c66',
  socialIconBgColor: 'transparent',
  socialIconBorderColor: '#E5E7EB',
  socialIconSize: '18px',
  socialIconSpacing: '0.75rem',
  
  // Styles pour les icônes d'utilité
  utilityIconColor: '#6B7280',
  utilityIconHoverColor: '#ca3c66',
  utilityIconBgColor: 'transparent',
  utilityIconBorderColor: '#E5E7EB',
  utilityIconSize: '18px',
  
  // Styles pour les états de header
  scrolledBgColor: 'rgba(255, 255, 255, 0.8)',
  scrolledTextColor: '#333333',
  scrolledBorderColor: '#e5e7eb',
  scrolledShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  
  // États d'animation
  transitionDuration: '0.3s',
  transitionTiming: 'ease',
  
  // Typographie avancée
  fontWeight: '500',
  letterSpacing: 'normal',
  textTransform: 'none',
};

// Types pour le contexte
interface HeaderStyleContextType {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
  saveChanges: () => Promise<boolean>;
  loadPreset: (preset: HeaderStyle) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
  availablePresets: { name: string; style: HeaderStyle }[];
}

// Création du contexte
const HeaderStyleContext = createContext<HeaderStyleContextType | undefined>(undefined);

// Presets prédéfinis
const classicPreset: HeaderStyle = {
  ...defaultHeaderStyle,
  backgroundColor: '#ffffff',
  textColor: '#333333',
  hoverColor: '#0f766e',
  activeColor: '#0f766e',
  transparent: false,
  glassmorphism: false,
  borderBottom: true,
  borderColor: '#e5e7eb',
};

const modernPreset: HeaderStyle = {
  ...defaultHeaderStyle,
  backgroundColor: 'transparent',
  textColor: '#ffffff',
  hoverColor: '#f3f4f6',
  activeColor: '#ffffff',
  transparent: true,
  glassmorphism: true,
  scrolledBgColor: 'rgba(17, 24, 39, 0.8)',
  scrolledTextColor: '#ffffff',
};

const minimalPreset: HeaderStyle = {
  ...defaultHeaderStyle,
  backgroundColor: 'transparent',
  textColor: '#333333',
  hoverColor: '#6366f1',
  activeColor: '#4f46e5',
  transparent: true,
  glassmorphism: false,
  borderBottom: false,
  dropShadow: false,
  menuBorderRadius: '0',
  socialIconBorderColor: 'transparent',
  utilityIconBorderColor: 'transparent',
};

export const HeaderStyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(defaultHeaderStyle);
  
  // Liste des presets disponibles
  const availablePresets = [
    { name: 'Classique', style: classicPreset },
    { name: 'Moderne', style: modernPreset },
    { name: 'Minimaliste', style: minimalPreset },
  ];
  
  // Charger les styles depuis la base de données
  useEffect(() => {
    const loadHeaderStyle = async () => {
      try {
        setIsLoading(true);
        const { headerStyle: style } = await getHeaderConfig();
        if (style) {
          // Fusionner avec les valeurs par défaut pour s'assurer que toutes les propriétés existent
          setHeaderStyle({ ...defaultHeaderStyle, ...style });
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
        window.dispatchEvent(new CustomEvent('header-style-updated', {
          detail: { style: headerStyle }
        }));
        
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

  // Charger un preset
  const loadPreset = (preset: HeaderStyle) => {
    setHeaderStyle(preset);
    toast({
      title: "Preset chargé",
      description: "Les styles ont été mis à jour. N'oubliez pas de sauvegarder pour appliquer les changements."
    });
  };

  // Réinitialiser aux valeurs par défaut
  const resetToDefaults = () => {
    setHeaderStyle(defaultHeaderStyle);
    toast({
      title: "Réinitialisation",
      description: "Les styles ont été réinitialisés aux valeurs par défaut. N'oubliez pas de sauvegarder."
    });
  };

  return (
    <HeaderStyleContext.Provider 
      value={{ 
        headerStyle, 
        updateStyle, 
        saveChanges, 
        loadPreset,
        resetToDefaults,
        isLoading,
        availablePresets
      }}
    >
      {children}
    </HeaderStyleContext.Provider>
  );
};

export const useHeaderStyle = () => {
  const context = useContext(HeaderStyleContext);
  if (context === undefined) {
    throw new Error('useHeaderStyle doit être utilisé à l'intérieur d'un HeaderStyleProvider');
  }
  return context;
};

export default HeaderStyleContext;
