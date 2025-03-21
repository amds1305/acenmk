
import { User, Message } from '../types/auth';

// Mock users for demonstration
export const MOCK_ADMIN_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Administrateur',
  role: 'admin',
  createdAt: new Date().toISOString(),
  projects: [
    { id: '1', title: 'Refonte site web', status: 'completed', lastUpdated: '2023-05-15' },
    { id: '2', title: 'Application mobile', status: 'in-progress', lastUpdated: '2023-06-20' },
  ],
  estimates: [
    { id: '1', title: 'Maintenance annuelle', status: 'approved', date: '2023-04-10', amount: 3500 },
    { id: '2', title: 'Développement e-commerce', status: 'pending', date: '2023-07-05', amount: 8900 },
  ]
};

export const MOCK_USER: User = {
  id: '2',
  email: 'user@example.com',
  name: 'Client Standard',
  role: 'user',
  company: 'Entreprise ABC',
  phone: '06 12 34 56 78',
  createdAt: new Date(Date.now() - 7889400000).toISOString(),
  projects: [
    { id: '3', title: 'Site vitrine', status: 'in-progress', lastUpdated: '2023-08-01' },
  ],
  estimates: [
    { id: '3', title: 'Refonte graphique', status: 'pending', date: '2023-08-10', amount: 2500 },
  ]
};

export const MOCK_MESSAGES: Message[] = [
  { id: '1', content: 'Votre devis a été approuvé', date: '2023-08-15T10:30:00', read: true, sender: 'admin' },
  { id: '2', content: 'Nous avons une mise à jour concernant votre projet', date: '2023-08-17T14:45:00', read: false, sender: 'admin' },
  { id: '3', content: 'Question concernant la dernière fonctionnalité', date: '2023-08-18T09:15:00', read: false, sender: 'user' },
];

export const MOCK_PASSWORD = 'admin123';
export const USER_PASSWORD = 'user123';
