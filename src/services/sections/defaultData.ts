
import { HomepageConfig, HomeTemplateType, Section } from './types';

// Configuration par défaut du template
export const DEFAULT_TEMPLATE_CONFIG = {
  activeTemplate: 'default' as HomeTemplateType,
  // Ajoutez ici d'autres configurations de template si nécessaire
};

// Sections par défaut
export const DEFAULT_SECTIONS: Section[] = [
  {
    id: 'hero-default',
    type: 'hero',
    order: 1,
    visible: true,
    title: 'Hero Section',
  },
  {
    id: 'services-default',
    type: 'services',
    order: 2,
    visible: true,
    title: 'Services Section',
  },
  {
    id: 'about-default',
    type: 'about',
    order: 3,
    visible: true,
    title: 'About Section',
  },
  {
    id: 'team-default',
    type: 'team',
    order: 4,
    visible: true,
    title: 'Team Section',
  },
  {
    id: 'testimonials-default',
    type: 'testimonials',
    order: 5,
    visible: true,
    title: 'Testimonials Section',
  },
  {
    id: 'trusted-clients-default',
    type: 'trusted-clients',
    order: 6,
    visible: true,
    title: 'Trusted Clients Section',
  },
  {
    id: 'faq-default',
    type: 'faq',
    order: 7,
    visible: true,
    title: 'FAQ Section',
  },
  {
    id: 'contact-default',
    type: 'contact',
    order: 8,
    visible: true,
    title: 'Contact Section',
  },
];

// Données par défaut pour les sections
export const DEFAULT_SECTION_DATA = {};

// Configuration par défaut de la page d'accueil
export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  sections: DEFAULT_SECTIONS,
  sectionData: DEFAULT_SECTION_DATA,
  templateConfig: DEFAULT_TEMPLATE_CONFIG
};
