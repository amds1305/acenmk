
import { LegalContents } from './types';

export const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: "<h1>Mentions légales</h1><p>Ajoutez ici vos mentions légales...</p>",
    metaDescription: "Mentions légales de notre entreprise",
    isPublished: true
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: "<h1>Politique de confidentialité</h1><p>Ajoutez ici votre politique de confidentialité...</p>",
    metaDescription: "Notre politique de confidentialité concernant vos données personnelles",
    isPublished: true
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: "<h1>Conditions d'utilisation</h1><p>Ajoutez ici vos conditions d'utilisation...</p>",
    metaDescription: "Conditions d'utilisation de nos services",
    isPublished: true
  },
  cookiesPolicy: {
    title: "Politique des cookies",
    content: "<h1>Politique des cookies</h1><p>Ajoutez ici votre politique des cookies...</p>",
    metaDescription: "Notre politique concernant l'utilisation des cookies",
    isPublished: true
  }
};
