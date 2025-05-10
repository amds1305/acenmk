
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { saveLogo, getHeaderConfig } from '@/services/supabase/headerService';
import { Logo } from '../types';

export interface UseLogoReturn {
  logo: Logo;
  setLogo: (logo: Logo) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  triggerFileInput: () => void;
  updateLogoProperty: <K extends keyof Logo>(property: K, value: Logo[K]) => void;
  saveLogoChanges: () => Promise<boolean>;
  isLoading: boolean;
}

export const useLogo = (): UseLogoReturn => {
  const { toast } = useToast();
  const { showSaveSuccess, showSaveError } = useAdminNotification();
  const [isLoading, setIsLoading] = useState(false);
  
  // État initial du logo
  const [logo, setLogo] = useState<Logo>({
    src: '/placeholder.svg',
    alt: 'Logo Acenümerik',
    width: 150,
    height: 40,
    position: 'left',
  });

  // Pour l'upload de fichier
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  // Charger le logo depuis la base de données
  useEffect(() => {
    const loadLogo = async () => {
      try {
        setIsLoading(true);
        const { logo } = await getHeaderConfig();
        if (logo) {
          setLogo(logo);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du logo:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le logo",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLogo();
  }, [toast]);

  // Gérer la sélection de fichier
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Prévisualisation du logo
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo({
          ...logo,
          src: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Simuler un upload de fichier
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive"
      });
      return;
    }

    // Ici, vous implémenteriez l'upload réel vers votre serveur
    // Pour l'instant, nous utilisons juste le Data URL comme si l'upload était réussi
    
    toast({
      title: "Succès",
      description: "Logo téléchargé avec succès"
    });
  };

  // Déclencheur pour ouvrir la boîte de dialogue de sélection de fichier
  const triggerFileInput = () => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  };

  // Mettre à jour les propriétés du logo
  const updateLogoProperty = <K extends keyof Logo>(property: K, value: Logo[K]) => {
    setLogo({
      ...logo,
      [property]: value
    });
  };

  // Sauvegarder les modifications du logo
  const saveLogoChanges = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveLogo(logo);
      
      if (success) {
        showSaveSuccess();
        toast({
          title: "Succès",
          description: "Logo mis à jour avec succès"
        });
        return true;
      } else {
        showSaveError();
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder le logo",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du logo:', error);
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
    logo,
    setLogo,
    selectedFile,
    setSelectedFile,
    handleFileChange,
    handleUpload,
    triggerFileInput,
    updateLogoProperty,
    saveLogoChanges,
    isLoading
  };
};
