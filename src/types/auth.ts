
// Type definitions for authentication and user-related data

export type UserRole = 'user' | 'manager' | 'admin' | 'guest' | 'client_standard' | 'client_premium' | 'external_provider' | 'contributor' | 'business_admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  avatar_url?: string;
  company?: string;
  phone?: string;
  biography?: string;
  lastLoginDate?: string;
  projects?: Project[];
  estimates?: Estimate[];
  loginHistory?: LoginHistory[];
  socialLinks?: SocialLink[];
  address?: Address;
  preferences?: UserPreferences;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  zipCode?: string;
  country?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface LoginHistory {
  id: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location?: string;
  success?: boolean;
  deviceInfo?: string;
}

export interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
  date?: string;
}

export interface UserPreferences {
  notifications?: {
    email?: boolean;
    sms?: boolean;
    projectUpdates?: boolean;
    marketing?: boolean;
  };
  privacy?: {
    profileVisibility?: 'public' | 'private' | 'contacts_only';
    showEmail?: boolean;
    showPhone?: boolean;
  };
  theme?: 'light' | 'dark' | 'system';
  emailNotifications?: boolean;
  darkMode?: boolean;
  language?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'onhold';
  dueDate: string;
  progress: number;
}

export interface Estimate {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}
