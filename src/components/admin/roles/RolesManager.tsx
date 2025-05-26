
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Plus, Users, AlertCircle, Info, Check, Shield, ShieldAlert, UserCog } from "lucide-react";
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { getRoleInfo, getRoleLabel, getRoleBadgeVariant, getRoleDescription } from '@/utils/roleUtils';

interface RoleWithUsers {
  role: UserRole;
  userCount: number;
}

const RolesManager: React.FC = () => {
  const [roles, setRoles] = useState<RoleWithUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [usersForRole, setUsersForRole] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Charger les rôles et le compte d'utilisateurs pour chaque rôle
  useEffect(() => {
    const loadRolesWithUserCount = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role, user_id')

        if (roleError) throw roleError;
        
        // Compter le nombre d'utilisateurs par rôle
        const roleCounts: Record<string, number> = {};
        roleData?.forEach(item => {
          roleCounts[item.role] = (roleCounts[item.role] || 0) + 1;
        });
        
        // Créer un tableau de rôles avec leur nombre d'utilisateurs
        // Inclure tous les rôles définis, même ceux sans utilisateurs
        const allRoles: UserRole[] = [
          'visitor', 'client_standard', 'client_premium', 'external_provider', 
          'contributor', 'manager', 'business_admin', 'super_admin'
        ];
        
        const rolesWithCounts = allRoles.map(role => ({
          role,
          userCount: roleCounts[role] || 0
        }));

        // Trier par niveau et catégorie
        rolesWithCounts.sort((a, b) => {
          const infoA = getRoleInfo(a.role);
          const infoB = getRoleInfo(b.role);
          
          // D'abord par niveau (externe/interne)
          if (infoA.level !== infoB.level) {
            return infoA.level === 'external' ? -1 : 1;
          }
          
          // Puis par catégorie
          const categoryOrder = ['visitor', 'client', 'provider', 'staff', 'admin'];
          return categoryOrder.indexOf(infoA.category) - categoryOrder.indexOf(infoB.category);
        });
        
        setRoles(rolesWithCounts);
      } catch (err: any) {
        console.error('Erreur lors du chargement des rôles:', err);
        setError(err.message || 'Impossible de charger les rôles');
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger les données des rôles',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRolesWithUserCount();
  }, [toast]);
  
  // Charger les utilisateurs pour un rôle sélectionné
  const loadUsersForRole = async (role: UserRole) => {
    setSelectedRole(role);
    setIsLoadingUsers(true);
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          profiles:user_id (
            id,
            name,
            email,
            avatar_url
          )
        `)
        .eq('role', role);
        
      if (error) throw error;
      
      setUsersForRole(data || []);
    } catch (err: any) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: `Impossible de charger les utilisateurs pour le rôle ${getRoleLabel(role)}`,
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Obtenir l'icône appropriée pour la catégorie de rôle
  const getRoleCategoryIcon = (role: UserRole) => {
    const info = getRoleInfo(role);
    
    switch(info.category) {
      case 'admin':
        return <ShieldAlert className="h-4 w-4 mr-2" />;
      case 'staff':
        return <Shield className="h-4 w-4 mr-2" />;
      case 'client':
        return <Users className="h-4 w-4 mr-2" />;
      default:
        return <UserCog className="h-4 w-4 mr-2" />;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Rôles</CardTitle>
        <CardDescription>
          Gérez les rôles du système et consultez les utilisateurs associés à chaque rôle
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Chargement des rôles...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Liste des rôles</h3>
                <Button variant="outline" size="sm" disabled>
                  <Plus className="h-4 w-4 mr-1" /> Nouveau rôle
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Rôle</TableHead>
                      <TableHead className="text-right">Utilisateurs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map(({ role, userCount }) => {
                      const badgeVariant = getRoleBadgeVariant(role);
                      return (
                        <TableRow 
                          key={role} 
                          className={`cursor-pointer ${selectedRole === role ? 'bg-accent' : ''}`}
                          onClick={() => loadUsersForRole(role)}
                        >
                          <TableCell>
                            <div className="flex items-center">
                              {getRoleCategoryIcon(role)}
                              <span>{getRoleLabel(role)}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getRoleInfo(role).level === 'internal' ? 'Interne' : 'Externe'}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">{userCount}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 border-t pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-4">
              {selectedRole ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      {getRoleCategoryIcon(selectedRole)}
                      {getRoleLabel(selectedRole)}
                      <Badge className="ml-2" variant={getRoleBadgeVariant(selectedRole) as any}>
                        {getRoleInfo(selectedRole).level === 'internal' ? 'Interne' : 'Externe'}
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{getRoleDescription(selectedRole)}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Utilisateurs avec ce rôle</h4>
                    
                    {isLoadingUsers ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="ml-2">Chargement des utilisateurs...</span>
                      </div>
                    ) : usersForRole.length > 0 ? (
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {usersForRole.map((item) => (
                            <div 
                              key={item.user_id} 
                              className="flex items-center p-2 border rounded-md"
                            >
                              <div 
                                className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3 overflow-hidden"
                              >
                                {item.profiles?.avatar_url ? (
                                  <img 
                                    src={item.profiles.avatar_url} 
                                    alt={item.profiles.name || 'Utilisateur'} 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="text-xs font-medium">
                                    {(item.profiles?.name?.charAt(0) || '?').toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{item.profiles?.name || 'Utilisateur sans nom'}</div>
                                <div className="text-xs text-muted-foreground">{item.profiles?.email || ''}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Aucun utilisateur n'a ce rôle.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Info className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Sélectionnez un rôle pour voir les détails et les utilisateurs associés
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RolesManager;
