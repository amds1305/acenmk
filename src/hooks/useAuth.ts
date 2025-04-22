
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        // This would typically call an API to check if the user is logged in
        // For now, we'll just simulate it by checking localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to login'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
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
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
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
    return Promise.resolve();
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
};
