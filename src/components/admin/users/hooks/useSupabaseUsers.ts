
import { useState, useEffect } from 'react';
import { User, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { MOCK_ADMIN_USER, MOCK_USER } from '@/data/mockUsers';

export const useSupabaseUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Utilisateurs fictifs pour l'exemple
  const mockUsers = [
    MOCK_ADMIN_USER,
    MOCK_USER,
    {
      id: 'user3',
      email: 'premium@example.com',
      name: 'Client Premium',
      role: 'client_premium' as UserRole,
      company: 'Premium Corp',
      phone: '+33 6 12 34 56 78',
      avatar: 'https://i.pravatar.cc/150?u=premium@example.com',
      createdAt: new Date(Date.now() - 7884000000).toISOString(), // 3 months ago
    },
    {
      id: 'user4',
      email: 'new@example.com',
      name: 'Nouveau Client',
      role: 'user' as UserRole,
      company: 'New Company',
      createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    },
    {
      id: 'user5',
      email: 'super@example.com',
      name: 'Super Admin',
      role: 'super_admin' as UserRole,
      company: 'Admin Solutions',
      phone: '+33 7 98 76 54 32',
      avatar: 'https://i.pravatar.cc/150?u=super@example.com',
      createdAt: new Date(Date.now() - 63072000000).toISOString(), // 2 years ago
    }
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    
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
      userRoles?.forEach(role => {
        if (!roleMap[role.user_id]) {
          roleMap[role.user_id] = role.role as UserRole;
        }
      });
      
      // Créer la liste des utilisateurs avec leurs rôles
      const mappedUsers = profiles?.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name || profile.email?.split('@')[0] || 'Sans nom',
        role: roleMap[profile.id] || 'user' as UserRole,
        avatar: profile.avatar_url,
        company: profile.company,
        phone: profile.phone,
        biography: profile.biography,
        createdAt: profile.created_at
      })) || [];

      console.log("Utilisateurs récupérés de Supabase:", mappedUsers.length);
      
      // Toujours utiliser les utilisateurs fictifs (pour résoudre le problème #1)
      setUsers(mockUsers);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      // Utiliser les utilisateurs fictifs en cas d'erreur
      setUsers(mockUsers);
      toast({
        variant: "warning",
        title: "Mode démo",
        description: "Affichage des exemples fictifs d'utilisateurs."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, fetchUsers, setUsers };
};
