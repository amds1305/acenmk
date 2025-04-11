
import { Job } from './types';

export const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    type: 'full-time',  // Ensuring this matches one of the allowed types
    location: 'Paris, France',
    department: 'Développement',
    description: 'Nous recherchons un développeur Frontend React expérimenté pour rejoindre notre équipe...',
    responsibilities: [
      'Développer des interfaces utilisateur modernes et responsives',
      'Collaborer avec les designers et les développeurs backend',
      'Participer aux revues de code et à l\'amélioration continue'
    ],
    requirements: [
      'Minimum 3 ans d\'expérience avec React',
      'Bonne connaissance de JavaScript/TypeScript',
      'Expérience avec les outils modernes de développement frontend'
    ],
    postedDate: '2023-04-15',
  },
  {
    id: '2',
    title: 'Designer UX/UI Senior',
    type: 'hybrid', // Ensuring this matches one of the allowed types
    location: 'Lyon, France',
    department: 'Design',
    description: 'Rejoignez notre équipe design pour créer des expériences utilisateur exceptionnelles...',
    responsibilities: [
      'Concevoir des interfaces utilisateur intuitives et esthétiques',
      'Réaliser des recherches utilisateurs et des tests d\'utilisabilité',
      'Collaborer avec l\'équipe de développement pour implémenter les designs'
    ],
    requirements: [
      'Portfolio démontrant vos compétences en design d\'interfaces',
      'Expérience avec Figma, Adobe XD ou outils similaires',
      'Connaissance des principes d\'accessibilité'
    ],
    postedDate: '2023-05-22',
  },
];
