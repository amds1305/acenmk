
import { ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export interface AdminNotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string) => void;
  showSaveSuccess: () => void;
  showSaveError: (error?: any) => void;
  showProcessing: () => void;
  isProcessing: boolean;
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;
  resetSaveStatus: (delay?: number) => void;
}
