
// Import the supabase client from our integration
import { supabase as supabaseClient } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

// Configure custom headers
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Enhanced supabase client with proper headers
export const supabase = supabaseClient;

// Fonction utilitaire pour créer/récupérer un bucket de stockage
export const ensureStorageBucket = async (name: string) => {
  try {
    // Vérifier si le bucket existe déjà
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error(`Erreur lors de la vérification des buckets:`, bucketsError);
      return;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === name);
    
    if (!bucketExists) {
      // Créer le bucket s'il n'existe pas
      const { error } = await supabase.storage.createBucket(name, {
        public: true
      });
      
      if (error) throw error;
      console.log(`Bucket de stockage "${name}" créé avec succès.`);
    }
  } catch (error) {
    console.error(`Erreur lors de la vérification/création du bucket "${name}":`, error);
  }
};

// Fonction utilitaire pour mapper le format de l'utilisateur entre Supabase et notre appli
export const mapUserData = (profile: any, role: UserRole): User => {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: role,
    company: profile.company || undefined,
    phone: profile.phone || undefined,
    avatar: profile.avatar_url || undefined,
    createdAt: profile.created_at,
    // Ajouter d'autres champs selon vos besoins
  } as User;
};
