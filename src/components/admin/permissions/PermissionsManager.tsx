
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Info } from 'lucide-react';

const permissions = [
  { id: 'view_users', name: 'Voir les utilisateurs', category: 'Utilisateurs', description: 'Permet de voir la liste des utilisateurs' },
  { id: 'edit_users', name: 'Éditer les utilisateurs', category: 'Utilisateurs', description: 'Permet de modifier les informations des utilisateurs' },
  { id: 'delete_users', name: 'Supprimer les utilisateurs', category: 'Utilisateurs', description: 'Permet de supprimer des utilisateurs' },
  { id: 'view_roles', name: 'Voir les rôles', category: 'Rôles', description: 'Permet de voir la liste des rôles' },
  { id: 'edit_roles', name: 'Éditer les rôles', category: 'Rôles', description: 'Permet de modifier les rôles' },
  { id: 'view_site', name: 'Voir le site', category: 'Site', description: 'Permet de voir le contenu du site' },
  { id: 'edit_site', name: 'Éditer le site', category: 'Site', description: 'Permet de modifier le contenu du site' },
  { id: 'admin_access', name: 'Accès administration', category: 'Administration', description: 'Permet d\'accéder au panneau d\'administration' },
];

const PermissionsManager: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Autorisations du système</CardTitle>
            <CardDescription>
              Gérez les permissions disponibles dans le système
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Ajouter une permission
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Nom</TableHead>
                <TableHead>Identifiant</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.name}</TableCell>
                  <TableCell>
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      {permission.id}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {permission.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-start gap-2 mt-4 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>
            Les permissions sont utilisées dans les rôles pour définir ce que les utilisateurs peuvent faire.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionsManager;
