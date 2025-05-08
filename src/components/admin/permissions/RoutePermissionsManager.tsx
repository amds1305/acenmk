
import React, { useState, useMemo } from 'react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { PermissionRule, RouteWithAccess } from '@/types/permissions';
import { User, UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Lock,
  Globe,
  Users,
  Search,
  KeyRound,
  Shield,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Settings
} from 'lucide-react';
import { getRoleInfo } from '@/utils/roleUtils';

const RoutePermissionsManager: React.FC = () => {
  const { accessConfig, isLoading, updateRouteAccess, savePermissions } = usePermissions();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublicFilter, setIsPublicFilter] = useState<boolean | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPermission, setEditingPermission] = useState<PermissionRule | null>(null);
  
  // Combinaison de toutes les routes (publiques et admin)
  const allRoutes = useMemo(() => {
    const routes: Record<string, PermissionRule> = {};
    
    // Routes normales
    Object.entries(accessConfig.routes).forEach(([path, permission]) => {
      routes[path] = permission;
    });
    
    // Routes admin avec préfixe /admin
    Object.entries(accessConfig.adminRoutes).forEach(([path, permission]) => {
      routes[`/admin/${path}`] = permission;
    });
    
    return routes;
  }, [accessConfig]);
  
  // Liste des rôles disponibles
  const availableRoles: UserRole[] = [
    'user', 'client_standard', 'client_premium', 'contributor', 'manager', 
    'business_admin', 'admin', 'super_admin'
  ];
  
  // Filtrer les routes selon la recherche et le filtre public/privé
  const filteredRoutes = useMemo(() => {
    return Object.entries(allRoutes)
      .filter(([path, permission]) => {
        // Filtre par recherche
        if (searchQuery && !path.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filtre par type (public/privé)
        if (isPublicFilter !== null && permission.isPublic !== isPublicFilter) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Trier d'abord par type (admin/non-admin)
        if (a[0].startsWith('/admin') && !b[0].startsWith('/admin')) return 1;
        if (!a[0].startsWith('/admin') && b[0].startsWith('/admin')) return -1;
        
        // Puis par chemin
        return a[0].localeCompare(b[0]);
      });
  }, [allRoutes, searchQuery, isPublicFilter]);

  // Ouvrir le dialogue d'édition
  const handleEditRoute = (path: string, permission: PermissionRule) => {
    setSelectedRoute(path);
    setEditingPermission({
      isPublic: permission.isPublic,
      allowedRoles: [...permission.allowedRoles],
      description: permission.description
    });
    setDialogOpen(true);
  };

  // Mettre à jour une permission
  const handleUpdatePermission = async () => {
    if (!selectedRoute || !editingPermission) return;
    
    try {
      await updateRouteAccess(selectedRoute, editingPermission);
      setDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la permission:', error);
    }
  };

  // Toggle le rôle dans la liste des rôles autorisés
  const toggleRole = (role: UserRole) => {
    if (!editingPermission) return;
    
    const updatedRoles = editingPermission.allowedRoles.includes(role)
      ? editingPermission.allowedRoles.filter(r => r !== role)
      : [...editingPermission.allowedRoles, role];
      
    setEditingPermission({
      ...editingPermission,
      allowedRoles: updatedRoles
    });
  };

  // Sauvegarder toutes les modifications
  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      await savePermissions();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des permissions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle>Gestion des accès aux rubriques</CardTitle>
            <CardDescription>
              Configurez les accès aux différentes rubriques du site selon les rôles utilisateur
            </CardDescription>
          </div>
          <Button 
            onClick={handleSaveAll} 
            disabled={isLoading || isSaving}
            className="self-start"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isPublicFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublicFilter(null)}
            >
              <Users className="mr-2 h-4 w-4" />
              Tous
            </Button>
            <Button
              variant={isPublicFilter === true ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublicFilter(true)}
            >
              <Globe className="mr-2 h-4 w-4" />
              Public
            </Button>
            <Button
              variant={isPublicFilter === false ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublicFilter(false)}
            >
              <Lock className="mr-2 h-4 w-4" />
              Restreint
            </Button>
          </div>
        </div>
        
        {/* Tableau des routes */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Chargement des permissions...</span>
          </div>
        ) : filteredRoutes.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucune route trouvée</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Aucune route ne correspond à vos critères de recherche.
            </p>
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chemin</TableHead>
                  <TableHead>Visibilité</TableHead>
                  <TableHead>Rôles autorisés</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoutes.map(([path, permission]) => (
                  <TableRow key={path}>
                    <TableCell>
                      <div className="font-medium">{path}</div>
                      {permission.description && (
                        <div className="text-sm text-muted-foreground">{permission.description}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {permission.isPublic ? (
                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                          <Globe className="h-3 w-3" />
                          Public
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Lock className="h-3 w-3" />
                          Restreint
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {permission.allowedRoles.slice(0, 3).map(role => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {getRoleInfo(role).name}
                          </Badge>
                        ))}
                        {permission.allowedRoles.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{permission.allowedRoles.length - 3} autres
                          </Badge>
                        )}
                        {permission.allowedRoles.length === 0 && (
                          <span className="text-xs text-muted-foreground">
                            Aucun rôle autorisé
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRoute(path, permission)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configurer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      {/* Dialogue d'édition des permissions */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configurer les accès</DialogTitle>
            <DialogDescription>
              {selectedRoute}
            </DialogDescription>
          </DialogHeader>
          
          {editingPermission && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="visibility">Visibilité</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox 
                    id="isPublic" 
                    checked={editingPermission.isPublic}
                    onCheckedChange={(checked) => 
                      setEditingPermission({
                        ...editingPermission,
                        isPublic: checked === true
                      })
                    }
                  />
                  <label
                    htmlFor="isPublic"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accès public (visible par tous)
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rôles autorisés</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Les rôles sélectionnés pourront accéder à cette rubrique, même si elle n'est pas publique
                </div>
                
                <ScrollArea className="h-48 border rounded-md p-2">
                  <div className="space-y-2">
                    {availableRoles.map(role => {
                      const roleInfo = getRoleInfo(role);
                      return (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`role-${role}`}
                            checked={editingPermission.allowedRoles.includes(role)}
                            onCheckedChange={() => toggleRole(role)}
                          />
                          <label
                            htmlFor={`role-${role}`}
                            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <Badge variant="outline" className="mr-2">
                              {roleInfo.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{roleInfo.description}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Input 
                  id="description" 
                  value={editingPermission.description || ''}
                  onChange={(e) => setEditingPermission({
                    ...editingPermission,
                    description: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdatePermission}>
              Appliquer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RoutePermissionsManager;
