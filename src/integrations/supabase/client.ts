
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Configuration Supabase
const SUPABASE_URL = "https://kbigpjrjarlbncdtonuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaWdwanJqYXJsYm5jZHRvbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTE4ODEsImV4cCI6MjA2MDAyNzg4MX0.rM-Ra62sAdNYy0c8ep0ey1WIyv8qj3nUBRRTy_ndRLs";

// Création du client Supabase avec la configuration correcte des headers
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: localStorage
    },
    global: {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  }
);

// Test de connexion à Supabase
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('app_settings').select('*').limit(1);
    if (error) {
      console.error('Erreur de connexion Supabase:', error);
      return false;
    }
    console.log('Connexion Supabase réussie:', data);
    return true;
  } catch (error) {
    console.error('Exception lors du test de connexion:', error);
    return false;
  }
};

export default supabase;
