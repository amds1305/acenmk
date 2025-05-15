
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, UserPlus } from 'lucide-react';

const ContactRequestsTable: React.FC = () => {
  // Dans une version réelle, ces données viendraient de Supabase
  const mockRequests = [
    {
      id: '1',
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean.dupont@example.com',
      telephone: '06 12 34 56 78',
      entreprise: 'Dupont Inc.',
      description: 'Demande d\'information sur vos services',
      created_at: '2023-05-15T10:30:00Z',
      converted_to_lead: false
    },
    {
      id: '2',
      prenom: 'Marie',
      nom: 'Martin',
      email: 'marie.martin@example.com',
      telephone: '07 12 34 56 78',
      entreprise: 'Martin SA',
      description: 'Besoin d\'un devis pour un site e-commerce',
      created_at: '2023-05-14T14:20:00Z',
      converted_to_lead: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.prenom} {request.nom}
                </TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.entreprise || '-'}</TableCell>
                <TableCell>
                  {new Date(request.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {request.converted_to_lead ? (
                    <Badge variant="secondary">Converti en lead</Badge>
                  ) : (
                    <Badge variant="outline">Nouveau</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {!request.converted_to_lead && (
                    <Button variant="outline" size="icon">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactRequestsTable;
