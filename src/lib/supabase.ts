
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Supabase connection constants
const SUPABASE_URL = "https://kbigpjrjarlbncdtonuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaWdwanJqYXJsYm5jZHRvbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTE4ODEsImV4cCI6MjA2MDAyNzg4MX0.rM-Ra62sAdNYy0c8ep0ey1WIyv8qj3nUBRRTy_ndRLs";

// Create and export the Supabase client with proper headers
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

// Helper for debugging Supabase connection issues
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('app_settings').select('*').limit(1);
    if (error) {
      console.error('Supabase connection test error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (e) {
    console.error('Supabase connection exception:', e);
    return { success: false, error: e };
  }
};

// Export for consistent imports
export default supabase;
