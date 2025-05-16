
// Types for section configuration
export type SectionType = 'hero' | 'services' | 'about' | 'team' | 'trusted-clients' | 'testimonials' | 'faq' | 'contact' | 'custom';

export interface Section {
  id: string;
  type: SectionType;
  title?: string;
  visible: boolean;
  order: number;
  data?: any;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  category?: string;
}

export interface TrustedClientsSectionData {
  title: string;
  clients: ClientLogo[];
  featuredLabel?: string;
  showTrustedClients?: boolean;
}

export interface HomepageConfig {
  sections: Section[];
  header: any;
  sectionData?: {
    [key: string]: any;
  };
}
