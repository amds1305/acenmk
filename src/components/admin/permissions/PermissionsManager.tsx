
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Info, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { getRoleLabel } from '@/utils/roleUtils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Permission {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
}

interface RolePermission {
  roleId: string;
  role: UserRole;
  permissionId: string;
}

interface PermissionsByCategory {
  [category: string]: Permission[];
}

interface PermissionsManagerProps {
  selectedRole?: UserRole;
}

export const PermissionsManager: React.FC<PermissionsManagerProps> = ({ selectedRole }) => {
  const [activeTab, setActiveTab] = useState<string>('role-permissions');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionsByCategory, setPermissionsByCategory] = useState<PermissionsByCategory>({});
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({});
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<UserRole | undefined>(selectedRole);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Liste des rôles disponibles
  const availableRoles: UserRole[] = [
    'client_standard',
    'client_premium',
    'external_provider',
    'contributor',
    'manager',
    'business_admin',
    'super_admin'
  ];
  
  // Charger les permissions et les associations rôle-permission
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Charger toutes les permissions
        const { data: permissionsData, error: permissionsError } = await supabase
          .from('permissions')
          .select('*')
          .order('category', { ascending: true })
          .order('name', { ascending: true });
          
        if (permissionsError) throw permissionsError;
        
        setPermissions(permissionsData || []);
        
        // Organiser les permissions par catégorie
        const byCategory: PermissionsByCategory = {};
        permissionsData?.forEach(permission => {
          if (!byCategory[permission.category]) {
            byCategory[permission.category] = [];
          }
          byCategory[permission.category].push(permission);
        });
        
        setPermissionsByCategory(byCategory);
        
        // Charger les permissions par rôle
        const rolePermissionsMap: Record<string, string[]> = {};
        
        // Pour chaque rôle, charger ses permissions
        for (const role of availableRoles) {
          const { data: rolePerms, error: rolePermsError } = await supabase
            .from('role_permissions')
            .select(`
              permission_id,
              permissions (id, code)
            `)
            .eq('role', role);
            
          if (rolePermsError) throw rolePermsError;
          
          // Extraire les codes de permissions pour ce rôle
          const permissionIds = rolePerms?.map(rp => rp.permissions?.code || '') || [];
          rolePermissionsMap[role] = permissionIds.filter(Boolean);
        }
        
        setRolePermissions(rolePermissionsMap);
      } catch (err: any) {
        console.error('Erreur lors du chargement des permissions:', err);
        setError(err.message || 'Impossible de charger les permissions');
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: 'Impossible de charger les permissions',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [selectedRole, toast]);
  
  // Gérer le changement de rôle pour l'édition
  const handleRoleChange = (role: UserRole) => {
    setSelectedRoleForEdit(role);
  };
  
  // Gérer le changement de permission
  const handlePermissionChange = (permissionCode: string, isChecked: boolean) => {
    if (!selectedRoleForEdit) return;
    
    setRolePermissions(prev => {
      const currentPermissions = [...(prev[selectedRoleForEdit] || [])];
      
      if (isChecked && !currentPermissions.includes(permissionCode)) {
        currentPermissions.push(permissionCode);
      } else if (!isChecked && currentPermissions.includes(permissionCode)) {
        const index = currentPermissions.indexOf(permissionCode);
        currentPermissions.splice(index, 1);
      }
      
      return {
        ...prev,
        [selectedRoleForEdit]: currentPermissions
      };
    });
  };
  
  // Sauvegarder les changements de permissions
  const handleSavePermissions = async () => {
    if (!selectedRoleForEdit) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const role = selectedRoleForEdit;
      const permissionCodes = rolePermissions[role] || [];
      
      // Récupérer les IDs des permissions à partir des codes
      const permissionMap = permissions.reduce((map: Record<string, string>, p) => {
        map[p.code] = p.id;
        return map;
      }, {});
      
      // 1. Supprimer toutes les permissions actuelles du rôle
      const { error: deleteError } = await supabase
        .from('role_permissions')
        .delete()
        .eq('role', role);
        
      if (deleteError) throw deleteError;
      
      // 2. Ajouter les nouvelles permissions
      if (permissionCodes.length > 0) {
        const rolePermissionsToInsert = permissionCodes
          .filter(code => permissionMap[code]) // Ne garder que les codes valides
          .map(code => ({
            role,
            permission_id: permissionMap[code]
          }));
          
        if (rolePermissionsToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('role_permissions')
            .insert(rolePermissionsToInsert);
            
          if (insertError) throw insertError;
        }
      }
      
      setSuccess(`Permissions pour ${getRoleLabel(role)} mises à jour avec succès`);
      toast({
        title: 'Succès',
        description: `Permissions pour ${getRoleLabel(role)} mises à jour`,
      });
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde des permissions:', err);
      setError(err.message || 'Impossible de sauvegarder les permissions');
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder les permissions',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Vérifier si une permission est attribuée à un rôle
  const hasPermission = (role: UserRole, permissionCode: string): boolean => {
    return rolePermissions[role]?.includes(permissionCode) || false;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des Permissions</CardTitle>
        <CardDescription>
          Gérez les permissions attribuées à chaque rôle dans le système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="role-permissions">Permissions par Rôle</TabsTrigger>
            <TabsTrigger value="permissions-list">Liste des Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="role-permissions">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Chargement des permissions...</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-full md:w-64">
                    <Label className="mb-2 block">Sélectionner un rôle:</Label>
                    <div className="space-y-2">
                      {availableRoles.map(role => (
                        <Button
                          key={role}
                          variant={selectedRoleForEdit === role ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleRoleChange(role)}
                        >
                          {getRoleLabel(role)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                    {selectedRoleForEdit ? (
                      <>
                        <h3 className="text-lg font-semibold mb-4">
                          Permissions pour {getRoleLabel(selectedRoleForEdit)}
                        </h3>
                        
                        {error && (
                          <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}
                        
                        {success && (
                          <Alert variant="default" className="mb-4 bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-600" />
                            <AlertTitle>Succès</AlertTitle>
                            <AlertDescription>{success}</AlertDescription>
                          </Alert>
                        )}
                        
                        <ScrollArea className="h-[50vh]">
                          <div className="space-y-6 pr-4">
                            {Object.entries(permissionsByCategory).map(([category, perms]) => (
                              <div key={category} className="space-y-2">
                                <h4 className="font-medium border-b pb-1">{category}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {perms.map(permission => (
                                    <div key={permission.id} className="flex items-start space-x-2">
                                      <Checkbox
                                        id={permission.id}
                                        checked={hasPermission(selectedRoleForEdit, permission.code)}
                                        onCheckedChange={(checked) => 
                                          handlePermissionChange(permission.code, !!checked)
                                        }
                                      />
                                      <div className="grid gap-1.5">
                                        <Label
                                          htmlFor={permission.id}
                                          className="font-medium"
                                        >
                                          {permission.name}
                                        </Label>
                                        {permission.description && (
                                          <p className="text-sm text-muted-foreground">
                                            {permission.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        <div className="mt-6 flex justify-end">
                          <Button
                            onClick={handleSavePermissions}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Enregistrement...
                              </>
                            ) : (
                              'Enregistrer les modifications'
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10">
                        <Info className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Sélectionnez un rôle pour gérer ses permissions
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="permissions-list">
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Chargement des permissions...</span>
                </div>
              ) : (
                Object.entries(permissionsByCategory).map(([category, perms]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-2">{category}</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3">Nom</th>
                            <th className="text-left p-3">Code</th>
                            <th className="text-left p-3 hidden md:table-cell">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {perms.map(permission => (
                            <tr key={permission.id}>
                              <td className="p-3">{permission.name}</td>
                              <td className="p-3">
                                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                                  {permission.code}
                                </code>
                              </td>
                              <td className="p-3 hidden md:table-cell">{permission.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PermissionsManager;
