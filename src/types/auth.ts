
export type Project = {
  id: string;
  name: string;
  title: string; // For backward compatibility
  status: 'active' | 'completed' | 'onhold' | 'in_progress';
  lastUpdated?: string;
  dueDate: string;
  client: string;
  progress: number;
};

export type Estimate = {
  id: string;
  title: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in_review';
  date: string;
  amount: number;
  client: string;
};

export type Message = {
  id: string;
  content: string;
  date?: string; // For backward compatibility
  timestamp: string;
  read: boolean;
  sender: string;
  avatar?: string;
};

export type UserRole = 'admin' | 'user' | 'client_premium' | 'super_admin' | 'business_admin' | 'client_standard' | 'external_provider' | 'contributor';

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
  timestamp: string;
  date?: string; // For backward compatibility
  ipAddress: string;
  ip?: string; // For backward compatibility
  device: string;
  deviceInfo?: string; // For backward compatibility
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
