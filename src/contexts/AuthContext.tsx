
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pour simplifier, nous utilisons un utilisateur fictif pour la démonstration
// Dans une application réelle, cela serait validé contre une API ou une base de données
const MOCK_ADMIN_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Administrateur',
  role: 'admin',
};

const MOCK_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (via localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simuler une vérification d'authentification
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_ADMIN_USER.email && password === MOCK_PASSWORD) {
          setUser(MOCK_ADMIN_USER);
          localStorage.setItem('user', JSON.stringify(MOCK_ADMIN_USER));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Identifiants invalides'));
        }
      }, 1000); // Simuler un délai réseau
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
