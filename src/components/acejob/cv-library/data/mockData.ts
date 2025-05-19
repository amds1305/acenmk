
import { CV } from '../types';

// Données factices pour la démonstration
export const mockCVs: CV[] = [
  {
    id: '1',
    candidateName: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    title: 'Développeur Frontend Senior',
    uploadDate: '2025-04-02',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: 5,
    education: 'Master en Informatique',
    tags: ['Frontend', 'Disponible'],
    rating: 4,
    lastInteraction: '2025-04-05'
  },
  {
    id: '2',
    candidateName: 'Marie Martin',
    email: 'marie.martin@example.com',
    phone: '+33 6 98 76 54 32',
    title: 'Designer UX/UI',
    uploadDate: '2025-03-28',
    skills: ['Figma', 'Adobe XD', 'Prototypage'],
    experience: 3,
    education: 'Licence en Design',
    tags: ['Design', 'Entretien planifié'],
    rating: 5,
    lastInteraction: '2025-04-10'
  },
  {
    id: '3',
    candidateName: 'Pierre Lefebvre',
    email: 'pierre.lefebvre@example.com',
    phone: '+33 6 45 67 89 01',
    title: 'Développeur Backend Java',
    uploadDate: '2025-04-01',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    experience: 7,
    education: 'Doctorat en Informatique',
    tags: ['Backend', 'En processus'],
    rating: 3,
    lastInteraction: '2025-04-08'
  }
];
