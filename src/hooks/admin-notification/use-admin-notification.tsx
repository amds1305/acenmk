
import { useContext } from "react";
import { AdminNotificationContext } from "./context";

export const useAdminNotification = () => {
  const context = useContext(AdminNotificationContext);
  
  if (context === undefined) {
    console.warn("useAdminNotification doit être utilisé à l'intérieur d'un AdminNotificationProvider");
    return {
      showNotification: () => {},
      showSaveSuccess: () => {},
      showSaveError: () => {},
      showProcessing: () => {},
      isProcessing: false,
      saveStatus: "idle",
      setSaveStatus: () => {},
      resetSaveStatus: () => {},
    };
  }
  
  return context;
};
