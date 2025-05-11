
export interface LegalContent {
  title: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
}

export interface LegalContents {
  legalNotice: LegalContent;
  privacyPolicy: LegalContent;
  termsOfUse: LegalContent;
  cookiesPolicy: LegalContent;
}

export interface ContentMappings {
  [key: string]: string;
}

export const contentSlugs: ContentMappings = {
  legalNotice: 'mentions-legales',
  privacyPolicy: 'politique-de-confidentialite',
  termsOfUse: 'conditions-utilisation',
  cookiesPolicy: 'politique-cookies'
};
