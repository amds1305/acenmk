
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from './use-toast';
import { Check, AlertCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';
type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface AdminNotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string) => void;
  showSaveSuccess: () => void;
  showSaveError: (error?: any) => void;
  showProcessing: () => void;
  isProcessing: boolean;
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;
  resetSaveStatus: (delay?: number) => void;
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export const AdminNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  
  // Écouter les événements de modification
  useEffect(() => {
    const handleChangesSaved = () => {
      showSaveSuccess();
    };
    
    window.addEventListener('admin-changes-saved', handleChangesSaved);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleChangesSaved);
    };
  }, []);
  
  const showNotification = (type: NotificationType, title: string, message: string) => {
    const variant = type === 'error' ? 'destructive' : 'default';
    const icon = type === 'success' ? <Check className="h-4 w-4" /> 
              : type === 'error' ? <AlertCircle className="h-4 w-4" />
              : <Info className="h-4 w-4" />;
    
    toast({
      title,
      description: message,
      variant,
    });
    
    // Afficher une notification dans la console également pour le débogage
    console.log(`[Admin] ${type}: ${title} - ${message}`);
  };
  
  const resetSaveStatus = (delay = 3000) => {
    setTimeout(() => {
      setSaveStatus('idle');
    }, delay);
  };
  
  const showSaveSuccess = () => {
    setIsProcessing(false);
    setSaveStatus('success');
    showNotification('success', 'Modification enregistrée', 'Les changements ont été appliqués avec succès.');
    resetSaveStatus();
  };
  
  const showSaveError = (error?: any) => {
    setIsProcessing(false);
    setSaveStatus('error');
    showNotification('error', 'Erreur', 'Une erreur est survenue lors de l\'enregistrement des modifications.');
    console.error('Erreur de sauvegarde:', error);
    resetSaveStatus();
  };
  
  const showProcessing = () => {
    setIsProcessing(true);
    setSaveStatus('saving');
    showNotification('info', 'Traitement en cours', 'Vos modifications sont en cours de traitement...');
  };
  
  return (
    <AdminNotificationContext.Provider value={{
      showNotification,
      showSaveSuccess,
      showSaveError,
      showProcessing,
      isProcessing,
      saveStatus,
      setSaveStatus,
      resetSaveStatus
    }}>
      {children}
    </AdminNotificationContext.Provider>
  );
};

export const useAdminNotification = (): AdminNotificationContextType => {
  const context = useContext(AdminNotificationContext);
  if (context === undefined) {
    throw new Error('useAdminNotification doit être utilisé à l\'intérieur d\'un AdminNotificationProvider');
  }
  return context;
};
