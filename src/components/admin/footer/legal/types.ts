
export interface LegalContent {
  title: string;
  content: string;
  metaDescription: string;
  isPublished: boolean;
}

export interface LegalContents {
  legalNotice: LegalContent;
  privacyPolicy: LegalContent;
  termsOfUse: LegalContent;
  cookiesPolicy: LegalContent;
  [key: string]: LegalContent;
}

export const defaultLegalContents: LegalContents = {
  legalNotice: {
    title: "Mentions légales",
    content: "Contenu des mentions légales...",
    metaDescription: "Mentions légales de notre site",
    isPublished: false
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    content: "Contenu de la politique de confidentialité...",
    metaDescription: "Notre politique de confidentialité",
    isPublished: false
  },
  termsOfUse: {
    title: "Conditions d'utilisation",
    content: "Contenu des conditions d'utilisation...",
    metaDescription: "Conditions d'utilisation de nos services",
    isPublished: false
  },
  cookiesPolicy: {
    title: "Politique de cookies",
    content: "Contenu de la politique de cookies...",
    metaDescription: "Notre politique de cookies",
    isPublished: false
  }
};
