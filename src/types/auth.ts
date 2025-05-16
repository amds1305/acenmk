
// Basic User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  twoFactorEnabled?: boolean;
  // Add these to fix type errors
  projects?: Project[];
  estimates?: Estimate[];
  address?: Address;
  socialLinks?: SocialLink[];
  loginHistory?: LoginHistory[];
  preferences?: UserPreferences;
}

// AuthState interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
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
}

export interface LoginHistory {
  id: string;
  date: string;
  ip: string;
  device: string;
  location: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
}

export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  content: string;
  read: boolean;
  avatar?: string;
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
