
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Shield, 
  Mail, 
  User as UserIcon,
  RefreshCw, 
  Download,
  Filter 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { MOCK_ADMIN_USER, MOCK_USER } from '@/data/mockUsers';

// Sample user data for the admin panel
const mockUsers = [
  MOCK_ADMIN_USER,
  MOCK_USER,
  {
    id: 'user3',
    email: 'premium@example.com',
    name: 'Client Premium',
    role: 'client_premium',
    company: 'Premium Corp',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://i.pravatar.cc/150?u=premium@example.com',
    createdAt: new Date(Date.now() - 7884000000).toISOString(), // 3 months ago
  } as User,
  {
    id: 'user4',
    email: 'new@example.com',
    name: 'Nouveau Client',
    role: 'user',
    company: 'New Company',
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  } as User,
  {
    id: 'user5',
    email: 'super@example.com',
    name: 'Super Admin',
    role: 'super_admin',
    company: 'Admin Solutions',
    phone: '+33 7 98 76 54 32',
    avatar: 'https://i.pravatar.cc/150?u=super@example.com',
    createdAt: new Date(Date.now() - 63072000000).toISOString(), // 2 years ago
  } as User,
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter users based on search term and selected role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role: UserRole) => {
    switch(role) {
      case 'super_admin': return 'destructive';
      case 'admin': return 'default';
      case 'client_premium': return 'orange';
      default: return 'secondary';
    }
  };
  
  const getRoleLabel = (role: UserRole) => {
    switch(role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Administrateur';
      case 'client_premium': return 'Client Premium';
      case 'user': return 'Client';
      default: return role;
    }
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès."
    });
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    // In a real app, this would call an API
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast({
      title: "Rôle mis à jour",
      description: "Le rôle de l'utilisateur a été modifié avec succès."
    });
  };

  // For demonstration purposes only - in a real app, these would do actual operations
  const handleExportUsers = () => {
    toast({
      title: "Export lancé",
      description: "La liste des utilisateurs est en cours d'export."
    });
  };

  const handleRefreshUsers = () => {
    toast({
      title: "Liste actualisée",
      description: "La liste des utilisateurs a été actualisée."
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>
                Gérez les comptes utilisateurs et leurs permissions.
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshUsers}>
                <RefreshCw className="h-4 w-4 mr-1" /> Actualiser
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportUsers}>
                <Download className="h-4 w-4 mr-1" /> Exporter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Rechercher par nom, email, entreprise..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedRole ? getRoleLabel(selectedRole as UserRole) : "Tous les rôles"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filtrer par rôle</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedRole(null)}>
                  Tous les rôles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole('super_admin')}>
                  Super Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole('admin')}>
                  Administrateur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole('client_premium')}>
                  Client Premium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedRole('user')}>
                  Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Utilisateur</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.company && (
                              <p className="text-xs text-muted-foreground hidden sm:block">{user.company}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="font-normal">
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <UserIcon className="h-4 w-4 mr-2" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Envoyer un message
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuLabel>Changer le rôle</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleChangeRole(user.id, 'user')}
                              disabled={user.role === 'user'}
                            >
                              Client
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleChangeRole(user.id, 'client_premium')}
                              disabled={user.role === 'client_premium'}
                            >
                              Client Premium
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleChangeRole(user.id, 'admin')}
                              disabled={user.role === 'admin'}
                            >
                              Administrateur
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleChangeRole(user.id, 'super_admin')}
                              disabled={user.role === 'super_admin'}
                            >
                              Super Admin
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>
              Affichage de {filteredUsers.length} sur {users.length} utilisateurs
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span className="text-xs">Les super-administrateurs ont un accès complet au système</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminUsers;
