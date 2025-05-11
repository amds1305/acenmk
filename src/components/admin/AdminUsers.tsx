import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserPlus, Copy, Mail, User, Lock, Edit, Trash2 } from 'lucide-react';
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserData {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editedRole, setEditedRole] = useState('user');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, role, created_at');

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des utilisateurs",
          variant: "destructive"
        });
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Unexpected error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors du chargement des utilisateurs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const { data: newUser, error } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
        options: {
          data: {
            role: newRole,
          },
        },
      });

      if (error) {
        console.error('Error creating user:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'utilisateur",
          variant: "destructive"
        });
      } else {
        console.log('User created successfully:', newUser);
        toast({
          title: "Succès",
          description: "Utilisateur créé avec succès"
        });
        fetchUsers();
        setIsCreateModalOpen(false);
        setNewEmail('');
        setNewPassword('');
        setNewRole('user');
      }
    } catch (error) {
      console.error('Unexpected error creating user:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la création de l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const updateUserRole = async () => {
    if (!selectedUser) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ role: editedRole })
        .eq('id', selectedUser.id);

      if (error) {
        console.error('Error updating user role:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le rôle de l'utilisateur",
          variant: "destructive"
        });
      } else {
        console.log('User role updated successfully');
        toast({
          title: "Succès",
          description: "Rôle de l'utilisateur mis à jour avec succès"
        });
        fetchUsers();
        setIsEditModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Unexpected error updating user role:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la mise à jour du rôle de l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        console.error('Error deleting user:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'utilisateur",
          variant: "destructive"
        });
      } else {
        console.log('User deleted successfully');
        toast({
          title: "Succès",
          description: "Utilisateur supprimé avec succès"
        });
        fetchUsers();
      }
    } catch (error) {
      console.error('Unexpected error deleting user:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la suppression de l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const copyUserId = (userId: string) => {
    navigator.clipboard.writeText(userId);
    toast({
      title: "ID copié",
      description: "L'ID de l'utilisateur a été copié dans le presse-papiers"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
        <CardDescription>
          Créez, modifiez et gérez les utilisateurs de la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button><UserPlus className="mr-2 h-4 w-4" /> Ajouter un utilisateur</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouvel utilisateur à la base de données.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Mot de passe
                  </Label>
                  <Input type="password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rôle
                  </Label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={createUser}>
                Créer l'utilisateur
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div>Chargement des utilisateurs...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Badge>Administrateur</Badge>
                      ) : (
                        <Badge className="bg-green-500 hover:bg-green-600">Utilisateur</Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => copyUserId(user.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copier l'ID
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedUser(user);
                            setEditedRole(user.role);
                            setIsEditModalOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier le rôle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Edit User Role Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier le rôle de l'utilisateur</DialogTitle>
              <DialogDescription>
                Sélectionnez le nouveau rôle pour cet utilisateur.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rôle
                  </Label>
                  <Select value={editedRole} onValueChange={setEditedRole}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <Button onClick={updateUserRole}>
              Mettre à jour le rôle
            </Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
