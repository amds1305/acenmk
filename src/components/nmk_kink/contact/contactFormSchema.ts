
import * as z from "zod";

// Form Schema for validation - reusing the same schema as Teko
export const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  businessName: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  phone: z.string().min(1, { message: "Le numéro de téléphone est requis" }),
  website: z.string().optional(),
  service: z.string().min(1, { message: "Veuillez sélectionner un service" }),
  referralSource: z.string().min(1, { message: "Veuillez indiquer comment vous nous avez trouvés" }),
  projectDescription: z.string().min(10, { message: "Veuillez décrire votre projet (minimum 10 caractères)" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "Vous devez accepter les conditions" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
