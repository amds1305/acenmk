
import { useState, useEffect } from 'react';
import { User, Message } from '../types/auth';
import { MOCK_ADMIN_USER, MOCK_USER, MOCK_MESSAGES, MOCK_PASSWORD, USER_PASSWORD } from '../data/mockUsers';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  useEffect(() => {
    // Check if user is already logged in (via localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate authentication verification
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
      }, 1000); // Simulate network delay
    });
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    // Simulate registering a new user
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if email is already in use
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

  return {
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
};
