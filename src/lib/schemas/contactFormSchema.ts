
import * as z from "zod";

// Schéma de validation pour le formulaire de contact
export const contactFormSchema = z.object({
  prenom: z.string().min(1, { message: "Le prénom est requis" }),
  nom: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  telephone: z.string().optional(),
  entreprise: z.string().optional(),
  site_web: z.string().url({ message: "URL du site web invalide" }).optional().or(z.string().max(0)),
  service_requis: z.string().optional(),
  origine: z.string().optional(),
  description: z.string().min(10, { message: "Veuillez décrire votre demande (minimum 10 caractères)" }),
  consentement: z.boolean().refine(val => val === true, { message: "Vous devez accepter les conditions" }),
  // Champ honeypot pour protection anti-spam simple
  _honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
