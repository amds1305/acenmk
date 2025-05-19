
import { createClient } from '@supabase/supabase-js';

// These values should be accessed through import.meta.env in Vite applications
// instead of process.env which is not defined in the browser
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
