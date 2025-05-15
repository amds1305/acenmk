
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, ExternalLink } from 'lucide-react';

// Données fictives pour les clients de confiance
const mockClients = [
  {
    id: '1',
    name: 'Microsoft',
    logo_url: 'https://placehold.co/100x50/eee/333?text=Microsoft',
    website_url: 'https://microsoft.com',
    category: 'Technologie',
    created_at: '2023-01-15T09:00:00Z',
  },
  {
    id: '2',
    name: 'Google',
    logo_url: 'https://placehold.co/100x50/eee/333?text=Google',
    website_url: 'https://google.com',
    category: 'Technologie',
    created_at: '2023-02-10T10:30:00Z',
  },
  {
    id: '3',
    name: 'Amazon',
    logo_url: 'https://placehold.co/100x50/eee/333?text=Amazon',
    website_url: 'https://amazon.com',
    category: 'E-commerce',
    created_at: '2023-03-05T14:20:00Z',
  },
  {
    id: '4',
    name: 'Facebook',
    logo_url: 'https://placehold.co/100x50/eee/333?text=Facebook',
    website_url: 'https://facebook.com',
    category: 'Réseaux sociaux',
    created_at: '2023-04-01T11:10:00Z',
  },
  {
    id: '5',
    name: 'Apple',
    logo_url: 'https://placehold.co/100x50/eee/333?text=Apple',
    website_url: 'https://apple.com',
    category: 'Technologie',
    created_at: '2023-01-01T08:45:00Z',
  }
];

const AdminTrustedClientsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Filtrer les clients
  const filteredClients = mockClients.filter(client => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.category?.toLowerCase().includes(query)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logos clients de confiance</CardTitle>
        <CardDescription>
          Gérez les logos de clients à afficher sur votre site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un logo client
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Site web</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <img
                      src={client.logo_url}
                      alt={`Logo ${client.name}`}
                      className="h-10 max-w-[100px] object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.category || '-'}</TableCell>
                  <TableCell>
                    {client.website_url ? (
                      <a
                        href={client.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        {new URL(client.website_url).hostname}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
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

export default AdminTrustedClientsList;
