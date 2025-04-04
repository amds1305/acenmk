
import { Section, SectionData } from './types';

// Configuration par défaut de la page d'accueil
export const DEFAULT_SECTIONS: Section[] = [
  { id: 'hero', type: 'hero', title: 'Hero', visible: true, order: 0 },
  { id: 'services', type: 'services', title: 'Services', visible: true, order: 1 },
  { id: 'about', type: 'about', title: 'À propos', visible: true, order: 2 },
  { id: 'team', type: 'team', title: 'Équipe', visible: true, order: 3 },
  { id: 'testimonials', type: 'testimonials', title: 'Témoignages', visible: true, order: 4 },
  { id: 'faq', type: 'faq', title: 'FAQ', visible: true, order: 5 },
  { id: 'contact', type: 'contact', title: 'Contact', visible: true, order: 6 },
  { id: 'trusted-clients', type: 'trusted-clients', title: 'Ils nous font confiance', visible: true, order: 7 },
];

export const DEFAULT_SECTION_DATA: Record<string, SectionData> = {
  hero: {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    showTrustedClients: true,
    trustedClientsTitle: 'Ils nous font confiance',
    trustedClients: [
      {
        id: '1',
        name: 'Client 1',
        logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '2',
        name: 'Client 2',
        logoUrl: 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '3',
        name: 'Client 3',
        logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '4',
        name: 'Client 4',
        logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      }
    ]
  },
  'trusted-clients': {
    title: 'Ils nous font confiance',
    clients: []
  }
  // Les autres sections utilisent leurs valeurs par défaut définies dans leurs composants respectifs
};
