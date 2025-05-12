
import React from 'react';
import LeadTraceManager from './LeadTraceManager';

const Lead = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 py-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">LeadTrace - Gestion des leads</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos contacts et transformez-les en opportunités commerciales.
          </p>
        </div>
      </div>
      <LeadTraceManager />
    </div>
  );
};

export default Lead;
