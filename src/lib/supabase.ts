
import { createClient } from '@supabase/supabase-js';

// Ces valeurs sont automatiquement injectées par l'intégration native de Lovable avec Supabase
// N'essayez pas de les remplacer par des valeurs codées en dur
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
