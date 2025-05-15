
import React, { useState } from 'react';
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
import { MoreHorizontal, Search, Plus, ExternalLink } from 'lucide-react';
import { iconsMap } from '@/components/admin/header/iconsMap';

// Données fictives pour les liens externes
const mockExternalLinks = [
  {
    id: '1',
    name: 'Gmail',
    url: 'https://gmail.com',
    icon: 'Mail',
    requires_auth: true,
    allowed_roles: ['admin', 'user', 'client_premium'],
    created_at: '2023-01-15T09:00:00Z',
  },
  {
    id: '2',
    name: 'Google Drive',
    url: 'https://drive.google.com',
    icon: 'FileBox',
    requires_auth: true,
    allowed_roles: ['admin', 'client_premium'],
    created_at: '2023-02-10T10:30:00Z',
  },
  {
    id: '3',
    name: 'Slack',
    url: 'https://slack.com',
    icon: 'MessageSquare',
    requires_auth: true,
    allowed_roles: ['admin'],
    created_at: '2023-03-05T14:20:00Z',
  },
  {
    id: '4',
    name: 'Documentation API',
    url: 'https://api.example.com/docs',
    icon: 'FileText',
    requires_auth: false,
    allowed_roles: [],
    created_at: '2023-04-01T11:10:00Z',
  },
  {
    id: '5',
    name: 'Outil Analytics',
    url: 'https://analytics.example.com',
    icon: 'BarChart',
    requires_auth: true,
    allowed_roles: ['admin', 'super_admin'],
    created_at: '2023-01-01T08:45:00Z',
  }
];

const ExternalLinksManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrer les liens
  const filteredLinks = mockExternalLinks.filter(link => {
    const query = searchQuery.toLowerCase();
    return (
      link.name.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.icon.toLowerCase().includes(query)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des liens externes</CardTitle>
        <CardDescription>
          Gérez les liens vers des applications et des ressources externes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un lien..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau lien
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Icône</TableHead>
                <TableHead>Authentification</TableHead>
                <TableHead>Rôles autorisés</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLinks.map((link) => {
                const IconComponent = iconsMap[link.icon] || ExternalLink;
                
                return (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.name}</TableCell>
                    <TableCell>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        {new URL(link.url).hostname}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <IconComponent className="h-5 w-5 mr-2" />
                        {link.icon}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.requires_auth ? 'default' : 'outline'}>
                        {link.requires_auth ? 'Requis' : 'Public'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {link.requires_auth && link.allowed_roles.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {link.allowed_roles.map((role) => (
                            <Badge key={role} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        link.requires_auth ? 'Tous les utilisateurs' : 'Aucune restriction'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Gérer les rôles</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalLinksManager;
