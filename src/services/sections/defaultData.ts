
import { Section, SectionData, HomepageConfig, HomeTemplateType } from '../sections/types';

// Sections par défaut pour la page d'accueil
export const DEFAULT_SECTIONS: Section[] = [
  { id: 'hero', type: 'hero', title: 'Hero', visible: true, order: 0 },
  { id: 'services', type: 'services', title: 'Services', visible: true, order: 1 },
  { id: 'about', type: 'about', title: 'À propos', visible: true, order: 2 },
  { id: 'team', type: 'team', title: 'Équipe', visible: true, order: 3 },
  { id: 'testimonials', type: 'testimonials', title: 'Témoignages', visible: true, order: 4 },
  { id: 'faq', type: 'faq', title: 'FAQ', visible: true, order: 5 },
  { id: 'contact', type: 'contact', title: 'Contact', visible: true, order: 6 },
  { id: 'trusted-clients', type: 'trusted-clients', title: 'Clients de confiance', visible: true, order: 7 },
];

// Données par défaut pour les sections
export const DEFAULT_SECTION_DATA: Record<string, SectionData> = {
  hero: {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    showTrustedClients: true,
    trustedClientsTitle: 'Ils nous font confiance',
    trustedClients: []
  }
};

// Template par défaut
export const DEFAULT_TEMPLATE_CONFIG = {
  activeTemplate: 'default' as HomeTemplateType
};

// Configuration complète par défaut
export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  sections: DEFAULT_SECTIONS,
  sectionData: DEFAULT_SECTION_DATA,
  templateConfig: DEFAULT_TEMPLATE_CONFIG
};
