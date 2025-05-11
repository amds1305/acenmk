
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from '@/hooks/use-admin-notification';
import { HeaderStyle } from '../types';
import { useHeaderStyle as useContextHeaderStyle } from '@/contexts/HeaderStyleContext';

// Add proper types
export interface UseHeaderStyleReturn {
  headerStyle: HeaderStyle;
  updateStyle: <K extends keyof HeaderStyle>(key: K, value: HeaderStyle[K]) => void;
  saveChanges: () => Promise<boolean>;
  loadPreset: (preset: HeaderStyle) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
  availablePresets: { name: string; style: HeaderStyle }[];
}

export const useHeaderStyle = (): UseHeaderStyleReturn => {
  const { toast } = useToast();
  // Use the hook safely with optional chaining and fallback
  const adminNotification = useAdminNotification();
  
  // Use the context hook to get the actual implementation
  const {
    headerStyle,
    updateStyle,
    saveChanges: contextSaveChanges,
    loadPreset,
    resetToDefaults,
    isLoading,
    availablePresets
  } = useContextHeaderStyle();
  
  // Wrap saveChanges to use adminNotification if available
  const saveChanges = async () => {
    try {
      const result = await contextSaveChanges();
      
      if (result) {
        adminNotification.showSaveSuccess();
      } else {
        adminNotification.showSaveError();
      }
      
      return result;
    } catch (error) {
      adminNotification.showSaveError(error);
      return false;
    }
  };

  return {
    headerStyle,
    updateStyle,
    saveChanges,
    loadPreset,
    resetToDefaults,
    isLoading,
    availablePresets
  };
};

export default useHeaderStyle;
