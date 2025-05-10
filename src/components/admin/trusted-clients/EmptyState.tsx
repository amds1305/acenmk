
import React from 'react';
import { UsersIcon } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <UsersIcon className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">Aucun logo client</h3>
      <p className="text-muted-foreground mb-6">
        Vous n'avez pas encore ajouté de logo client. Ajoutez-en un pour commencer.
      </p>
    </div>
  );
};

export default EmptyState;
