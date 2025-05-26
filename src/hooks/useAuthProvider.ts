
import { useState, useEffect } from 'react';
import { User, Message, UserPreferences, LoginHistory } from '../types/auth';
import { MOCK_ADMIN_USER, MOCK_USER, MOCK_MESSAGES, MOCK_PASSWORD, USER_PASSWORD } from '../data/mockUsers';
import { useToast } from '@/hooks/use-toast';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const { toast } = useToast();

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
          // Add login history
          const loginEntry: LoginHistory = {
            id: Math.random().toString(36).substring(2, 9),
            date: new Date().toISOString(),
            ip: '192.168.1.' + Math.floor(Math.random() * 255),
            deviceInfo: 'Web Browser / Chrome',
            location: 'Paris, France',
            success: true
          };
          
          const updatedUser = {
            ...MOCK_ADMIN_USER,
            lastLoginDate: new Date().toISOString(),
            loginHistory: [...(MOCK_ADMIN_USER.loginHistory || []), loginEntry]
          };
          
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setIsLoading(false);
          resolve();
        } else if (email === MOCK_USER.email && password === USER_PASSWORD) {
          // Add login history
          const loginEntry: LoginHistory = {
            id: Math.random().toString(36).substring(2, 9),
            date: new Date().toISOString(),
            ip: '192.168.1.' + Math.floor(Math.random() * 255),
            deviceInfo: 'Web Browser / Chrome',
            location: 'Lyon, France',
            success: true
          };
          
          const updatedUser = {
            ...MOCK_USER,
            lastLoginDate: new Date().toISOString(),
            loginHistory: [...(MOCK_USER.loginHistory || []), loginEntry]
          };
          
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setIsLoading(false);
          resolve();
        } else {
          // Record failed login attempt
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

        // Default preferences
        const defaultPreferences: UserPreferences = {
          notifications: {
            email: true,
            sms: false,
            projectUpdates: true,
            marketing: false
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false
          },
          theme: 'system'
        };

        // Initial login history
        const loginEntry: LoginHistory = {
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString(),
          ip: '192.168.1.' + Math.floor(Math.random() * 255),
          deviceInfo: 'Web Browser / Chrome',
          location: 'Paris, France',
          success: true
        };

        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          role: 'user',
          company,
          phone,
          createdAt: new Date().toISOString(),
          projects: [],
          estimates: [],
          preferences: defaultPreferences,
          loginHistory: [loginEntry],
          twoFactorEnabled: false,
          lastLoginDate: new Date().toISOString()
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
          
          toast({
            title: "Profil mis à jour",
            description: "Vos informations ont été enregistrées avec succès."
          });
        }
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    setIsLoading(true);
    
    // Simulate file upload
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // Create a fake URL for the avatar (in a real app, this would be a server URL)
        const avatarUrl = URL.createObjectURL(file);
        
        if (user) {
          const updatedUser = { ...user, avatar: avatarUrl };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          toast({
            title: "Avatar mis à jour",
            description: "Votre photo de profil a été modifiée avec succès."
          });
        }
        
        setIsLoading(false);
        resolve(avatarUrl);
      }, 1500);
    });
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check current password
        const isAdmin = user?.email === MOCK_ADMIN_USER.email;
        const expectedPassword = isAdmin ? MOCK_PASSWORD : USER_PASSWORD;
        
        if (currentPassword !== expectedPassword) {
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Le mot de passe actuel est incorrect."
          });
          reject(new Error("Le mot de passe actuel est incorrect"));
          return;
        }
        
        // In a real app, we would update the password in the backend
        toast({
          title: "Mot de passe mis à jour",
          description: "Votre mot de passe a été modifié avec succès."
        });
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const toggleTwoFactor = async (enable: boolean): Promise<void> => {
    setIsLoading(true);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, twoFactorEnabled: enable };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          toast({
            title: enable ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
            description: enable 
              ? "Votre compte est maintenant plus sécurisé." 
              : "L'authentification à deux facteurs a été désactivée."
          });
        }
        
        setIsLoading(false);
        resolve();
      }, 800);
    });
  };

  const updatePreferences = async (preferences: UserPreferences): Promise<void> => {
    setIsLoading(true);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, preferences };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          toast({
            title: "Préférences mises à jour",
            description: "Vos préférences ont été enregistrées avec succès."
          });
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
    uploadAvatar,
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
    messages,
    unreadMessages
  };
};
