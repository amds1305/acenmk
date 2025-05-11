
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Users, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';

// Type pour les groupes d'utilisateurs
interface UserGroup {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  permissions?: string[];
  createdAt: string;
}

// Groupes fictifs pour le mode test
const mockGroups: UserGroup[] = [
  {
    id: "group1",
    name: "Administrateurs",
    description: "Équipe d'administration avec accès complet",
    memberCount: 3,
    permissions: ["admin_access", "manage_users", "manage_content"],
    createdAt: new Date(Date.now() - 7884000000).toISOString(),
  },
  {
    id: "group2",
    name: "Éditeurs",
    description: "Peuvent éditer le contenu du site",
    memberCount: 5,
    permissions: ["edit_content", "publish_content"],
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "group3",
    name: "Clients Premium",
    description: "Clients avec accès aux fonctionnalités premium",
    memberCount: 12,
    permissions: ["access_premium"],
    createdAt: new Date(Date.now() - 15768000000).toISOString(),
  },
  {
    id: "group4",
    name: "Marketing",
    description: "Équipe marketing",
    memberCount: 4,
    permissions: ["view_analytics", "edit_content"],
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
  }
];

// Permissions disponibles pour l'attribution
const availablePermissions = [
  { id: "admin_access", name: "Accès administrateur" },
  { id: "manage_users", name: "Gérer les utilisateurs" },
  { id: "manage_content", name: "Gérer le contenu" },
  { id: "edit_content", name: "Éditer le contenu" },
  { id: "publish_content", name: "Publier du contenu" },
  { id: "view_analytics", name: "Voir les analyses" },
  { id: "access_premium", name: "Accès aux fonctionnalités premium" },
  { id: "manage_billing", name: "Gérer la facturation" },
];

const GroupsManager: React.FC = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState<Partial<UserGroup>>({ name: '', description: '' });
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { toast } = useToast();

  // Charger les groupes d'utilisateurs
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setIsLoading(true);
    
    try {
      // In testing mode, load mock groups
      console.log("Mode test activé, chargement des groupes fictifs");
      setGroups(mockGroups);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les groupes d'utilisateurs."
      });
      
      // En cas d'erreur, utiliser les groupes fictifs comme fallback
      setGroups(mockGroups);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGroup = async () => {
    if (!newGroup.name) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom du groupe est requis."
      });
      return;
    }

    try {
      // Mode test - simuler l'ajout
      const newId = `group${groups.length + 1}`;
      const createdGroup: UserGroup = {
        id: newId,
        name: newGroup.name,
        description: newGroup.description || '',
        memberCount: 0,
        permissions: selectedPermissions,
        createdAt: new Date().toISOString()
      };
      
      setGroups([...groups, createdGroup]);
      
      toast({
        title: "Groupe ajouté",
        description: "Le groupe a été créé avec succès."
      });
      
      // Réinitialiser le formulaire
      setNewGroup({ name: '', description: '' });
      setSelectedPermissions([]);
      setIsAddDialogOpen(false);
      
    } catch (error) {
      console.error("Erreur lors de la création du groupe:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le groupe."
      });
    }
  };

  const handleUpdateGroup = async () => {
    if (!editingGroup || !editingGroup.name) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Informations de groupe invalides."
      });
      return;
    }

    try {
      // Mode test - simuler la mise à jour
      const updatedGroups = groups.map(group => 
        group.id === editingGroup.id 
          ? { ...group, name: editingGroup.name, description: editingGroup.description, permissions: selectedPermissions } 
          : group
      );
      
      setGroups(updatedGroups);
      
      toast({
        title: "Groupe mis à jour",
        description: "Le groupe a été modifié avec succès."
      });
      
      setIsEditDialogOpen(false);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour du groupe:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le groupe."
      });
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce groupe ?")) return;

    try {
      // Mode test - simuler la suppression
      const filteredGroups = groups.filter(group => group.id !== groupId);
      setGroups(filteredGroups);
      
      toast({
        title: "Groupe supprimé",
        description: "Le groupe a été supprimé avec succès."
      });
      
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le groupe."
      });
    }
  };

  const handleEditClick = (group: UserGroup) => {
    setEditingGroup(group);
    setSelectedPermissions(group.permissions || []);
    setIsEditDialogOpen(true);
  };

  const handleViewMembers = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsMembersDialogOpen(true);
    // Dans une implémentation réelle, il faudrait charger les membres du groupe
  };

  const handlePermissionToggle = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Groupes d'utilisateurs</CardTitle>
          <CardDescription>
            Gérez les groupes et assignez des permissions
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchGroups}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Nouveau groupe
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {groups.length === 0 ? (
          <div className="text-center p-8">
            {isLoading ? (
              <div className="flex justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-muted-foreground">Aucun groupe trouvé</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Créer un groupe
                </Button>
              </>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Membres</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.description || '-'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewMembers(group.id)}
                    >
                      {group.memberCount} {group.memberCount > 1 ? 'membres' : 'membre'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(group.permissions || []).slice(0, 2).map(permission => (
                        <Badge key={permission} variant="secondary">
                          {availablePermissions.find(p => p.id === permission)?.name || permission}
                        </Badge>
                      ))}
                      {(group.permissions || []).length > 2 && (
                        <Badge variant="outline">
                          +{(group.permissions || []).length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditClick(group)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Modal d'ajout de groupe */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau groupe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="group-name">Nom du groupe</Label>
                <Input 
                  id="group-name" 
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  placeholder="Ex: Administrateurs"
                />
              </div>
              <div>
                <Label htmlFor="group-description">Description</Label>
                <Input 
                  id="group-description" 
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  placeholder="Description du groupe et de ses fonctions"
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <ScrollArea className="h-[200px] border rounded-md p-4">
                  <div className="space-y-2">
                    {availablePermissions.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`permission-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <Label 
                          htmlFor={`permission-${permission.id}`}
                          className="cursor-pointer"
                        >
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddGroup}>Créer le groupe</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal d'édition de groupe */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le groupe</DialogTitle>
            </DialogHeader>
            {editingGroup && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-group-name">Nom du groupe</Label>
                  <Input 
                    id="edit-group-name" 
                    value={editingGroup.name}
                    onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-group-description">Description</Label>
                  <Input 
                    id="edit-group-description" 
                    value={editingGroup.description || ''}
                    onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Permissions</Label>
                  <ScrollArea className="h-[200px] border rounded-md p-4">
                    <div className="space-y-2">
                      {availablePermissions.map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`edit-permission-${permission.id}`}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <Label 
                            htmlFor={`edit-permission-${permission.id}`}
                            className="cursor-pointer"
                          >
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleUpdateGroup}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal d'affichage des membres */}
        <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                Membres du groupe {groups.find(g => g.id === selectedGroupId)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center text-muted-foreground">
              <p>Cette fonctionnalité sera disponible prochainement.</p>
              <p className="mt-2">Elle permettra d'ajouter et de supprimer des utilisateurs du groupe.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsMembersDialogOpen(false)}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GroupsManager;
