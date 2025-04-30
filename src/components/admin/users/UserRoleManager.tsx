
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { User, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldAlert } from 'lucide-react';

interface UserRoleManagerProps {
  userId: string;
  currentRole: UserRole;
  onRoleUpdated: (newRole: UserRole) => void;
}

const UserRoleManager: React.FC<UserRoleManagerProps> = ({ 
  userId, 
  currentRole,
  onRoleUpdated
}) => {
  const [isPromotingToAdmin, setIsPromotingToAdmin] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [targetRole, setTargetRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isTestMode = localStorage.getItem('adminTestMode') === 'true';

  const handlePromoteUser = async () => {
    if (!targetRole) return;
    
    setIsLoading(true);
    
    try {
      // En mode test, simuler la promotion
      if (isTestMode) {
        setTimeout(() => {
          onRoleUpdated(targetRole);
          toast({
            title: 'Rôle modifié (mode test)',
            description: `L'utilisateur a maintenant le rôle: ${targetRole}`,
          });
          setIsLoading(false);
          setIsConfirmDialogOpen(false);
        }, 500);
        return;
      }
      
      // Vérifier si l'utilisateur a déjà un rôle dans user_roles
      const { data: existingRoles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);
        
      if (existingRoles && existingRoles.length > 0) {
        // Mise à jour du rôle existant
        const { error: updateError } = await supabase
          .from('user_roles')
          .update({ role: targetRole })
          .eq('user_id', userId);
          
        if (updateError) throw updateError;
      } else {
        // Création d'un nouveau rôle
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert([{ user_id: userId, role: targetRole }]);
          
        if (insertError) throw insertError;
      }
      
      // Mettre à jour le profil également pour la compatibilité
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: targetRole })
        .eq('id', userId);
        
      if (profileError) {
        console.warn("Impossible de mettre à jour le rôle dans la table profiles:", profileError);
      }
      
      onRoleUpdated(targetRole);
      
      toast({
        title: 'Rôle modifié avec succès',
        description: `L'utilisateur a maintenant le rôle: ${targetRole}`,
      });
    } catch (error) {
      console.error("Erreur lors de la modification du rôle:", error);
      toast({
        variant: 'destructive',
        title: 'Échec de la modification du rôle',
        description: 'Une erreur est survenue lors de la modification du rôle.',
      });
    } finally {
      setIsLoading(false);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleChangeRole = (role: UserRole) => {
    setTargetRole(role);
    
    // Si on passe à admin ou super_admin, demander confirmation
    if (role === 'admin' || role === 'super_admin') {
      setIsPromotingToAdmin(true);
      setIsConfirmDialogOpen(true);
    } else {
      // Sinon, appliquer directement
      handlePromoteUser();
    }
  };

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Changer le rôle utilisateur:</p>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={currentRole === 'user' ? 'default' : 'outline'} 
            onClick={() => handleChangeRole('user')}
            disabled={currentRole === 'user' || isLoading}
          >
            Client
          </Button>
          <Button 
            size="sm" 
            variant={currentRole === 'client_premium' ? 'default' : 'outline'} 
            onClick={() => handleChangeRole('client_premium')}
            disabled={currentRole === 'client_premium' || isLoading}
          >
            Client Premium
          </Button>
          <Button 
            size="sm" 
            variant={currentRole === 'admin' ? 'default' : 'outline'} 
            onClick={() => handleChangeRole('admin')}
            disabled={currentRole === 'admin' || isLoading}
          >
            <ShieldAlert className="h-4 w-4 mr-1" />
            Administrateur
          </Button>
          <Button 
            size="sm" 
            variant={currentRole === 'super_admin' ? 'default' : 'outline'} 
            onClick={() => handleChangeRole('super_admin')}
            disabled={currentRole === 'super_admin' || isLoading}
          >
            <ShieldAlert className="h-4 w-4 mr-1" />
            Super Admin
          </Button>
        </div>
      </div>

      {/* Dialogue de confirmation pour les rôles admin */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promotion au rôle administrateur</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point d'attribuer des privilèges d'administration à cet utilisateur. 
              Cette action lui donnera un accès complet au tableau de bord administratif.
              Êtes-vous sûr de vouloir continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePromoteUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                'Confirmer'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserRoleManager;
