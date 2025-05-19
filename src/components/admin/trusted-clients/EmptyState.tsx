
import React from 'react';
import { Card } from '@/components/ui/card';

const EmptyState = () => {
  return (
    <Card className="p-8 text-center">
      <p className="text-muted-foreground">Aucun logo client n'a été ajouté.</p>
      <p className="text-muted-foreground">Cliquez sur "Ajouter un logo" pour commencer.</p>
    </Card>
  );
};

export default EmptyState;
