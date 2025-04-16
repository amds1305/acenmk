
// This file re-exports the official Supabase client for backward compatibility
import { supabase } from '@/integrations/supabase/client';

// Re-export the supabase client
export { supabase };

// For compatibility with code that might use import.meta.env
if (typeof window !== 'undefined') {
  // @ts-ignore - Define values for debugging
  window.VITE_SUPABASE_URL = "https://kbigpjrjarlbncdtonuz.supabase.co";
  // @ts-ignore - Define values for debugging
  window.VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaWdwanJqYXJsYm5jZHRvbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTE4ODEsImV4cCI6MjA2MDAyNzg4MX0.rM-Ra62sAdNYy0c8ep0ey1WIyv8qj3nUBRRTy_ndRLs";
}
