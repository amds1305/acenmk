
import React, { useState, useCallback } from "react";
import { AdminNotificationContext, defaultContext } from "./context";
import { NotificationType, SaveStatus } from "./types";
import { useToast } from "@/hooks/use-toast";

interface AdminNotificationProviderProps {
  children: React.ReactNode;
}

export const AdminNotificationProvider: React.FC<AdminNotificationProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  }, [toast]);

  const showSaveSuccess = useCallback(() => {
    setSaveStatus("success");
    showNotification("success", "Modifications enregistrées", "Vos modifications ont été enregistrées avec succès.");
  }, [showNotification]);

  const showSaveError = useCallback((error?: any) => {
    setSaveStatus("error");
    const errorMessage = error ? `Erreur: ${error.message || JSON.stringify(error)}` : "Une erreur est survenue lors de l'enregistrement.";
    showNotification("error", "Erreur lors de l'enregistrement", errorMessage);
  }, [showNotification]);

  const showProcessing = useCallback(() => {
    setIsProcessing(true);
    setSaveStatus("saving");
  }, []);

  const resetSaveStatus = useCallback((delay: number = 3000) => {
    if (saveStatus !== "idle") {
      setTimeout(() => {
        setSaveStatus("idle");
      }, delay);
    }
  }, [saveStatus]);

  return (
    <AdminNotificationContext.Provider
      value={{
        showNotification,
        showSaveSuccess,
        showSaveError,
        showProcessing,
        isProcessing,
        saveStatus,
        setSaveStatus,
        resetSaveStatus,
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
};
