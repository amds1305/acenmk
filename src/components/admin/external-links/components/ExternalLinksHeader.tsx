
import React from 'react';
import { Button } from '@/components/ui/button';
import { SaveIndicator } from '@/components/ui/save-indicator';

interface ExternalLinksHeaderProps {
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  onSave: () => Promise<void>;
}

const ExternalLinksHeader: React.FC<ExternalLinksHeaderProps> = ({ saveStatus, onSave }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Liens externes</h2>
        <p className="text-sm text-muted-foreground">
          Gérez les liens vers des applications web externes avec contrôle d'accès
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SaveIndicator status={saveStatus} />
        <Button onClick={onSave} disabled={saveStatus === 'saving'}>
          Enregistrer tout
        </Button>
      </div>
    </div>
  );
};

export default ExternalLinksHeader;
