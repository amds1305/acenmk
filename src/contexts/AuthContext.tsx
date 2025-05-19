
import React, { createContext, useContext } from 'react';
import { AuthContextType, User, UserRole, Project, Estimate, Message } from '@/types/auth';
import { useAuthProvider } from '../hooks/useAuth';

// Create the context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Re-export types from auth.ts
export type { User, Project, Estimate, Message, UserRole };
