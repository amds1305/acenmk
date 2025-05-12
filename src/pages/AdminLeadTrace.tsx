
import React from 'react';
import { LeadTraceManager } from '@/components/admin/lead-trace';

const AdminLeadTrace = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">LeadTrace - Gestion des leads</h1>
      <p className="text-muted-foreground">
        Gérez vos contacts et transformez-les en opportunités commerciales.
      </p>
      <LeadTraceManager />
    </div>
  );
};

export default AdminLeadTrace;
