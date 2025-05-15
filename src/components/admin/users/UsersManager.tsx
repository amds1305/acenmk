
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, MoreHorizontal, UserPlus } from 'lucide-react';

// Données fictives pour les utilisateurs
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: null,
    role: 'admin',
    company: 'Admin Corp',
    created_at: '2023-01-15T09:00:00Z',
    last_sign_in: '2023-05-15T09:30:00Z',
    active: true,
  },
  {
    id: '2',
    name: 'Standard User',
    email: 'user@example.com',
    avatar: null,
    role: 'user',
    company: 'User Corp',
    created_at: '2023-02-10T10:30:00Z',
    last_sign_in: '2023-05-14T14:20:00Z',
    active: true,
  },
  {
    id: '3',
    name: 'Client Premium',
    email: 'premium@example.com',
    avatar: null,
    role: 'client_premium',
    company: 'Premium Corp',
    created_at: '2023-03-05T14:20:00Z',
    last_sign_in: '2023-05-10T11:10:00Z',
    active: true,
  },
  {
    id: '4',
    name: 'Nouveau Client',
    email: 'new@example.com',
    avatar: null,
    role: 'user',
    company: 'New Company',
    created_at: '2023-04-01T11:10:00Z',
    last_sign_in: null,
    active: false,
  },
  {
    id: '5',
    name: 'Super Admin',
    email: 'super@example.com',
    avatar: null,
    role: 'super_admin',
    company: 'Admin Solutions',
    created_at: '2023-01-01T08:45:00Z',
    last_sign_in: '2023-05-14T08:45:00Z',
    active: true,
  }
];

// Définir les badges pour les différents rôles
const roleBadges: Record<string, { label: string, variant: 'default' | 'secondary' | 'outline' }> = {
  admin: { label: 'Admin', variant: 'secondary' },
  super_admin: { label: 'Super Admin', variant: 'default' },
  user: { label: 'Utilisateur', variant: 'outline' },
  client_premium: { label: 'Client Premium', variant: 'secondary' },
};

const UsersManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Filtrer les utilisateurs
  const filteredUsers = mockUsers.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company?.toLowerCase().includes(query) ||
      roleBadges[user.role]?.label.toLowerCase().includes(query)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
        <CardDescription>
          Gérez les utilisateurs et leurs permissions dans l'application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou entreprise..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleBadges[user.role]?.variant || 'outline'}>
                      {roleBadges[user.role]?.label || user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.company || '-'}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={user.active ? 'default' : 'outline'}>
                      {user.active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier l'utilisateur</DropdownMenuItem>
                        <DropdownMenuItem>Changer le rôle</DropdownMenuItem>
                        {user.active ? (
                          <DropdownMenuItem>Désactiver le compte</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Activer le compte</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersManager;
