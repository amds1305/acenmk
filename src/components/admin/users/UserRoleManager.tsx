
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldAlert, Shield, User as UserIcon, Users } from 'lucide-react';
import { getRoleBadgeVariant, getRoleLabel, getRolesByLevel, getRoleDescription, getRoleInfo } from '@/utils/roleUtils';
import { Badge } from '@/components/ui/badge';

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
            description: `L'utilisateur a maintenant le rôle: ${getRoleLabel(targetRole)}`,
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
        description: `L'utilisateur a maintenant le rôle: ${getRoleLabel(targetRole)}`,
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
    
    // Si on passe à admin, business_admin ou super_admin, demander confirmation
    if (['admin', 'business_admin', 'super_admin'].includes(role)) {
      setIsPromotingToAdmin(true);
      setIsConfirmDialogOpen(true);
    } else {
      // Sinon, appliquer directement
      handlePromoteUser();
    }
  };

  // Get the appropriate icon for each role category
  const getRoleIcon = (role: UserRole) => {
    const info = getRoleInfo(role);
    
    switch(info.category) {
      case 'admin':
        return <ShieldAlert className="h-4 w-4 mr-1" />;
      case 'staff':
        return <Users className="h-4 w-4 mr-1" />;
      case 'provider':
        return <Shield className="h-4 w-4 mr-1" />;
      default:
        return <UserIcon className="h-4 w-4 mr-1" />;
    }
  };

  const externalRoles = getRolesByLevel('external').filter(role => role !== 'visitor');
  const internalRoles = getRolesByLevel('internal');

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium mb-2">Changer le rôle utilisateur:</p>
          
          <Select 
            value={targetRole || currentRole} 
            onValueChange={(value) => handleChangeRole(value as UserRole)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Utilisateurs Externes</SelectLabel>
                {externalRoles.map(role => (
                  <SelectItem key={role} value={role}>
                    <div className="flex items-center">
                      {getRoleIcon(role)}
                      <span>{getRoleLabel(role)}</span>
                      {currentRole === role && <Badge className="ml-2 h-5 px-1">Actuel</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Utilisateurs Internes</SelectLabel>
                {internalRoles.map(role => (
                  <SelectItem key={role} value={role}>
                    <div className="flex items-center">
                      {getRoleIcon(role)}
                      <span>{getRoleLabel(role)}</span>
                      {currentRole === role && <Badge className="ml-2 h-5 px-1">Actuel</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-xs text-muted-foreground">
            <p>{getRoleDescription(currentRole)}</p>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            Statut actuel: <Badge variant={getRoleBadgeVariant(currentRole) as any}>{getRoleLabel(currentRole)}</Badge>
          </p>
        </div>
      </div>

      {/* Dialogue de confirmation pour les rôles admin */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Promotion au rôle administrateur</AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point d'attribuer des privilèges d'administration à cet utilisateur. 
              Cette action lui donnera un accès étendu au système selon le rôle sélectionné.
              {targetRole === 'super_admin' && (
                <p className="font-semibold mt-2 text-destructive">
                  ATTENTION: Le rôle Super Administrateur accorde un contrôle total sur l'ensemble du système.
                </p>
              )}
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
