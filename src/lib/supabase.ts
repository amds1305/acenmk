
import { createClient } from '@supabase/supabase-js';

// Définir des valeurs par défaut pour éviter les erreurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kbigpjrjarlbncdtonuz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaWdwanJqYXJsYm5jZHRvbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTE4ODEsImV4cCI6MjA2MDAyNzg4MX0.rM-Ra62sAdNYy0c8ep0ey1WIyv8qj3nUBRRTy_ndRLs';

// Créer et exporter le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
