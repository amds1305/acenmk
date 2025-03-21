
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

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: string;
  projects?: Project[];
  estimates?: Estimate[];
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, company?: string, phone?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  messages: Message[];
  unreadMessages: number;
};
