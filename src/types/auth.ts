
// Basic User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
  twoFactorEnabled?: boolean;
  projects?: Project[];
  estimates?: Estimate[];
  address?: Address;
  socialLinks?: SocialLink[];
  loginHistory?: LoginHistory[];
  preferences?: UserPreferences;
  biography?: string;
  lastLoginDate?: string;
}

// UserRole type
export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

// AuthState interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context interface
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  register: (data: any) => Promise<any>;
  updateProfile: (data: Partial<User>) => Promise<any>;
  uploadAvatar: (file: File) => Promise<string | null>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<any>;
  toggleTwoFactor: (enable: boolean) => Promise<any>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  messages: Message[];
  unreadMessages: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface LoginHistory {
  id: string;
  date: string;
  ip: string;
  device: string;
  location: string;
  success?: boolean;
  deviceInfo?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
  notifications?: {
    email?: boolean;
    sms?: boolean;
    projectUpdates?: boolean;
    marketing?: boolean;
  };
  privacy?: {
    profileVisibility?: "public" | "private" | "contacts_only";
    showEmail?: boolean;
    showPhone?: boolean;
  };
  theme?: "light" | "dark" | "system";
}

export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  content: string;
  read: boolean;
  avatar?: string;
  date?: string;
}

export interface Estimate {
  id: string;
  title: string;
  description: string;
  status: string;
  amount: number;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  endDate?: string;
}
