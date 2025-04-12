
import { createClient } from '@supabase/supabase-js';

// Ces valeurs doivent être accessibles via import.meta.env dans les applications Vite
// au lieu de process.env qui n'est pas défini dans le navigateur
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vérifier que les variables d'environnement sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Les variables Supabase ne sont pas définies correctement');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '[DÉFINI]' : '[NON DÉFINI]');
}

// Création du client Supabase avec vérification des valeurs
export const supabase = createClient(
  supabaseUrl || 'https://votre-projet.supabase.co',  // URL par défaut pour éviter l'erreur immédiate
  supabaseAnonKey || 'votre-clé-anon-supabase'        // Clé par défaut pour éviter l'erreur immédiate
);
