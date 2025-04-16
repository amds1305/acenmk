
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec valeurs directes plutôt que des variables d'environnement
const supabaseUrl = "https://kbigpjrjarlbncdtonuz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaWdwanJqYXJsYm5jZHRvbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTE4ODEsImV4cCI6MjA2MDAyNzg4MX0.rM-Ra62sAdNYy0c8ep0ey1WIyv8qj3nUBRRTy_ndRLs";

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Pour la compatibilité avec le code existant qui pourrait utiliser import.meta.env
if (typeof window !== 'undefined') {
  // @ts-ignore - Définir les valeurs pour le débogage
  window.VITE_SUPABASE_URL = supabaseUrl;
  // @ts-ignore - Définir les valeurs pour le débogage
  window.VITE_SUPABASE_ANON_KEY = supabaseAnonKey;
}
