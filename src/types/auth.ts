
export type UserRole = 'visitor' | 'client_standard' | 'client_premium' | 'external_provider' | 
                       'contributor' | 'manager' | 'business_admin' | 'super_admin' | 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  biography?: string;
  createdAt: string;
  lastLoginDate?: string;
  twoFactorEnabled?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: any }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: any }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; url?: string; error?: any }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: any }>;
  toggleTwoFactor: (enable: boolean) => Promise<{ success: boolean; error?: any }>;
  messages: any[];
  unreadMessages: number;
}
