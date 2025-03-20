import React, { createContext, useContext, useState, useEffect } from 'react';

export type Project = {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  lastUpdated: string;
};

export type Estimate = {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  amount: number;
};

export type Message = {
  id: string;
  content: string;
  date: string;
  read: boolean;
  sender: 'user' | 'admin';
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  projects?: Project[];
  estimates?: Estimate[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, company?: string, phone?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  messages: Message[];
  unreadMessages: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Pour simplifier, nous utilisons un utilisateur fictif pour la démonstration
// Dans une application réelle, cela serait validé contre une API ou une base de données
const MOCK_ADMIN_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Administrateur',
  role: 'admin',
  createdAt: new Date().toISOString(),
  projects: [
    { id: '1', title: 'Refonte site web', status: 'completed', lastUpdated: '2023-05-15' },
    { id: '2', title: 'Application mobile', status: 'in-progress', lastUpdated: '2023-06-20' },
  ],
  estimates: [
    { id: '1', title: 'Maintenance annuelle', status: 'approved', date: '2023-04-10', amount: 3500 },
    { id: '2', title: 'Développement e-commerce', status: 'pending', date: '2023-07-05', amount: 8900 },
  ]
};

const MOCK_USER: User = {
  id: '2',
  email: 'user@example.com',
  name: 'Client Standard',
  role: 'user',
  company: 'Entreprise ABC',
  phone: '06 12 34 56 78',
  createdAt: new Date(Date.now() - 7889400000).toISOString(),
  projects: [
    { id: '3', title: 'Site vitrine', status: 'in-progress', lastUpdated: '2023-08-01' },
  ],
  estimates: [
    { id: '3', title: 'Refonte graphique', status: 'pending', date: '2023-08-10', amount: 2500 },
  ]
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', content: 'Votre devis a été approuvé', date: '2023-08-15T10:30:00', read: true, sender: 'admin' },
  { id: '2', content: 'Nous avons une mise à jour concernant votre projet', date: '2023-08-17T14:45:00', read: false, sender: 'admin' },
  { id: '3', content: 'Question concernant la dernière fonctionnalité', date: '2023-08-18T09:15:00', read: false, sender: 'user' },
];

const MOCK_PASSWORD = 'admin123';
const USER_PASSWORD = 'user123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

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
        } else if (email === MOCK_USER.email && password === USER_PASSWORD) {
          setUser(MOCK_USER);
          localStorage.setItem('user', JSON.stringify(MOCK_USER));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Identifiants invalides'));
        }
      }, 1000); // Simuler un délai réseau
    });
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    // Simuler l'enregistrement d'un nouvel utilisateur
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Vérifier si l'email est déjà utilisé
        if (email === MOCK_ADMIN_USER.email || email === MOCK_USER.email) {
          setIsLoading(false);
          reject(new Error('Cet email est déjà utilisé'));
          return;
        }

        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          role: 'user',
          company,
          phone,
          createdAt: new Date().toISOString(),
          projects: [],
          estimates: []
        };

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...data };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const unreadMessages = messages.filter(message => !message.read && message.sender === 'admin').length;

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    messages,
    unreadMessages
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
