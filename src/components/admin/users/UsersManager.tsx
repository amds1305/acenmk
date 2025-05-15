
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Lock, UserX, UserCheck, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastLoginAt?: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-01',
    lastLoginAt: '2023-05-15',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2023-02-15',
    lastLoginAt: '2023-05-10',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'pending',
    createdAt: '2023-05-05',
  },
];

const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState('user');
  const { toast } = useToast();
  
  // Form state for new user
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  
  useEffect(() => {
    // Dans un vrai environnement, nous ferions un appel API ici
    // Pour l'instant, utilisons les données fictives
    setUsers(mockUsers);
    
    // Pour initialiser le localStorage si ce n'est pas déjà fait
    const storedUsers = localStorage.getItem('adminUsers');
    if (!storedUsers) {
      localStorage.setItem('adminUsers', JSON.stringify(mockUsers));
    } else {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  
  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Utilisateur ajouté",
      description: `${newUserName} a été ajouté avec succès`
    });
    
    resetNewUserForm();
    setIsAddDialogOpen(false);
  };
  
  const handleChangeRole = () => {
    if (!selectedUser || !selectedRole) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, role: selectedRole } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Rôle modifié",
      description: `Le rôle de ${selectedUser.name} a été modifié en ${selectedRole}`
    });
    
    setIsRoleDialogOpen(false);
  };
  
  const handleSuspendUser = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: 'suspended' } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Utilisateur suspendu",
      description: "Le compte utilisateur a été suspendu"
    });
  };
  
  const handleActivateUser = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: 'active' } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Utilisateur activé",
      description: "Le compte utilisateur a été activé"
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Utilisateur supprimé",
      description: "Le compte utilisateur a été supprimé définitivement"
    });
  };
  
  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsRoleDialogOpen(true);
  };
  
  const resetNewUserForm = () => {
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspendu</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>Gérez les comptes utilisateurs et leurs permissions</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Ajouter un utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input 
                      id="name" 
                      value={newUserName} 
                      onChange={(e) => setNewUserName(e.target.value)} 
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newUserEmail} 
                      onChange={(e) => setNewUserEmail(e.target.value)} 
                      placeholder="jean@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="business_admin">Administrateur commercial</SelectItem>
                        <SelectItem value="contributor">Contributeur</SelectItem>
                        <SelectItem value="user">Utilisateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddUser}>Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.role === 'admin' ? 'border-red-500 text-red-500' :
                      user.role === 'business_admin' ? 'border-blue-500 text-blue-500' :
                      'border-gray-500'
                    }>
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'business_admin' ? 'Admin commercial' :
                       user.role === 'contributor' ? 'Contributeur' : 'Utilisateur'}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.lastLoginAt || '-'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Modifier le rôle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {/* Implémenter la réinitialisation de mot de passe */}}>
                          <Lock className="mr-2 h-4 w-4" />
                          <span>Réinitialiser le mot de passe</span>
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-amber-600">
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Suspendre</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)} className="text-green-600">
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Activer</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog pour modifier le rôle */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le rôle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedUser && (
              <p className="text-sm text-muted-foreground">
                Modification du rôle pour {selectedUser.name} ({selectedUser.email})
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="role">Nouveau rôle</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="business_admin">Administrateur commercial</SelectItem>
                  <SelectItem value="contributor">Contributeur</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleChangeRole}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManager;
