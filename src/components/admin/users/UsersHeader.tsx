
import React from 'react';
import {
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Download } from 'lucide-react';

interface UsersHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  onAddUser: () => void;
  isLoading: boolean;
}

export const UsersHeader: React.FC<UsersHeaderProps> = ({
  onRefresh,
  onExport,
  onAddUser,
  isLoading
}) => {
  return (
    <CardHeader>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>
            Gérez les comptes utilisateurs et leurs permissions.
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
            {isLoading ? 'Chargement...' : 'Actualiser'}
          </Button>
          <Button variant="outline" size="sm" onClick={onExport} disabled={isLoading}>
            <Download className="h-4 w-4 mr-1" /> Exporter
          </Button>
          <Button size="sm" onClick={onAddUser}>
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
