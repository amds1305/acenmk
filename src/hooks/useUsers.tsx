
import { useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Récupérer les profils des utilisateurs depuis Supabase
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profilesError) throw profilesError;
      
      // Récupérer les rôles des utilisateurs
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (rolesError) throw rolesError;
      
      // Préparer un map des derniers rôles par utilisateur
      const roleMap: Record<string, UserRole> = {};
      userRoles.forEach(role => {
        if (!roleMap[role.user_id]) {
          roleMap[role.user_id] = role.role as UserRole;
        }
      });
      
      // Créer la liste des utilisateurs avec leurs rôles
      const mappedUsers = profiles.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name || profile.email?.split('@')[0] || 'Sans nom',
        role: roleMap[profile.id] || 'user' as UserRole,
        avatar: profile.avatar_url,
        company: profile.company,
        phone: profile.phone,
        biography: profile.biography,
        createdAt: profile.created_at
      }));
      
      setUsers(mappedUsers);
    } catch (err: any) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
      setError(err.message || "Impossible de charger les utilisateurs");
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des utilisateurs."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour mettre à jour le rôle d'un utilisateur
  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    try {
      // Vérifier si l'utilisateur a déjà un rôle
      const { data: existingRoles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (existingRoles && existingRoles.length > 0) {
        // Mettre à jour le rôle existant
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
          
        if (error) throw error;
      } else {
        // Créer un nouveau rôle
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: newRole }]);
          
        if (error) throw error;
      }
      
      // Mettre à jour l'état local
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
      return false;
    }
  };
  
  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  return { 
    users, 
    isLoading, 
    error, 
    fetchUsers, 
    updateUserRole 
  };
};
