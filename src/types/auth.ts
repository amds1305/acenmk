
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

export type UserRole = 'admin' | 'user' | 'client_premium' | 'super_admin';

export type UserPreferences = {
  notifications: {
    email: boolean;
    sms: boolean;
    projectUpdates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'contacts_only';
    showEmail: boolean;
    showPhone: boolean;
  };
  theme: 'light' | 'dark' | 'system';
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type SocialLink = {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'other';
  url: string;
  label?: string;
};

export type LoginHistory = {
  id: string;
  date: string;
  ip: string;
  deviceInfo: string;
  location?: string;
  success: boolean;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  projects?: Project[];
  estimates?: Estimate[];
  biography?: string;
  address?: Address;
  socialLinks?: SocialLink[];
  preferences?: UserPreferences;
  loginHistory?: LoginHistory[];
  twoFactorEnabled?: boolean;
  lastLoginDate?: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, company?: string, phone?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor: (enable: boolean) => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  messages: Message[];
  unreadMessages: number;
};
