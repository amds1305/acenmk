
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.22.4";

// Configuration des headers CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Schéma de validation du formulaire
const contactFormSchema = z.object({
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

type ContactFormValues = z.infer<typeof contactFormSchema>;

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Formatage du corps d'email
const formatEmailBody = (data: ContactFormValues) => {
  return `
    <h2>Nouvelle demande de contact</h2>
    <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
    <hr />
    <h3>Informations personnelles</h3>
    <p><strong>Nom complet :</strong> ${data.prenom} ${data.nom}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Téléphone :</strong> ${data.telephone || "Non renseigné"}</p>
    <p><strong>Entreprise :</strong> ${data.entreprise || "Non renseignée"}</p>
    <p><strong>Site web :</strong> ${data.site_web || "Non renseigné"}</p>
    <hr />
    <h3>Détails de la demande</h3>
    <p><strong>Service requis :</strong> ${data.service_requis || "Non renseigné"}</p>
    <p><strong>Comment nous a trouvés :</strong> ${data.origine || "Non renseigné"}</p>
    <h4>Description de la demande :</h4>
    <p>${data.description.replace(/\n/g, "<br />")}</p>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Gestion des requêtes OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Vérification que la requête est bien un POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Méthode non autorisée" }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Récupération et validation des données
    const formData: ContactFormValues = await req.json();
    
    // Vérification du honeypot
    if (formData._honeypot && formData._honeypot.length > 0) {
      // Si le champ honeypot est rempli, on simule une réussite mais on ne fait rien
      // (cela évite que les bots sachent que le honeypot a fonctionné)
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Validation avec Zod
    try {
      contactFormSchema.parse(formData);
    } catch (validationError) {
      console.error("Erreur de validation:", validationError);
      return new Response(
        JSON.stringify({ error: "Données invalides", details: validationError }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Récupération des paramètres d'email depuis la base de données
    const { data: emailSettings, error: settingsError } = await supabase
      .from("contact_email_settings")
      .select("*")
      .limit(1)
      .single();
      
    if (settingsError) {
      console.error("Erreur lors de la récupération des paramètres d'email:", settingsError);
      return new Response(
        JSON.stringify({ error: "Erreur serveur lors de la configuration de l'email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Enregistrement de la demande dans la base de données
    const { data: contactRequest, error: dbError } = await supabase
      .from("contact_requests")
      .insert({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        entreprise: formData.entreprise,
        site_web: formData.site_web,
        service_requis: formData.service_requis,
        origine: formData.origine,
        description: formData.description,
        consentement: formData.consentement
      })
      .select()
      .single();
      
    if (dbError) {
      console.error("Erreur lors de l'enregistrement de la demande:", dbError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de votre demande" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Préparation et envoi de l'email
    try {
      const emailBody = formatEmailBody(formData);
      
      const emailResponse = await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>", // À remplacer par votre domaine vérifié
        to: emailSettings.destinataires,
        cc: emailSettings.cc || [],
        bcc: emailSettings.bcc || [],
        subject: emailSettings.objet || "Nouvelle demande de contact via le site web",
        html: emailBody,
        reply_to: formData.email
      });
      
      console.log("Email envoyé avec succès:", emailResponse);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Votre demande a bien été enregistrée. Nous vous contacterons bientôt.",
          id: contactRequest.id
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    } catch (emailError: any) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      
      // Même si l'email échoue, nous avons enregistré la demande en BDD
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Votre demande a bien été enregistrée. Nous vous contacterons bientôt.",
          warning: "L'envoi de l'email de notification a échoué mais votre demande est bien enregistrée.",
          id: contactRequest.id
        }),
        { 
          status: 200, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

  } catch (error: any) {
    console.error("Erreur générale dans la fonction contact-form:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// Démarrage du serveur
serve(handler);
