
import { LegalContents } from './types';

export const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: "<h1>Mentions légales</h1><p>Contenu par défaut des mentions légales.</p>",
    metaDescription: "Mentions légales de notre entreprise",
    isPublished: true
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: "<h1>Politique de confidentialité</h1><p>Contenu par défaut de la politique de confidentialité.</p>",
    metaDescription: "Notre politique de confidentialité pour la protection de vos données",
    isPublished: true
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: "<h1>Conditions d'utilisation</h1><p>Contenu par défaut des conditions d'utilisation.</p>",
    metaDescription: "Conditions d'utilisation de notre site web",
    isPublished: true
  },
  cookiesPolicy: {
    title: "Politique de cookies",
    content: "<h1>Politique de cookies</h1><p>Contenu par défaut de la politique de cookies.</p>",
    metaDescription: "Notre politique concernant l'utilisation des cookies",
    isPublished: true
  }
};
