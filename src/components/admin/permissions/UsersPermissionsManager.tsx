
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ShieldAlert, CheckSquare, XSquare, Edit2 } from 'lucide-react';
import { User, UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { getRoleLabel, getRoleBadgeVariant } from '@/utils/roleUtils';

const UsersPermissionsManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionsMap, setPermissionsMap] = useState<Record<string, string[]>>({});
  
  const { toast } = useToast();
  
  // Définir des permissions de base par défaut
  const commonPermissions = [
    'view_profile', 'edit_profile', 
    'view_projects', 'create_projects', 'edit_projects',
    'view_messages', 'send_messages'
  ];
  
  const adminPermissions = [
    ...commonPermissions,
    'manage_users', 'manage_roles', 'manage_site', 'delete_users',
    'view_analytics', 'manage_templates', 'manage_billing'
  ];
  
  useEffect(() => {
    // Charger tous les utilisateurs
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
          
        if (profilesError) throw profilesError;
        
        // Récupérer les rôles des utilisateurs
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('*');
          
        if (rolesError) throw rolesError;
        
        // Mapper les rôles aux utilisateurs
        const mappedUsers = profiles.map(profile => {
          const userRole = userRoles.find(role => role.user_id === profile.id);
          return {
            id: profile.id,
            email: profile.email,
            name: profile.name || profile.email?.split('@')[0] || 'Sans nom',
            role: (userRole?.role || 'user') as UserRole,
            avatar: profile.avatar_url,
            createdAt: profile.created_at
          } as User;
        });
        
        setUsers(mappedUsers);
        
        // Simuler une carte de permissions selon les rôles
        const permMap: Record<string, string[]> = {};
        
        mappedUsers.forEach(user => {
          if (user.role === 'super_admin' || user.role === 'business_admin' || user.role === 'admin') {
            permMap[user.id] = adminPermissions;
          } else if (user.role === 'manager') {
            permMap[user.id] = [...commonPermissions, 'view_analytics', 'manage_projects'];
          } else if (user.role === 'contributor') {
            permMap[user.id] = [...commonPermissions, 'create_content', 'edit_content'];
          } else {
            permMap[user.id] = ['view_profile', 'edit_profile', 'view_projects', 'view_messages', 'send_messages'];
          }
        });
        
        setPermissionsMap(permMap);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les données des utilisateurs."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);
  
  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  const handleUpdatePermission = (permission: string, hasPermission: boolean) => {
    if (!selectedUser) return;
    
    setPermissionsMap(prev => {
      const userPermissions = [...(prev[selectedUser.id] || [])];
      
      if (hasPermission) {
        if (!userPermissions.includes(permission)) {
          userPermissions.push(permission);
        }
      } else {
        const index = userPermissions.indexOf(permission);
        if (index !== -1) {
          userPermissions.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        [selectedUser.id]: userPermissions
      };
    });
  };
  
  const handleSavePermissions = async () => {
    // Dans une implémentation réelle, vous enregistreriez ces permissions dans la base de données
    toast({
      title: "Permissions mises à jour",
      description: "Les permissions de l'utilisateur ont été mises à jour avec succès."
    });
    setEditDialogOpen(false);
  };
  
  const hasPermission = (userId: string, permission: string): boolean => {
    return permissionsMap[userId]?.includes(permission) || false;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Permissions</CardTitle>
        <CardDescription>
          Gérez les permissions individuelles des utilisateurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Chargement des données...</span>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role) as any}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {permissionsMap[user.id]?.slice(0, 3).map(perm => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                        {permissionsMap[user.id]?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{permissionsMap[user.id].length - 3} autres
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditPermissions(user)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Dialogue d'édition des permissions */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Modifier les permissions de {selectedUser?.name}
              </DialogTitle>
              <DialogDescription>
                Activez ou désactivez les permissions individuelles pour cet utilisateur.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Permissions de profil</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {['view_profile', 'edit_profile'].map(permission => (
                        <div key={permission} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{permission}</span>
                          <div className="flex gap-2">
                            <Button 
                              variant={hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, true)}
                            >
                              <CheckSquare className="h-4 w-4 mr-1" />
                              Oui
                            </Button>
                            <Button 
                              variant={!hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, false)}
                            >
                              <XSquare className="h-4 w-4 mr-1" />
                              Non
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Permissions de projets</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {['view_projects', 'create_projects', 'edit_projects'].map(permission => (
                        <div key={permission} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{permission}</span>
                          <div className="flex gap-2">
                            <Button 
                              variant={hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, true)}
                            >
                              <CheckSquare className="h-4 w-4 mr-1" />
                              Oui
                            </Button>
                            <Button 
                              variant={!hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, false)}
                            >
                              <XSquare className="h-4 w-4 mr-1" />
                              Non
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Permissions d'administration</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {['manage_users', 'manage_roles', 'manage_site', 'view_analytics'].map(permission => (
                        <div key={permission} className="flex items-center justify-between p-2 border rounded-md">
                          <span className="text-sm">{permission}</span>
                          <div className="flex gap-2">
                            <Button 
                              variant={hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, true)}
                            >
                              <CheckSquare className="h-4 w-4 mr-1" />
                              Oui
                            </Button>
                            <Button 
                              variant={!hasPermission(selectedUser?.id || '', permission) ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleUpdatePermission(permission, false)}
                            >
                              <XSquare className="h-4 w-4 mr-1" />
                              Non
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSavePermissions}>
                Enregistrer les modifications
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UsersPermissionsManager;
