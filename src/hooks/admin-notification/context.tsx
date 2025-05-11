
import { createContext } from 'react';
import { AdminNotificationContextType } from './types';

// Create a default context value to prevent errors when used outside the provider
export const defaultContext: AdminNotificationContextType = {
  showNotification: () => {},
  showSaveSuccess: () => {},
  showSaveError: () => {},
  showProcessing: () => {},
  isProcessing: false,
  saveStatus: 'idle',
  setSaveStatus: () => {},
  resetSaveStatus: () => {},
};

export const AdminNotificationContext = createContext<AdminNotificationContextType>(defaultContext);
