
import React from 'react';
import { Shield } from 'lucide-react';

interface UsersStatsProps {
  filteredCount: number;
  totalCount: number;
}

export const UsersStats: React.FC<UsersStatsProps> = ({
  filteredCount,
  totalCount
}) => {
  return (
    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
      <div>
        Affichage de {filteredCount} sur {totalCount} utilisateurs
      </div>
      <div className="flex items-center">
        <Shield className="h-4 w-4 mr-1" />
        <span className="text-xs">Les super-administrateurs ont un accès complet au système</span>
      </div>
    </div>
  );
};
