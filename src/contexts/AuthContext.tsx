
import React, { createContext, useContext } from 'react';
import { AuthContextType } from '../types/auth';
import { useAuthProvider } from '../hooks/useAuthProvider';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Re-export types from the types file for convenience
export type { User, Project, Estimate, Message, UserRole, UserPreferences, Address, SocialLink, LoginHistory } from '../types/auth';
