
import React, { useState, useEffect } from 'react';
import { useToast } from '../use-toast';
import { AdminNotificationContext, defaultContext } from './context';
import { NotificationType, SaveStatus } from './types';

export const AdminNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Utiliser le try-catch pour éviter les erreurs si useToast n'est pas disponible
  let toastHook;
  try {
    toastHook = useToast();
  } catch (e) {
    console.warn('useToast is not available in AdminNotificationProvider, notifications will be disabled');
    toastHook = { toast: () => {} };
  }
  
  const { toast } = toastHook;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
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
