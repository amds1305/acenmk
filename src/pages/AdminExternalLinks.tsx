
import React from 'react';
import { ExternalLinksManager } from '@/components/admin/external-links';
import { SaveIndicator } from '@/components/ui/save-indicator';

const AdminExternalLinks = () => {
  return (
    <div className="space-y-6">
      <ExternalLinksManager />
    </div>
  );
};

export default AdminExternalLinks;
