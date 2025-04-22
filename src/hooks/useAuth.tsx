
import { useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        // This would typically call an API to check if the user is logged in
        // For now, we'll just simulate it by checking localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setIsAdmin(parsedUser.role === 'admin' || parsedUser.role === 'super_admin');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would typically call an API to authenticate the user
      // For now, we'll just simulate a successful login
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        role: 'user',
        avatar: '/placeholder.svg',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsAdmin(mockUser.role === 'admin' || mockUser.role === 'super_admin');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to login'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would typically call an API to register the user
      // For now, we'll just simulate a successful registration
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'user',
        avatar: '/placeholder.svg',
        company,
        phone,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to register'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // This would typically call an API to logout the user
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    return Promise.resolve();
  };

  const updateProfile = async (data: Partial<User>) => {
    // This would typically call an API to update the user's profile
    return Promise.resolve();
  };

  const uploadAvatar = async (file: File) => {
    // This would typically call an API to upload the avatar
    return Promise.resolve('/placeholder.svg');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // This would typically call an API to update the password
    return Promise.resolve();
  };

  const toggleTwoFactor = async (enable: boolean) => {
    // This would typically call an API to toggle two-factor authentication
    return Promise.resolve();
  };

  const updatePreferences = async (preferences: any) => {
    // This would typically call an API to update the user's preferences
    return Promise.resolve();
  };

  return {
    user,
    isLoading: loading,
    login,
    logout,
    register,
    updateProfile,
    uploadAvatar,
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isAuthenticated,
    isAdmin,
    messages,
    unreadMessages,
  };
};
