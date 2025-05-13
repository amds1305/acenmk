
export interface ContactRequest {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  site_web?: string;
  service_requis?: string;
  origine?: string;
  description: string;
  consentement: boolean;
  created_at: string;
}

export interface ContactEmailSettings {
  id: string;
  destinataires: string[];
  cc?: string[];
  bcc?: string[];
  objet: string;
  created_at: string;
  updated_at: string;
}
