
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from './use-toast';
import { Check, AlertCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface AdminNotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string) => void;
  showSaveSuccess: () => void;
  showSaveError: () => void;
  showProcessing: () => void;
  isProcessing: boolean;
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export const AdminNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    
    // Afficher une notification dans la console également
    console.log(`[Admin] ${type}: ${title} - ${message}`);
  };
  
  const showSaveSuccess = () => {
    setIsProcessing(false);
    showNotification('success', 'Modification enregistrée', 'Les changements ont été appliqués avec succès.');
  };
  
  const showSaveError = () => {
    setIsProcessing(false);
    showNotification('error', 'Erreur', 'Une erreur est survenue lors de l\'enregistrement des modifications.');
  };
  
  const showProcessing = () => {
    setIsProcessing(true);
    showNotification('info', 'Traitement en cours', 'Vos modifications sont en cours de traitement...');
  };
  
  return (
    <AdminNotificationContext.Provider value={{
      showNotification,
      showSaveSuccess,
      showSaveError,
      showProcessing,
      isProcessing
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
