
import { useState, useEffect } from 'react';
import { User, Message, UserPreferences, LoginHistory } from '../types/auth';
import { MOCK_MESSAGES } from '../data/mockUsers';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const { toast } = useToast();

  // Vérifier et charger la session Supabase au démarrage
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      
      // Récupérer la session et les données utilisateur de Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await fetchAndSetUserData(session.user.id);
      }
      
      setIsLoading(false);
    };
    
    checkSession();
    
    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await fetchAndSetUserData(session.user.id);
        } else {
          setUser(null);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  // Récupérer les données utilisateur complètes depuis la base de données
  const fetchAndSetUserData = async (userId: string) => {
    try {
      // Récupérer le profil utilisateur
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;
      
      // Récupérer le rôle utilisateur
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (roleError) throw roleError;

      // Construire l'objet utilisateur complet
      const userData: User = {
        id: userId,
        email: profileData.email,
        name: profileData.name,
        role: roleData.role,
        company: profileData.company || undefined,
        phone: profileData.phone || undefined,
        avatar: profileData.avatar_url || undefined,
        biography: profileData.biography || undefined,
        createdAt: new Date().toISOString(), // À mettre à jour si disponible
        lastLoginDate: new Date().toISOString(),
        projects: [],
        estimates: []
      };
      
      setUser(userData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // fetchAndSetUserData sera appelé via onAuthStateChange
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté."
      });
      
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Identifiants invalides';
      setIsLoading(false);
      return Promise.reject(new Error(errorMessage));
    }
  };

  const register = async (name: string, email: string, password: string, company?: string, phone?: string) => {
    setIsLoading(true);

    try {
      // Inscription via Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            phone
          }
        }
      });
      
      if (error) throw error;
      
      // Si nécessaire, ajouter des données supplémentaires au profil
      // Cela peut ne pas être nécessaire si un déclencheur gère la création du profil
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user?.id,
          name,
          email,
          company,
          phone
        });
        
      if (profileError) throw profileError;
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès."
      });
      
      return Promise.resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      setIsLoading(false);
      return Promise.reject(new Error(errorMessage));
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);

    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      // Mise à jour des informations de profil dans Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          company: data.company,
          phone: data.phone,
          biography: data.biography,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Si le rôle est modifié, mettre à jour dans la table user_roles
      if (data.role && data.role !== user.role) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: data.role })
          .eq('user_id', user.id);
          
        if (roleError) throw roleError;
      }
      
      // Mettre à jour l'état local
      setUser({ ...user, ...data });
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès."
      });
      
      setIsLoading(false);
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La mise à jour du profil a échoué."
      });
      return Promise.reject(error);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    setIsLoading(true);
    
    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Télécharger le fichier dans le bucket storage
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Obtenir l'URL publique
      const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const avatarUrl = data.publicUrl;
      
      // Mettre à jour le profil avec la nouvelle URL d'avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      // Mettre à jour l'état local
      setUser({ ...user, avatar: avatarUrl });
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été modifiée avec succès."
      });
      
      setIsLoading(false);
      return Promise.resolve(avatarUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'avatar:", error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le téléchargement de l'avatar a échoué."
      });
      return Promise.reject("");
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Vérifier le mot de passe actuel en tentant de se connecter
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });
      
      if (signInError) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Le mot de passe actuel est incorrect."
        });
        throw signInError;
      }
      
      // Mettre à jour le mot de passe
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès."
      });
      
      setIsLoading(false);
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const toggleTwoFactor = async (enable: boolean): Promise<void> => {
    setIsLoading(true);
    
    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      // Mettre à jour l'état utilisateur
      setUser({ ...user, twoFactorEnabled: enable });
      
      toast({
        title: enable ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
        description: enable 
          ? "Votre compte est maintenant plus sécurisé." 
          : "L'authentification à deux facteurs a été désactivée."
      });
      
      setIsLoading(false);
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const updatePreferences = async (preferences: UserPreferences): Promise<void> => {
    setIsLoading(true);
    
    try {
      if (!user) throw new Error("Aucun utilisateur connecté");
      
      // Dans un scénario réel, vous enregistreriez ces préférences dans la base de données
      setUser({ ...user, preferences });
      
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences ont été enregistrées avec succès."
      });
      
      setIsLoading(false);
      return Promise.resolve();
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const unreadMessages = messages.filter(message => !message.read && message.sender === 'admin').length;

  return {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    uploadAvatar,
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
    messages,
    unreadMessages
  };
};
