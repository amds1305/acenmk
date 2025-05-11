
import { useContext } from 'react';
import { AdminNotificationContext, defaultContext } from './context';
import { AdminNotificationContextType } from './types';

// Amélioré pour être plus robuste quand utilisé hors du provider
export const useAdminNotification = (): AdminNotificationContextType => {
  const context = useContext(AdminNotificationContext);
  
  // Renvoyer le contexte par défaut si non disponible
  // Cela empêche le crash mais garde un avertissement
  if (context === undefined) {
    console.warn('useAdminNotification est appelé en dehors d\'un AdminNotificationProvider');
    return defaultContext;
  }
  
  return context;
};
