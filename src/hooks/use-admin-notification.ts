
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export const useAdminNotification = () => {
  const { toast } = useToast();
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  // Fonction pour notifier les modifications
  const notifyChanges = (section?: string, data?: any) => {
    // Crée un événement personnalisé pour notifier les autres composants des changements
    const event = new CustomEvent('admin-changes-saved', {
      detail: { section, data, timestamp: new Date() }
    });
    
    // Déclenche l'événement sur window pour qu'il soit accessible globalement
    window.dispatchEvent(event);
    
    // Met à jour le temps de la dernière sauvegarde
    setLastSaveTime(new Date());
  };

  // Afficher un toast de succès lors d'une sauvegarde
  const showSaveSuccess = (message?: string) => {
    toast({
      title: "Modifications enregistrées",
      description: message || "Les modifications ont été enregistrées avec succès",
    });
    notifyChanges();
  };

  // Afficher un toast d'erreur lors d'un échec de sauvegarde
  const showSaveError = (message?: string) => {
    toast({
      title: "Erreur",
      description: message || "Une erreur est survenue lors de l'enregistrement",
      variant: "destructive"
    });
  };

  // Récupérer le temps écoulé depuis la dernière sauvegarde au format lisible
  const getTimeSinceLastSave = (): string => {
    if (!lastSaveTime) return "Jamais";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastSaveTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `il y a ${diffInSeconds} secondes`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
  };

  return {
    showSaveSuccess,
    showSaveError,
    notifyChanges,
    lastSaveTime,
    getTimeSinceLastSave
  };
};
