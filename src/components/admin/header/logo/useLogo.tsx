
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { getHeaderConfig, saveHeaderLogo } from '@/services/supabase/headerService';
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
  
  // Initial logo state
  const [logo, setLogo] = useState<Logo>({
    src: '/placeholder.svg',
    alt: 'Logo Acenümerik',
    width: 150,
    height: 40,
    position: 'left',
  });

  // For file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  // Load logo from database
  useEffect(() => {
    const loadLogo = async () => {
      try {
        setIsLoading(true);
        const config = await getHeaderConfig();
        if (config.headerLogo) {
          setLogo(config.headerLogo);
        }
      } catch (error) {
        console.error('Error loading logo:', error);
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

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Logo preview
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

  // Simulate file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive"
      });
      return;
    }

    // Here, you would implement the actual upload to your server
    // For now, we're using the Data URL as if the upload was successful
    
    toast({
      title: "Succès",
      description: "Logo téléchargé avec succès"
    });
  };

  // Trigger to open file selection dialog
  const triggerFileInput = () => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  };

  // Update logo properties
  const updateLogoProperty = <K extends keyof Logo>(property: K, value: Logo[K]) => {
    setLogo({
      ...logo,
      [property]: value
    });
  };

  // Save logo changes
  const saveLogoChanges = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await saveHeaderLogo(logo);
      
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
      console.error('Error saving logo:', error);
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
