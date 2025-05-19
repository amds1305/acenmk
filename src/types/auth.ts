
// Type definitions for authentication and user-related data

export type UserRole = 'user' | 'manager' | 'admin' | 'guest' | 'client_standard' | 'client_premium' | 'external_provider' | 'contributor' | 'business_admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  avatar_url?: string;
  avatar?: string; // Added for backwards compatibility
  company?: string;
  phone?: string;
  biography?: string;
  lastLoginDate?: string;
  createdAt?: string;
  twoFactorEnabled?: boolean;
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
  date?: string;
  ip?: string; // Added for backwards compatibility
}

export interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  avatar?: string; // Added for backwards compatibility
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
  register: (data: any) => Promise<any>; // Updated to return a value
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  uploadAvatar?: (file: File) => Promise<string>; // Added uploadAvatar
  messages?: Message[];
  updatePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor?: (enable: boolean) => Promise<void>;
}

export interface Project {
  id: string;
  name: string;
  title?: string; // Added for backwards compatibility
  client: string;
  status: 'active' | 'completed' | 'onhold' | 'in_progress';
  dueDate: string;
  progress: number;
  lastUpdated?: string;
}

export interface Estimate {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'in_review';
  date: string;
}
