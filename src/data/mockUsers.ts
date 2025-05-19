import { User, Message, LoginHistory, Project, Estimate } from '../types/auth';

// Passwords (in a real app, these would be hashed)
export const MOCK_PASSWORD = 'admin123';
export const USER_PASSWORD = 'user123';

// Mock login history
const adminLoginHistory: LoginHistory[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    ipAddress: '192.168.1.100',
    ip: '192.168.1.100',
    device: 'Chrome / Windows',
    deviceInfo: 'Chrome / Windows',
    location: 'Paris, France',
    success: true
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    ipAddress: '192.168.1.100',
    ip: '192.168.1.100',
    device: 'Firefox / Mac',
    deviceInfo: 'Firefox / Mac',
    location: 'Lyon, France',
    success: true
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    ipAddress: '192.168.1.101',
    ip: '192.168.1.101',
    device: 'Unknown / Android',
    deviceInfo: 'Unknown / Android',
    location: 'Marseille, France',
    success: false
  }
];

const userLoginHistory: LoginHistory[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    date: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    ipAddress: '192.168.1.200',
    ip: '192.168.1.200',
    device: 'Safari / Mac',
    deviceInfo: 'Safari / Mac',
    location: 'Nice, France',
    success: true
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 129600000).toISOString(),
    date: new Date(Date.now() - 129600000).toISOString(), // 1.5 days ago
    ipAddress: '192.168.1.201',
    ip: '192.168.1.201',
    device: 'Chrome / Windows',
    deviceInfo: 'Chrome / Windows',
    location: 'Bordeaux, France',
    success: true
  }
];

// Mock projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Site E-commerce',
    title: 'Site E-commerce',
    status: 'in_progress',
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    client: 'Client A',
    dueDate: new Date(Date.now() + 1209600000).toISOString(),
    progress: 60
  },
  {
    id: '2',
    name: 'Application mobile',
    title: 'Application mobile',
    status: 'active',
    lastUpdated: new Date(Date.now() - 172800000).toISOString(),
    client: 'Client B',
    dueDate: new Date(Date.now() + 2419200000).toISOString(),
    progress: 25
  },
  {
    id: '3',
    name: 'Refonte graphique',
    title: 'Refonte graphique',
    status: 'completed',
    lastUpdated: new Date(Date.now() - 604800000).toISOString(),
    client: 'Client C',
    dueDate: new Date(Date.now() - 604800000).toISOString(),
    progress: 100
  }
];

// Mock estimates
const mockEstimates: Estimate[] = [
  {
    id: '1',
    title: 'Développement site vitrine',
    status: 'accepted',
    date: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
    amount: 2500,
    client: 'Client A'
  },
  {
    id: '2',
    title: 'Maintenance annuelle',
    status: 'pending',
    date: new Date().toISOString(),
    amount: 1200,
    client: 'Client B'
  },
  {
    id: '3',
    title: 'Module de paiement',
    status: 'rejected',
    date: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    amount: 800,
    client: 'Client C'
  }
];

// Mock users
export const MOCK_ADMIN_USER: User = {
  id: 'admin1',
  email: 'admin@example.com',
  name: 'Admin Utilisateur',
  role: 'admin',
  company: 'Admin Co.',
  phone: '+33 1 23 45 67 89',
  avatar: 'https://i.pravatar.cc/150?u=admin@example.com',
  createdAt: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
  projects: mockProjects,
  estimates: mockEstimates,
  biography: "Administrateur système avec plus de 10 ans d'expérience dans le développement web et la gestion de projets informatiques.",
  address: {
    street: '123 Rue de la Paix',
    city: 'Paris',
    state: 'Île-de-France',
    zipCode: '75001',
    country: 'France'
  },
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/admin' },
    { platform: 'twitter', url: 'https://twitter.com/admin' },
    { platform: 'github', url: 'https://github.com/admin' }
  ],
  preferences: {
    notifications: {
      email: true,
      sms: true,
      projectUpdates: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false
    },
    theme: 'system'
  },
  loginHistory: adminLoginHistory,
  twoFactorEnabled: true,
  lastLoginDate: new Date().toISOString()
};

export const MOCK_USER: User = {
  id: 'user1',
  email: 'user@example.com',
  name: 'Client Test',
  role: 'user',
  company: 'User Inc.',
  phone: '+33 9 87 65 43 21',
  avatar: 'https://i.pravatar.cc/150?u=user@example.com',
  createdAt: new Date(Date.now() - 15768000000).toISOString(), // 6 months ago
  projects: mockProjects.slice(0, 2),
  estimates: mockEstimates.slice(0, 2),
  biography: "Entrepreneur dans le domaine du e-commerce, à la recherche de solutions innovantes pour développer mon activité en ligne.",
  address: {
    street: '456 Avenue des Champs-Élysées',
    city: 'Paris',
    state: 'Île-de-France',
    zipCode: '75008',
    country: 'France'
  },
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/user' },
    { platform: 'facebook', url: 'https://facebook.com/user' }
  ],
  preferences: {
    notifications: {
      email: true,
      sms: false,
      projectUpdates: true,
      marketing: true
    },
    privacy: {
      profileVisibility: 'contacts_only',
      showEmail: false,
      showPhone: false
    },
    theme: 'light'
  },
  loginHistory: userLoginHistory,
  twoFactorEnabled: false,
  lastLoginDate: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
};

// Mock messages
export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Votre projet a été mis à jour. Veuillez consulter les dernières modifications.',
    date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    sender: 'admin'
  },
  {
    id: '2',
    content: 'J\'ai une question concernant le devis pour le développement du site vitrine.',
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    sender: 'user'
  },
  {
    id: '3',
    content: 'Nous avons bien reçu votre paiement. Merci pour votre confiance.',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true,
    sender: 'admin'
  },
  {
    id: '4',
    content: 'Une nouvelle version de votre application est disponible pour test.',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    read: false,
    sender: 'admin'
  },
  {
    id: '5',
    content: 'Pourriez-vous me donner plus de détails sur les fonctionnalités du module de paiement ?',
    date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    read: true,
    sender: 'user'
  }
];
